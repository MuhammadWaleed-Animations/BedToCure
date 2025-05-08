'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SuperAdminUI() {
  const router = useRouter();

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalCity, setHospitalCity] = useState('');
  const [hospitalLocation, setHospitalLocation] = useState('');
  const [hospitalImage, setHospitalImage] = useState('');

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState('');

  const [hospitals, setHospitals] = useState<any[]>([]);
  const [admins, setAdmins] = useState<any[]>([]);

  const [message, setMessage] = useState('');

  useEffect(() => {
    const role = Cookies.get('role');
    if (role !== 'superadmin') {
      router.push('/admin-login');
    } else {
      fetchHospitals();
      fetchAdmins();
    }
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await fetch('/api/hospital');
      const data = await res.json();
      setHospitals(data);
    } catch {
      setHospitals([]);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin');
      const data = await res.json();
      setAdmins(data);
    } catch {
      setAdmins([]);
    }
  };

  const handleHospitalCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/hospital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: hospitalName,
          city: hospitalCity,
          location: hospitalLocation,
          imageUrl: hospitalImage || undefined,
        }),
      });
      if (res.ok) {
        setHospitalName('');
        setHospitalCity('');
        setHospitalLocation('');
        setHospitalImage('');
        setMessage('✅ Hospital created successfully');
        fetchHospitals();
      } else {
        setMessage('❌ Failed to create hospital');
      }
    } catch {
      setMessage('❌ Network error');
    }
  };

  const handleAdminCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
          role: 'hospitaladmin',
          hospitalId: selectedHospitalId,
        }),
      });
      if (res.ok) {
        setAdminEmail('');
        setAdminPassword('');
        setSelectedHospitalId('');
        setMessage('✅ Admin created successfully');
        fetchAdmins();
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage('❌ Network error');
    }
  };

  return (
    <div
      className="min-h-screen bg-[#f0f4f7] flex flex-col items-center justify-start py-10 px-4"
      style={{
        backgroundImage: "url('/website-background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg max-w-5xl w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-green-900 text-center">Super Admin Panel</h1>
        {message && <p className="text-center font-semibold text-red-600">{message}</p>}

        {/* Hospital Creation */}
        <form onSubmit={handleHospitalCreate} className="space-y-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Add New Hospital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Hospital Name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={hospitalCity}
              onChange={(e) => setHospitalCity(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="text"
              placeholder="Google Maps Location URL"
              value={hospitalLocation}
              onChange={(e) => setHospitalLocation(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 col-span-full"
              required
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={hospitalImage}
              onChange={(e) => setHospitalImage(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 col-span-full"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Add Hospital
          </button>
        </form>

        {/* Admin Creation */}
        <form onSubmit={handleAdminCreate} className="space-y-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Create Admin for Hospital</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="email"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <select
              value={selectedHospitalId}
              onChange={(e) => setSelectedHospitalId(e.target.value)}
              className="px-4 py-3 border rounded-md bg-white text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 col-span-full"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name} - {hospital.city}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
          >
            Create Admin
          </button>
        </form>

        {/* Admin List */}
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4">All Admins</h2>
          <div className="overflow-x-auto bg-white rounded-md shadow-sm">
            <table className="w-full text-black border border-gray-300 text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="border p-3 text-left">Email</th>
                  <th className="border p-3 text-left">Role</th>
                  <th className="border p-3 text-left">Hospital</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td className="border p-3">{admin.email}</td>
                    <td className="border p-3">{admin.role}</td>
                    <td className="border p-3">{admin.hospitalId?.name || '—'}</td>
                  </tr>
                ))}
                {admins.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center p-4 text-gray-500">
                      No admins found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
