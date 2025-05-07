import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../../lib/dbConnect';
import BedDetails from '@/../models/BedDetails.model';

// Type for the Ward and Hospital
type Ward = {
  _id: string;
  name: string;
  occupiedBeds: number;
  availableBeds: number;
  costPerNight: number;
};

type Hospital = {
  _id: string;
  name: string;
  city: string;
  location: string;
  imageUrl?: string;
};

type PopulatedBedDetails = {
  hospital: Hospital;
  wards: Ward[];
};

export async function GET(_: NextRequest, { params }: { params: { wardId: string } }) {
  try {
    await dbConnect();
    console.log(`[GET] Fetching bed ward with ID: ${params.wardId}`);

    const result = await BedDetails.findOne({ 'wards._id': params.wardId })
      .populate('hospital')  // Populating the 'hospital' reference
      .lean<PopulatedBedDetails>();  // Explicitly typing the result

    // Check if the result or wards array is missing or malformed
    if (!result || !Array.isArray(result.wards)) {
      console.warn(`[GET] Ward with ID ${params.wardId} not found or no wards array`);
      return NextResponse.json({ message: 'Ward not found' }, { status: 404 });
    }

    // Find the specific ward within the wards array
    const ward = result.wards.find((w) => w._id.toString() === params.wardId);
    if (!ward) {
      console.warn(`[GET] Ward ID ${params.wardId} not found in matched document`);
      return NextResponse.json({ message: 'Ward not found in matched hospital' }, { status: 404 });
    }

    // Returning the populated hospital and specific ward data
    return NextResponse.json({ hospital: result.hospital ?? null, ward });
  } catch (error) {
    console.error(`[GET] Error fetching ward with ID ${params.wardId}:`, error);
    return NextResponse.json({ error: 'Failed to fetch ward details' }, { status: 500 });
  }
}
