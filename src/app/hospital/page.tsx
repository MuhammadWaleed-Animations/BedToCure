import { HospitalInfo } from "@/components/HospitalInfo";
import { HospitalBanner } from "@/components/HospitalBanner";
import { BedsTable } from "@/components/BedsTable";
import { Map } from "@/components/Map";

export default function HospitalPage() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ backgroundImage: "url('/website-background.png')" }}>
      <HospitalInfo />
      <HospitalBanner />
      <Map />
      <div className="mb-16">
        <BedsTable />
      </div>
    </div>
  );
}
