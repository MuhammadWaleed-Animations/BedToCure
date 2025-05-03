'use client';

import { Button } from "@/components/ui/button_booking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter, useParams } from 'next/navigation';

// Define the type for a Bed Row
type Bed = {
  id: string;
  ward: string;
  occupiedBeds: number;
  availableBeds: number;
  costPerNight: string;
};

// Props type for BedsTable
interface BedsTableProps {
  bedsData: Bed[];
  hospitalId: string; // Accept hospitalId as a prop
  hospitalName: string; // Accept hospitalName as a prop
  address: string; // Accept address as a prop
}

export const BedsTable = ({bedsData , hospitalId,hospitalName,address}: BedsTableProps) => {
  const router = useRouter();
  const params = useParams();
  //const hospitalId = params.hospitalId as string; // dynamically from URL

  const handleSelect = (row: Bed) => {
    router.push(`/hospital/${hospitalId}/book?ward=${encodeURIComponent(row.ward)}&cost=${row.costPerNight}&name=${encodeURIComponent(hospitalName)}&address=${encodeURIComponent(address)}`);
  };

  return (
    <section className="mt-12">
      <h2 className="text-center text-4xl font-medium mb-8">Beds Details</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-[800px] mx-auto bg-white rounded-lg overflow-hidden shadow">
          <TableHeader>
            <TableRow>
              {/* <TableHead>#</TableHead> */}
              <TableHead>Wards</TableHead>
              <TableHead>Occupied Beds</TableHead>
              <TableHead>Available Beds</TableHead>
              <TableHead>Cost per Night</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bedsData.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell>{row.id}</TableCell> */}
                <TableCell>{row.ward}</TableCell>
                <TableCell>{row.occupiedBeds}</TableCell>
                <TableCell>{row.availableBeds}</TableCell>
                <TableCell>{row.costPerNight} PKR</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleSelect(row)}
                    className="bg-[#477e40] hover:bg-[#356530] text-white px-4 py-1 rounded transition"
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
