'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HospitalInfo } from "@/components/HospitalInfo";
import { HospitalBanner } from "@/components/HospitalBanner";
import { BedsTable } from "@/components/BedsTable";
import { Map } from "@/components/Map";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Hospital = {
  name: string;
  city: string;
  imageUrl: string;
};

const bedsData = [
  { id: 1, ward: "Cardiology", occupiedBeds: 15, availableBeds: 2, costPerNight: "15000" },
  { id: 2, ward: "ENT", occupiedBeds: 5, availableBeds: 15, costPerNight: "5000" },
  { id: 3, ward: "Nephrology", occupiedBeds: 10, availableBeds: 1, costPerNight: "7500" },
  { id: 4, ward: "ICU", occupiedBeds: 4, availableBeds: 4, costPerNight: "40000" },
];

export default function HospitalPage() {
  const router = useRouter();
  const { id } = router.query; // This is where the hospital ID from the URL will be

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);


  if (loading) {
    return (
      <div>
      <Header/>
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
        Loading hospital information...
      </div>
      <Footer/>
    </div>
    );
  }

  if (!hospital) {
    return (
    <div>
      <Header/>
        <p className="text-center text-gray-700">Hospital not found.</p>
      <Footer/>
    </div>)
  }

  return (
    <div>
    <Header/>
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/website-background.png')" }}
    >
      <div className="bg-white/80 backdrop-blur-sm px-4 py-8 sm:px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <HospitalInfo name={hospital.name} city={hospital.city} imageUrl={hospital.imageUrl} />
        <HospitalBanner />
        <Map />
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4">Ward Availability</h2>
          <BedsTable bedsData={bedsData} />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
