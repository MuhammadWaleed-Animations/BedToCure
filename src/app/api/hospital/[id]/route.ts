// /app/api/hospitals/[id]/route.ts
import { dbConnect } from '../../../../../lib/dbConnect';
import Hospital from '@/../models/Hospital.model';
import { NextRequest, NextResponse } from 'next/server';
import { Document, HydratedDocument } from 'mongoose';

// Define the Hospital document type using Mongoose Document
interface HospitalType extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  [key: string]: any; // This allows any additional fields if needed
}

// Type for the response, which can either be a hospital or an error message
type HospitalResponse = HydratedDocument<HospitalType> | { message: string } | { error: string };

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<HospitalResponse>> {
  try {
    await dbConnect();

    // Ensure params is awaited
    const { id }: { id: string } = await params;

    console.log(`[GET] Fetching hospital with ID: ${id}`);
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return NextResponse.json({ message: 'Hospital not found' }, { status: 404 });
    }

    return NextResponse.json(hospital);
  } catch (error) {
    console.error(`[GET] Error fetching hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch hospital' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<HospitalResponse>> {
  try {
    await dbConnect();
    
    // Define the body structure
    type UpdateBody = {
      name?: string;
      address?: string;
      phoneNumber?: string;
    };

    const body: UpdateBody = await req.json();
    
    // Ensure params is awaited
    const { id }: { id: string } = await params;

    console.log(`[PUT] Updating hospital with ID ${id}:`, body);
    
    const updated = await Hospital.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ message: 'Hospital not found to update' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(`[PUT] Error updating hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update hospital' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse<HospitalResponse>> {
  try {
    await dbConnect();

    // Ensure params is awaited
    const { id }: { id: string } = await params;

    console.log(`[DELETE] Deleting hospital with ID: ${id}`);
    
    const deleted = await Hospital.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Hospital not found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Deleted' }, { status: 204 });
  } catch (error) {
    console.error(`[DELETE] Error deleting hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete hospital' }, { status: 500 });
  }
}
