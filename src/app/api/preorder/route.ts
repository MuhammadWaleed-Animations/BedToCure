import { dbConnect } from '@/../lib/dbConnect';
import { stripe } from '@/../lib/stripe';
import HospitalHospital from '@/../models/Hospital.model';
import WardHospital from '@/../models/Ward.model';
import PreOrderHospital from '@/../models/PreOrder.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userName, cnic, wardId, hospitalId } = await req.json();

    const ward = await WardHospital.findById(wardId);
    if (!ward || ward.availableBeds <= 0) {
      return NextResponse.json({ error: 'No available beds' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(ward.costPerNight * 100), // in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 90 * 60000); // +90 minutes

    const preOrder = await PreOrderHospital.create({
      userName,
      cnic,
      wardId,
      hospitalId,
      stripePaymentId: paymentIntent.id,
      expiresAt,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, preorderId: preOrder._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
