'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save data in cookies
      Cookies.set('adminId', data.admin.id);
      Cookies.set('role', data.admin.role);
      if (data.admin.hospitalId) {
        Cookies.set('hospitalId', data.admin.hospitalId);
      }

      // Redirect based on role
      if (data.admin.role === 'superadmin') {
        router.push('/super-admin');
      } else {
        router.push('/hospital-admin');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#b8d8d8] flex items-center justify-center"
      style={{
        backgroundImage: "url('/website-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-green-800">BedToCure</h1>
        <hr className="border-t-2 border-black mt-2 mb-6" />

        <h2 className="text-4xl font-extrabold text-black text-center mb-4">Admin Login</h2>
        <p className="text-red-600 font-semibold text-xl text-left mb-6">
          Please Login to continue!
        </p>

        {error && (
          <p className="text-red-500 bg-white p-2 rounded mb-4 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-sm mb-1 text-black">
              Enter admin username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md bg-white text-black focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-black">
              Enter admin password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md bg-white text-black focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
