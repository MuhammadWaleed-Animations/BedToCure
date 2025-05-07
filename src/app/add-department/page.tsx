'use client';

import { useState } from 'react';

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [beds, setBeds] = useState('');

  const handleAdd = () => {
    alert(`Department: ${departmentName}, Beds: ${beds}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-16 px-6 bg-[#b5d0ce] bg-[radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_0_0,radial-gradient(circle,rgba(240,255,255,0.5)_1%,transparent_1%)_5px_5px] bg-[length:10px_10px]">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 border-b border-black">
        <h1 className="text-2xl font-bold text-[#3b4e20]">BedToCure</h1>
        <div className="text-red-500 text-3xl">↷</div>
      </header>

      {/* Title */}
      <h2 className="text-4xl font-extrabold mt-10 text-black text-center">Add Department</h2>

      {/* Form */}
      <form className="w-full max-w-2xl mt-10 flex flex-col gap-6">
        <div>
          <label className="block text-black font-medium mb-1">
            Enter Department name:
          </label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Name of Department"
            className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500"
          />
        </div>

        <div>
          <label className="block text-black font-medium mb-1">
            Enter the no. of beds in Department:
          </label>
          <input
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            placeholder="No. of Beds in Department"
            className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
