import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../prisma/client';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'; // Use environment variable for the secret key

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate input
  if (!body.code || !body.password) {
    return NextResponse.json({ error: 'Code and password are required' }, { status: 400 });
  }

  // Check if the province with the provided code exists
  const province = await prisma.province.findUnique({
    where: { code: body.code },
  });

  if (!province) {
    return NextResponse.json({ error: 'Invalid code or password' }, { status: 401 });
  }

  console.log(province.password);
  console.log(body.password);

  // Compare the provided password with the hashed password in the database
  try {
    const match = await bcrypt.compare(body.password, province.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid code or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error verifying password' }, { status: 500 });
  }

  // Generate a token
  const token = jwt.sign({ id: province.id, code: province.code, name: province.name }, JWT_SECRET, { // Token expiration time
  });

  return NextResponse.json({ message: 'Login successful', token });
}
