import { dbConnect } from '@/../lib/dbConnect';
import HospitalHospital from '@/../models/Hospital.model';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const city = url.searchParams.get('city');

    const query = city ? { city } : {};
    const hospitals = await HospitalHospital.find(query).select('name city location imageUrl');

    return NextResponse.json(hospitals);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
