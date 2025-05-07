'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // ✅ Correct for App Router
import { HospitalInfo } from "@/components/HospitalInfo";
import { BedsTable } from "@/components/BedsTable";
import { Map } from "@/components/Map";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type Hospital = {
  _id: string;
  name: string;
  city: string;
  imageUrl: string;
};

type Ward = {
  _id: string;
  name: string;
  occupiedBeds: number;
  availableBeds: number;
  costPerNight: number;
};

const HospitalPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [bedsData, setBedsData] = useState< null>(null); // Change state type to Bed[]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchHospitalData = async () => {
        try {
          // Fetch hospital details
          const hospitalResponse = await fetch(`/api/hospital/${id}`);
          const hospitalData = await hospitalResponse.json();
          setHospital(hospitalData);

          // Fetch bed details for the specific hospital
          const bedResponse = await fetch(`/api/beddetails/${id}`);
          const bedData = await bedResponse.json();
          
          // Transform ward data into bed data
          const transformedBedsData = bedData.wards.map((ward: Ward, index: number) => ({
            id: ward._id, // Use the unique _id as id for the Bed type
            ward: ward.name,
            occupiedBeds: ward.occupiedBeds,
            availableBeds: ward.availableBeds,
            costPerNight: ward.costPerNight.toString(), // Ensure costPerNight is a string
          }));

          setBedsData(transformedBedsData); // Update state with the transformed data
        } catch (error) {
          console.error('Error fetching hospital or bed data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchHospitalData();
    }
  }, [id]);

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

  if (!hospital || !bedsData) {
    return (
    <div>
      <Header/>
        <p className="text-center text-gray-700">Hospital not found or bed details unavailable.</p>
      <Footer/>
    </div>);
  }

  return (
    <div>
    <Header/>
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/website-background.png')" }}
    >
      <div className="bg-transparent px-4 py-8 sm:px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <HospitalInfo name={hospital.name} city={hospital.city} imageUrl={hospital.imageUrl} />
        <Map />
        <div className="my-12">
          {/* Pass hospital id and transformed beds data to the BedsTable component */}
          <BedsTable hospitalId={id} hospitalName={hospital.name} address={hospital.city} bedsData={bedsData} />
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default HospitalPage;
