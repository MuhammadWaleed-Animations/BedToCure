import React from 'react';
import { Plus, Minus, LogOut } from 'lucide-react';

export default function Departments() {
  const departments = [
    { id: 1, name: 'Cardiology', beds: 15 },
    { id: 2, name: 'ENT', beds: 5 },
    { id: 3, name: 'Nephrology', beds: 10 },
    { id: 4, name: 'ICU', beds: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#b8d8d8] p-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold text-green-800">BedToCure</h1>
        <LogOut className="text-red-600 w-6 h-6" />
      </div>

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-center text-black mt-10 mb-4">
        Departments
      </h2>

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button className="bg-green-700 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-800">
          Add a department
        </button>
      </div>

      {/* Table */}
      <div className="flex justify-center">
        <table className="bg-white rounded-md shadow-md border border-gray-300 overflow-hidden">
          <thead className="bg-gray-100 text-black font-semibold border-b border-gray-300">
            <tr>
              <th className="px-4 py-2 border-r border-gray-300">#</th>
              <th className="px-4 py-2 border-r border-gray-300">Department Name</th>
              <th className="px-4 py-2 border-r border-gray-300">No. of beds</th>
              <th className="px-4 py-2">Increase/Decrease beds</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr
                key={dept.id}
                className={`text-center ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <td className="px-4 py-2 border-t border-r border-gray-300 text-gray-800 font-medium">
                  {dept.id}
                </td>
                <td className="px-4 py-2 border-t border-r border-gray-300 text-gray-800 font-medium">
                  {dept.name}
                </td>
                <td className="px-4 py-2 border-t border-r border-gray-300 text-gray-800 font-medium">
                  {dept.beds}
                </td>
                <td className="px-4 py-2 border-t border-gray-300">
                  <div className="flex justify-center gap-3">
                    <button className="bg-red-600 text-white p-1 rounded hover:bg-red-700">
                      <Minus size={16} />
                    </button>
                    <button className="bg-green-600 text-white p-1 rounded hover:bg-green-700">
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700">
          Update
        </button>
      </div>
    </div>
  );
}
