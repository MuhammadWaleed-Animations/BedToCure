import React from 'react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#b8d8d8] flex items-center justify-center" style={{
      backgroundImage: "url('/website-background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-green-800">BedToCure</h1>
        <hr className="border-t-2 border-black mt-2 mb-6" />

        <h2 className="text-4xl font-extrabold text-black text-center mb-4">Admin Login</h2>
        <p className="text-red-600 font-semibold text-xl text-left mb-6">Please Login to continue!</p>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-1 text-black">Enter admin username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-md bg-white text-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1 text-black">Enter admin password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md bg-white text-black focus:outline-none"
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
