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

export const BedsTable = () => {
  const bedsData = [
    { id: 1, ward: "Cardiology", occupiedBeds: 15, availableBeds: 2, costPerNight: "15K" },
    { id: 2, ward: "ENT", occupiedBeds: 5, availableBeds: 15, costPerNight: "5k" },
    { id: 3, ward: "Nephrology", occupiedBeds: 10, availableBeds: 1, costPerNight: "7.5k" },
    { id: 4, ward: "ICU", occupiedBeds: 4, availableBeds: 4, costPerNight: "40k" },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-center text-4xl font-medium mb-8">Beds Details</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-[800px] mx-auto bg-white rounded-lg overflow-hidden shadow">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
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
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ward}</TableCell>
                <TableCell>{row.occupiedBeds}</TableCell>
                <TableCell>{row.availableBeds}</TableCell>
                <TableCell>{row.costPerNight}</TableCell>
                <TableCell>
                  <Button className="bg-[#477e40] text-white px-4 py-1 rounded">
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
