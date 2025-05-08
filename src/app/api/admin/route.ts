// app/api/admin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/../lib/dbConnect';
import Admin from '@/../models/Admin.model';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { email, password, role, hospitalId } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return NextResponse.json(
      { message: 'Admin already exists' },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    email,
    passwordHash,
    role: role || 'hospitaladmin',
    hospitalId: role === 'hospitaladmin' ? hospitalId : undefined,
  });

  // Conditionally populate hospitalId if role is hospitaladmin
  const populatedAdmin =
    role === 'hospitaladmin'
      ? await Admin.findById(newAdmin._id).populate('hospitalId')
      : newAdmin;

  return NextResponse.json(
    { message: 'Admin created', admin: populatedAdmin },
    { status: 201 }
  );
}


// List all admins
export async function GET() {
  await dbConnect();
  const admins = await Admin.find().populate('hospitalId');
  return NextResponse.json(admins);
}

export async function DELETE() {
    await dbConnect();
    
    try {
      const db:any = await dbConnect();
      const collection = db.collection('Admin'); // Name of your collection
      await collection.drop(); // This will drop the entire 'admin' collection
      
      return NextResponse.json({ message: 'Admin collection dropped successfully' });
    } catch (error) {
      return NextResponse.json({ error: 'Error dropping the admin collection' }, { status: 500 });
    }
  }