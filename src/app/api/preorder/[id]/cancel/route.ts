import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '../../../../../../lib/dbConnect';
import PreOrderHospital from '@/../models/PreOrder.model';

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const now = new Date();

    // Find and update all expired 'active' preorders
    const result = await PreOrderHospital.updateMany(
      {
        status: 'active',
        expiresAt: { $lt: now },
      },
      {
        $set: { status: 'cancelled' },
      }
    );

    return NextResponse.json({
      message: 'Expired preorders cancelled',
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error('[PUT /api/preorder/cancelExpired]', err);
    return NextResponse.json(
      { error: 'Failed to cancel expired preorders' },
      { status: 500 }
    );
  }
}
