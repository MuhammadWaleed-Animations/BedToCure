'use client'

import { useState } from 'react'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Booking = {
  _id: string
  userName: string
  cnic: string
  wardId: string
  wardName: string
  hospitalId: {
    _id: string
    name: string
    city: string
    location: string
    imageUrl: string
    __v: number
  }
  stripePaymentId: string
  status: string
  expiresAt: string
  createdAt: string
  __v: number
}

export default function BookingStatus() {
  const [cnic, setCnic] = useState('')
  const [booking, setBooking] = useState<Booking | null>(null)
  const [error, setError] = useState('')

  const handleCheckBooking = async () => {
    setError('')
    setBooking(null)

    if (!/^\d{13}$/.test(cnic)) {
      setError('CNIC must be exactly 13 digits.')
      return
    }

    try {
      const res = await fetch(`/api/preorder?cnic=${cnic}`)
      const data = await res.json()

      if (data.preorders?.length > 0) {
        setBooking(data.preorders[0])
      } else {
        setError('No booking found for this CNIC.')
      }
    } catch (e) {
      setError('Failed to fetch booking data.')
    }
  }

  return (
    <div>
    <Header/>
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url('/website-background.png')` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Check Booking Status</h1>

        <label htmlFor="cnic" className="block mb-2 font-medium">
          Enter CNIC (13 digits):
        </label>
        <input
          type="text"
          id="cnic"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 3520234567891"
        />

        <button
          onClick={handleCheckBooking}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Check Booking Status
        </button>

        {error && (
          <div className="mt-4 text-red-600 font-medium">{error}</div>
        )}

        {booking && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
            <p><strong>Name:</strong> {booking.userName}</p>
            <p><strong>CNIC:</strong> {booking.cnic}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Expires At:</strong> {new Date(booking.expiresAt).toLocaleString()}</p>
            <p><strong>Ward:</strong> {booking.wardName}</p>
            <p><strong>Hospital:</strong> {booking.hospitalId.name}, {booking.hospitalId.city}</p>
            <p>
              <strong>Location:</strong>{' '}
              <a href={booking.hospitalId.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View on Map
              </a>
            </p>
            <img
              src={booking.hospitalId.imageUrl}
              alt="Hospital"
              className="mt-4 rounded-md w-full object-cover h-48"
            />
          </div>
        )}
      </div>
    </main>
    <Footer/>
    </div>
  )
}
