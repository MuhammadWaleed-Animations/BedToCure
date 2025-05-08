'use client';

import { useState } from 'react';

const bookings = [
  { id: 1, name: 'Ahmad', cnic: '1234567890', condition: 'Diabetic, under observation.' },
  { id: 2, name: 'Ali', cnic: '1234567890', condition: 'He has a heart attack.' },
  { id: 3, name: 'Zafar', cnic: '1234567890', condition: 'High blood pressure.' },
  { id: 4, name: 'Unas', cnic: '1234567890', condition: 'Recovering from surgery.' },
];

export default function CurrentBookings() {
  const [selectedPatient, setSelectedPatient] = useState<null | typeof bookings[0]>(null);

  return (
    <div className="min-h-screen px-6 pt-16 bg-[#b5d0ce] bg-[radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_0_0,radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_5px_5px] bg-[length:10px_10px]"
    style={{
      backgroundImage: "url('/website-background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 border-b border-blue-900">
        <h1 className="text-2xl font-bold text-[#3b4e20]">BedToCure</h1>
        <div className="text-red-500 text-3xl">↷</div>
      </header>

      {/* Title */}
      <h2 className="text-4xl font-extrabold mt-10 mb-6 text-black text-center">Current Bookings</h2>

      {/* Table */}
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient Name</th>
              <th className="py-3 px-4 text-left">Patient CNIC</th>
              <th className="py-3 px-4 text-left">Medical Condition</th>
              <th className="py-3 px-4 text-left">Cancel Booking</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } text-gray-700`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{booking.name}</td>
                <td className="py-2 px-4">{booking.cnic}</td>
                <td className="py-2 px-4">
                  <button
                    className="bg-green-700 text-white px-4 py-1 rounded-md hover:bg-green-800 text-sm"
                    onClick={() => setSelectedPatient(booking)}
                  >
                    View
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 text-sm">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Translucent Modal with Light Pink */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[rgba(255,192,203,0.85)] text-black p-8 rounded-3xl shadow-xl w-[90%] max-w-md relative text-center">
            {/* Close button */}
            <button
              onClick={() => setSelectedPatient(null)}
              className="absolute top-4 right-4 text-red-700 hover:text-red-900 text-xl font-bold"
            >
              ×
            </button>

            <p className="text-lg font-bold mb-2">
              Patient Name: <span className="font-normal">{selectedPatient.name}</span>
            </p>
            <p className="text-lg font-bold">
              Medical Condition:{' '}
              <span className="font-normal">{selectedPatient.condition}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
