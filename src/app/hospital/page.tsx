import { HospitalInfo } from "@/components/HospitalInfo";
import { HospitalBanner } from "@/components/HospitalBanner";
import { BedsTable } from "@/components/BedsTable";
import { Map } from "@/components/Map";

const bedsData = [
  { id: 1, ward: "Cardiology", occupiedBeds: 15, availableBeds: 2, costPerNight: "15000" },
  { id: 2, ward: "ENT", occupiedBeds: 5, availableBeds: 15, costPerNight: "5000" },
  { id: 3, ward: "Nephrology", occupiedBeds: 10, availableBeds: 1, costPerNight: "7500" },
  { id: 4, ward: "ICU", occupiedBeds: 4, availableBeds: 4, costPerNight: "40000" },
];

export default function HospitalPage() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ backgroundImage: "url('/website-background.png')" }}>
      <HospitalInfo />
      <HospitalBanner />
      <Map />
      <div className="mb-16">
        <BedsTable bedsData={bedsData} />
      </div>
    </div>
  );
}
