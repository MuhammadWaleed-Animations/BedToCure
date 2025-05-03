'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ Correct for App Router
import { HospitalInfo } from "@/components/HospitalInfo";
import { HospitalBanner } from "@/components/HospitalBanner";
import { BedsTable } from "@/components/BedsTable";
import { Map } from "@/components/Map";

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

const HospitalPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchHospitalData = async () => {
        try {
          const response = await fetch(`/api/hospital/${id}`);
          const data = await response.json();
          setHospital(data);
        } catch (error) {
          console.error('Error fetching hospital data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHospitalData();
    }
  }, [id]);

  if (loading) {
    return (
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
    );
  }

  if (!hospital) {
    return <p className="text-center text-gray-700">Hospital not found.</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/website-background.png')" }}
    >
      <div className="bg-transparent px-4 py-8 sm:px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <HospitalInfo name={hospital.name} city={hospital.city} imageUrl={hospital.imageUrl} />
        <Map />
        <div className="my-12">
          <BedsTable bedsData={bedsData} />
        </div>
      </div>
    </div>
  );
};

export default HospitalPage;