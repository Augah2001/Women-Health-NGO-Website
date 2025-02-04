import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../prisma/client';
import { provinceSchema, default as validate } from '../validate';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'; // Use environment variable for the secret key


export async function GET(request: NextRequest) {
  const provinces = await prisma.province.findMany({ orderBy: { id: 'asc' } });

  // Exclude the password field from each province
  const provincesWithoutPassword = provinces.map(({ password, ...province }) => province);

  return NextResponse.json(provincesWithoutPassword);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Validate input
  const parseResult = validate(provinceSchema, body);
  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
  }

  

  // Check if the name or code already exists
  const existingProvince = await prisma.province.findFirst({
    where: {
      OR: [
        { name: parseResult.data.name },
        { code: parseResult.data.code }
      ]
    }
  });

  if (existingProvince) {
    return NextResponse.json({ error: 'Name or code already exists' }, { status: 400 });
  }

  const { superUserPassword, ...rest } = parseResult.data; // Remove superUserPassword from the data
 
  const superUser = await prisma.superUser.findFirst()
  console.log(superUser)
  try {
    if (superUser) {
      const match = await bcrypt.compare(superUserPassword, superUser.password);
      
    if (!match) {
      return NextResponse.json({ error: 'Invalid superuser password' }, { status: 401 });
    }
    } else {
      return NextResponse.json({ error: 'No super user found' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error verifying password' }, { status: 500 });
  }

  // Hash the password if provided
  try {
    if (parseResult.data.password) {
      const saltRounds = 10;
      parseResult.data.password = await bcrypt.hash(parseResult.data.password, saltRounds);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error hashing password' }, { status: 500 });
  }

  // Create the new province
  const newProvince = await prisma.province.create({
    data: {
      name: parseResult.data.name,
      code: parseResult.data.code,
      password: parseResult.data.password,
    },
  });

  // Exclude the password from the response
  const { password, ...provinceWithoutPassword } = newProvince;
  const token = jwt.sign(provinceWithoutPassword, JWT_SECRET, { // Token expiration time
  });

  return NextResponse.json({token});
}

export async function DELETE(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid Province ID' }, { status: 400 });
  }

  const deletedProvince = await prisma.province.delete({
    where: { id },
  });

  if (!deletedProvince) {
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });
  }

  // Exclude the password from the response
  const { password, ...deletedProvinceWithoutPassword } = deletedProvince;

  return NextResponse.json({ message: 'Province deleted successfully', province: deletedProvinceWithoutPassword });
}

export async function PUT(request: NextRequest) {
  const url = request.nextUrl;
  const id = parseInt(url.searchParams.get('id') || '', 10);
  const body = await request.json();

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid Province ID' }, { status: 400 });
  }

  // Validate input
  const parseResult = validate(provinceSchema, body);
  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
  }

  // Hash the password if provided
  try {
    if (parseResult.data.password) {
      const saltRounds = 10;
      parseResult.data.password = await bcrypt.hash(parseResult.data.password, saltRounds);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error hashing password' }, { status: 500 });
  }

  const updatedProvince = await prisma.province.update({
    where: { id },
    data: {
      name: parseResult.data.name,
      code: parseResult.data.code,
      password: parseResult.data.password,
    },
  });

  if (!updatedProvince) {
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });
  }

  // Exclude the password from the response
  const { password, ...updatedProvinceWithoutPassword } = updatedProvince;

  return NextResponse.json(updatedProvinceWithoutPassword);
}
