import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest } from 'next/server';

interface AuthPayload extends JwtPayload {
  id: string;
  role: string;
}

export async function authenticateAdmin(req: NextRequest): Promise<AuthPayload> {
  const token = req.headers.get('authorization')?.split(' ')[1];
  
  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof decoded === 'string' || !('role' in decoded)) {
    throw new Error('Unauthorized: Invalid token');
  }

  return decoded as AuthPayload;
}
