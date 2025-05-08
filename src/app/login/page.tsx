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
      // Clear previous cookies
      Cookies.remove('adminId');
      Cookies.remove('role');
      Cookies.remove('email');
      Cookies.remove('hospitalId');
      
      // Save data in cookies
      Cookies.set('adminId', data.admin.id);
      Cookies.set('role', data.admin.role);
      Cookies.set('email', data.admin.email);
      if (data.admin.hospitalId) {
        Cookies.set('hospitalId', data.admin.hospitalId);
      }

      // Redirect based on role
      if (data.admin.role === 'superadmin') {
        router.push('/super-admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f7fafc] flex items-center justify-center"
      style={{
        backgroundImage: "url('/website-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 text-center">BedToCure</h1>
        <hr className="border-t-2 border-green-800 mt-2 mb-6" />

        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Admin Login</h2>
        <p className="text-red-600 font-semibold text-xl text-center mb-6">
          Please login to continue!
        </p>

        {error && (
          <p className="text-red-500 bg-red-100 p-2 rounded mb-4 text-center">{error}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-800">Username</label>
            <input
              type="text"
              placeholder="Enter admin username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-800">Password</label>
            <input
              type="password"
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>

        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-green-800 font-semibold hover:text-green-700">
              Sign up here
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
