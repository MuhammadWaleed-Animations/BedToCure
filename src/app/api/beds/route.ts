// /app/api/beds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/dbConnect';
import BedDetails from '@/../models/BedDetails.model';

export async function GET() {
  try {
    await dbConnect();
    console.log('[GET] Fetching all bed details');
    const beds = await BedDetails.find().populate('hospital');
    return NextResponse.json(beds);
  } catch (error) {
    console.error('[GET] Error fetching bed details:', error);
    return NextResponse.json({ error: 'Failed to fetch bed details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('[POST] Creating new bed details with data:', body);
    const bedDetails = await BedDetails.create(body);
    return NextResponse.json(bedDetails, { status: 201 });
  } catch (error) {
    console.error('[POST] Error creating bed details:', error);
    return NextResponse.json({ error: 'Failed to create bed details' }, { status: 500 });
  }
}
