'use client';

import { useState } from 'react';

export default function BookingCancellation() {
  const [reason, setReason] = useState('');

  const patient = {
    name: 'Ali',
    cnic: '1234567890',
    condition: 'He has a heart attack.',
  };

  const handleCancel = () => {
    alert(`Booking cancelled for ${patient.name}. Reason: ${reason}`);
  };

  return (
    <div className="min-h-screen px-6 pt-16 bg-[#b5d0ce] bg-[radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_0_0,radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_5px_5px] bg-[length:10px_10px]">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 border-b border-black">
        <h1 className="text-2xl font-bold text-[#3b4e20]">BedToCure</h1>
        <div className="text-red-500 text-3xl">↷</div>
      </header>

      {/* Title */}
      <h2 className="text-4xl font-extrabold mt-10 text-black text-center">Booking Cancellation</h2>

      {/* Patient Info */}
      <div className="max-w-3xl mx-auto mt-10 text-lg text-black space-y-2">
        <p><span className="font-bold">Patient Name:</span> {patient.name}</p>
        <p><span className="font-bold">Patient CNIC:</span> {patient.cnic}</p>
        <p><span className="font-bold">Medical Condition:</span> {patient.condition}</p>
      </div>

      {/* Reason Input */}
      <div className="max-w-3xl mx-auto mt-8">
        <label className="block text-black font-medium mb-2">
          Enter reason for cancellation:
        </label>
        <input
          type="text"
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Cancel Button - Right Aligned */}
      <div className="max-w-3xl mx-auto mt-6 flex justify-end">
        <button
          onClick={handleCancel}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}
