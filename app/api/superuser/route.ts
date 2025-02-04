import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { superUserSchema, default as validate } from '../validate';


import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const superUsers = await prisma.superUser.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(superUsers);
}

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const parseResult = validate(superUserSchema, body);

//   if (!parseResult.success) {
//     return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
//   }

//   const newSuperUser = await prisma.superUser.create({
//     data: {
//       username: parseResult.data.username,
//       password: parseResult.data.password,
//     },
//   });

//   return NextResponse.json(newSuperUser);
// }

// export async function DELETE(request: NextRequest) {
//   const url = request.nextUrl;
//   const id = parseInt(url.searchParams.get('id') || '', 10);

//   if (isNaN(id)) {
//     return NextResponse.json({ error: 'Invalid SuperUser ID' }, { status: 400 });
//   }

//   const deletedSuperUser = await prisma.superUser.delete({
//     where: { id },
//   });

//   if (!deletedSuperUser) {
//     return NextResponse.json({ error: 'SuperUser not found' }, { status: 404 });
//   }

//   return NextResponse.json({ message: 'SuperUser deleted successfully' });
// }


const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'; // Use environment variable for the secret key

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate input
  if (!body.username || !body.password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  // Check if the user with the provided username exists
  const user = await prisma.superUser.findUnique({
    where: { username: body.username },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  // Compare the provided password with the hashed password in the database
  try {
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error verifying password' }, { status: 500 });
  }

  // Generate a token
  const token = jwt.sign(
    { id: user.id, username: user.username, name: user.username },
    JWT_SECRET,
    { expiresIn: '1h' } // Token expiration time
  );

  return NextResponse.json({ message: 'Login successful', token });
}


export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10);
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid SuperUser ID' }, { status: 400 });
  }

  const parseResult = validate(superUserSchema, body);

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
  }

  const updatedSuperUser = await prisma.superUser.update({
    where: { id },
    data: {
      username: parseResult.data.username,
      password: parseResult.data.password,
    },
  });

  if (!updatedSuperUser) {
    return NextResponse.json({ error: 'SuperUser not found' }, { status: 404 });
  }

  return NextResponse.json(updatedSuperUser);
}