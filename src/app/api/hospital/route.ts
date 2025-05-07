// /app/api/hospitals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../lib/dbConnect';
import Hospital from '@/../models/Hospital.model';

export async function GET() {
  try {
    console.log('--------------------------------');
    await dbConnect();
    console.log('[GET] Fetching all hospitals----------');
    const hospitals = await Hospital.find();
    return NextResponse.json(hospitals);
  } catch (error) {
    console.error('[GET] Error fetching hospitals:', error);
    return NextResponse.json({ error: 'Failed to fetch hospitals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log('[POST] Creating new hospital with data:', body);
    const newHospital = await Hospital.create(body);
    return NextResponse.json(newHospital, { status: 201 });
  } catch (error) {
    console.error('[POST] Error creating hospital:', error);
    return NextResponse.json({ error: 'Failed to create hospital' }, { status: 500 });
  }
}