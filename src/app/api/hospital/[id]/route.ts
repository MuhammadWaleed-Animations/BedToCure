// /app/api/hospitals/[id]/route.ts
import { dbConnect } from '@/../lib/dbConnect';
import Hospital from '@/../models/Hospital.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log(`[GET] Fetching hospital with ID: ${params.id}`);
    const hospital = await Hospital.findById(params.id);
    return NextResponse.json(hospital);
  } catch (error) {
    console.error(`[GET] Error fetching hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch hospital' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log(`[PUT] Updating hospital with ID ${params.id}:`, body);
    const updated = await Hospital.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(`[PUT] Error updating hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update hospital' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log(`[DELETE] Deleting hospital with ID: ${params.id}`);
    await Hospital.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Deleted' }, { status: 204 });
  } catch (error) {
    console.error(`[DELETE] Error deleting hospital with ID ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete hospital' }, { status: 500 });
  }
}
