import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#b8d8d8] p-8">
   
      <div className="flex justify-between items-center border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold text-green-800">BedToCure</h1>
        <button>
          <LogOut className="text-red-600 w-6 h-s6" />
        </button>
      </div>

    
      <h2 className="text-4xl font-extrabold text-center text-black mt-10 mb-6">
        Admin Dashboard
      </h2>

      <div className="text-center text-lg text-black font-medium space-y-2 mb-10">
        <p><span className="font-bold">Admin:</span> Ahmad Ali</p>
        <p><span className="font-bold">Hospital:</span> Sheikh Zaid Hospital</p>
        <p><span className="font-bold">Address:</span> Muslim Town, Lahore</p>
      </div>


      <div className="flex justify-center gap-8">
        <button className="bg-green-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700">
          See current bookings
        </button>
        <button className="bg-green-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-700">
          See/update departments
        </button>
      </div>
    </div>
  );
}
