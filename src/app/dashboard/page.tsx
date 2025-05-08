'use client'; // Use client-side code

import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie'; // Import js-cookie to read cookies
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Already included above

type Hospital = {
  name: string;
  city: string;
  location: string;
  imageUrl?: string;
};

export default function AdminDashboard() {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const router = useRouter();
  useEffect(() => {
    // Fetch admin data from cookies
    const hospitalId = cookie.get('hospitalId');
    const role = cookie.get('role');

    // Ensure the user is logged in as hospitaladmin
    if (role !== 'hospitaladmin') {
      window.location.href = '/unauthorized'; // Redirect if not hospitaladmin
    }

    if (hospitalId) {
      // Fetch hospital data using the hospitalId from the cookie
      const fetchHospitalData = async () => {
        try {
          const hospitalResponse = await fetch(`/api/hospital/${hospitalId}`);
          const hospitalData = await hospitalResponse.json();
          if (hospitalData) {
            setHospital(hospitalData);
          }
        } catch (error) {
          console.error('Error fetching hospital data:', error);
        }
      };

      fetchHospitalData();
    } else {
      window.location.href = '/login'; // Redirect if hospitalId is not found
    }
  }, []);

  if (!hospital) return <div className="text-center text-2xl">Loading...</div>; // Loading state

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-10"
      style={{
        backgroundImage: "url('/website-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-green-800 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-green-800">BedToCure</h1>
        <form action="/logout" method="POST">
          <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition duration-300">
            <LogOut className="w-6 h-6" />
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        <div className="text-lg text-gray-700 font-medium space-y-2 mb-10">
          <p><span className="font-semibold text-gray-900">Hospital:</span> {hospital.name}</p>
          <p><span className="font-semibold text-gray-900">Location:</span> {hospital.city}</p>
          <p><span className="font-semibold text-gray-900">Address:</span> {hospital.location}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8">
        <button
          onClick={() => router.push('/bookings')}
          className="bg-green-800 text-white font-semibold px-8 py-4 rounded-md hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
        >
          See Current Bookings
        </button>
        <button
          onClick={() => router.push('/departments')}
          className="bg-green-800 text-white font-semibold px-8 py-4 rounded-md hover:bg-green-700 transition duration-300 shadow-lg transform hover:scale-105"
        >
          See/Update Departments
        </button>
      </div>

    </div>
  );
}
