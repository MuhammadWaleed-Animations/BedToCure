import { dbConnect } from '@/../lib/dbConnect';
import AdminHospital from '@/../models/Admin.model';
import bcrypt from 'bcryptjs';
import { authenticateAdmin } from '@/../utils/authMiddleware';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    // ✅ Fix: await the authentication properly
    const authUser = await authenticateAdmin(req);

    if (authUser.role !== 'superadmin') {
      throw new Error('Unauthorized');
    }

    const { email, password, hospitalId } = await req.json();

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await AdminHospital.create({
      email,
      passwordHash,
      hospitalId,
      role: 'hospitaladmin'
    });

    return NextResponse.json(newAdmin);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
