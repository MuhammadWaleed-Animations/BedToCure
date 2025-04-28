import { dbConnect } from '@/../lib/dbConnect';
import AdminHospital from '@/../models/Admin.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const admin = await AdminHospital.findOne({ email });
    if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = jwt.sign(
      { id: admin._id, role: admin.role, hospitalId: admin.hospitalId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ token, role: admin.role });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
