import { dbConnect } from '@/../lib/dbConnect';
import WardHospital from '@/../models/Ward.model';
import { authenticateAdmin } from '@/../utils/authMiddleware';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { hospitalId: string } }) {
  try {
    await dbConnect();
    
    // ✅ Fix: await authentication properly
    const authUser = await authenticateAdmin(req);

    if (authUser.hospitalId !== params.hospitalId) {
      throw new Error('Unauthorized');
    }

    const { name, totalBeds, costPerNight } = await req.json();

    const newWard = await WardHospital.create({
      hospitalId: params.hospitalId,
      name,
      totalBeds,
      availableBeds: totalBeds, // initially all beds available
      costPerNight,
    });

    return NextResponse.json(newWard);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
