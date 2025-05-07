'use client';
import { useEffect, useState } from 'react';
import HospitalCard from '@/components/HospitalCard';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Hospital = {
  _id: string;
  name: string;
  city: string;
  imageUrl: string;
};

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await fetch('/api/hospital');
        const data = await res.json();
        setHospitals(data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div>
    <Header/>
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundImage: "url('/website-background.png')" }}
    >
      <main className="flex-1 p-6 bg-transparent">
        <h1 className="text-2xl font-bold mb-6 text-center">Hospitals</h1>

        {loading ? (
          <div className="text-center text-blue-500">
            <svg
              className="animate-spin h-6 w-6 mx-auto mb-2 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading hospitals...
          </div>
        ) : hospitals.length === 0 ? (
          <p className="text-center text-gray-700">No hospitals found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hospital) => (
              <HospitalCard
                key={hospital._id}
                id = {hospital._id}
                name={hospital.name}
                city={hospital.city}
                imageUrl={hospital.imageUrl}
              />
            ))}
          </div>
        )}
      </main>
    </div>
    <Footer/>
    </div>
  );
}
