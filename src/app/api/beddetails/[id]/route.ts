import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import BedDetails from '@/../models/BedDetails.model'; // Adjust the import path if necessary
import { dbConnect } from '@/../lib/dbConnect';

// GET bed details by hospital ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;

    const bedDetails = await BedDetails.findOne({ hospital: new mongoose.Types.ObjectId(id) });
    if (!bedDetails) {
      return NextResponse.json({ message: 'Hospital bed details not found' }, { status: 404 });
    }

    return NextResponse.json(bedDetails);
  } catch (error) {
    console.error(`[GET] Error fetching bed details for hospital ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch bed details' }, { status: 500 });
  }
}

// PUT update bed details for a specific hospital
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const updatedBedDetails = await BedDetails.findOneAndUpdate(
      { hospital: new mongoose.Types.ObjectId(id) },
      { $set: body },
      { new: true }
    );

    if (!updatedBedDetails) {
      return NextResponse.json({ message: 'Hospital bed details not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBedDetails);
  } catch (error) {
    console.error(`[PUT] Error updating bed details for hospital ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to update bed details' }, { status: 500 });
  }
}

// POST create bed details for a specific hospital
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await dbConnect();
      const { id } = await params;
      const body = await request.json();
  
      // Ensure hospital exists before creating bed details
      const hospital = await mongoose.model('Hospital').findById(id); // Assuming 'Hospital' is the model for hospital data
      if (!hospital) {
        return NextResponse.json({ message: 'Hospital not found' }, { status: 404 });
      }
  
      // Create and save bed details
      const newBedDetails = new BedDetails({
        hospital: new mongoose.Types.ObjectId(id),
        wards: body.wards || [], // Assuming wards is an array of wards
      });
  
      await newBedDetails.save();
      return NextResponse.json(newBedDetails, { status: 201 });
    } catch (error) {
      console.error(`[POST] Error creating bed details for hospital ${params.id}:`, error);
      return NextResponse.json({ error: 'Failed to create bed details' }, { status: 500 });
    }
  }
  

// DELETE bed details for a specific hospital
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;

    const deletedBedDetails = await BedDetails.findOneAndDelete({ hospital: new mongoose.Types.ObjectId(id) });

    if (!deletedBedDetails) {
      return NextResponse.json({ message: 'Hospital bed details not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Bed details deleted' }, { status: 204 });
  } catch (error) {
    console.error(`[DELETE] Error deleting bed details for hospital ${params.id}:`, error);
    return NextResponse.json({ error: 'Failed to delete bed details' }, { status: 500 });
  }
}
// PATCH adjust available bed count for a specific ward
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      await dbConnect();
      const { id } = await params;
      const { wardName, delta = 1 } = await request.json(); // Can be positive or negative
  
      const bedDetails = await BedDetails.findOne({
        hospital: new mongoose.Types.ObjectId(id),
      });
  
      if (!bedDetails) {
        return NextResponse.json(
          { message: 'Hospital bed details not found' },
          { status: 404 }
        );
      }
  
      const ward = bedDetails.wards.find((w: any) => w.name === wardName);
      if (!ward) {
        return NextResponse.json(
          { message: 'Ward not found' },
          { status: 404 }
        );
      }
  
      // Prevent negative bed count
      const newAvailableBeds = ward.availableBeds + delta;
      if (newAvailableBeds < 0) {
        return NextResponse.json(
          { message: 'Available beds cannot be negative' },
          { status: 400 }
        );
      }
  
      ward.availableBeds = newAvailableBeds;
  
      await bedDetails.save();
  
      return NextResponse.json({
        message: 'Bed count updated',
        availableBeds: ward.availableBeds,
      });
    } catch (error) {
      console.error(
        `[PATCH] Error updating bed count for hospital ${params.id}:`,
        error
      );
      return NextResponse.json(
        { error: 'Failed to update bed count' },
        { status: 500 }
      );
    }
  }
  