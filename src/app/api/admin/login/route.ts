// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/../lib/dbConnect';
import Admin from '@/../models/Admin.model';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Login successful',
    admin: {
      id: admin._id,
      email: admin.email,
      role: admin.role,
      hospitalId: admin.hospitalId,
    },
  });
}
