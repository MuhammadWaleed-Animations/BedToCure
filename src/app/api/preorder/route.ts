import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { dbConnect } from '../../../../lib/dbConnect';
import PreOrderHospital from '@/../models/PreOrder.model';
import BedDetails from '@/../models/BedDetails.model';
import Hospital from '@/../models/Hospital.model';
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { userName, cnic, wardId, hospitalId, stripePaymentId } = await request.json();

    if (!userName || !cnic || !wardId || !hospitalId || !stripePaymentId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 🧠 Find the wardName using wardId from embedded BedDetails.wards
    const bedDetails = await BedDetails.findOne({ hospital: hospitalId });

    if (!bedDetails) {
      return NextResponse.json({ error: 'Hospital bed details not found' }, { status: 404 });
    }

    const ward = bedDetails.wards.find((w: any) => w._id.toString() === wardId);

    if (!ward) {
      return NextResponse.json({ error: 'Ward not found in hospital' }, { status: 404 });
    }

    const wardName = ward.name;
    const expiresAt = new Date(Date.now() + 90 * 60 * 1000); // 90 minutes from now

    const preorder = await PreOrderHospital.create({
      userName,
      cnic,
      wardId,
      wardName,
      hospitalId,
      stripePaymentId,
      expiresAt,
    });

    return NextResponse.json({ message: 'Preorder created', preorder }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/preorder]', err);
    return NextResponse.json({ error: 'Failed to create preorder' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const cnic = searchParams.get('cnic');
    const hospitalId = searchParams.get('hospitalId');

    let query: any = {};
    if (cnic) query.cnic = cnic;
    if (hospitalId) query.hospitalId = hospitalId;

    if (!cnic && !hospitalId) {
      return NextResponse.json({ error: 'Provide cnic or hospitalId' }, { status: 400 });
    }

    const preorders = await PreOrderHospital.find(query).populate('hospitalId');

    return NextResponse.json({ preorders }, { status: 200 });
  } catch (err) {
    console.error('[GET /api/preorder]', err);
    return NextResponse.json({ error: 'Failed to fetch preorders' }, { status: 500 });
  }
}
