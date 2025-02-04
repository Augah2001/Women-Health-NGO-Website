import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { drugInfoSchema, default as validate } from '../validate';




export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Extract query parameters with default values
  const code = searchParams.get('code') ?? '';
  const provinceName = searchParams.get('provinceName') ?? '';
  const ageGroup = searchParams.get('ageGroup') ?? '';
  const gender = searchParams.get('gender') ?? '';
  const startDate = searchParams.get('startDate') ?? '';
  const endDate = searchParams.get('endDate') ?? '';
  const race = searchParams.get('race') ?? '';
  const drugName = searchParams.get('drugName') ?? '';
  const location = searchParams.get('location') ?? '';

  // Handle numeric parameters safely
  let price: number | undefined;
  const priceString = searchParams.get('price');
  if (priceString !== null) {
    const parsedPrice = parseFloat(priceString);
    if (!isNaN(parsedPrice)) { // Check for valid numbers. If NaN it'll be undefined.
      price = parsedPrice;
    }
  }

  let usersCount: number | undefined;
  const usersCountString = searchParams.get('usersCount');
  if (usersCountString !== null) {
    const parsedUsersCount = parseInt(usersCountString, 10);
    if (!isNaN(parsedUsersCount)) { // Check for valid numbers. If NaN it'll be undefined.
      usersCount = parsedUsersCount;
    }
  }
  // Build a Prisma query based on the provided query parameters
  const where: { [key: string]: any } = {
    ProvinceCode: code ? { startsWith: code, mode: 'insensitive' } : undefined,
    Province: provinceName ? { name: { startsWith: provinceName, mode: 'insensitive' } } : undefined,
    ageGroup: ageGroup ? { startsWith: ageGroup, mode: 'insensitive' } : undefined,
    gender: gender ? { startsWith: gender, mode: 'insensitive' } : undefined,
    race: race ? { startsWith: race, mode: 'insensitive' } : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    drugName: drugName ? { startsWith: drugName, mode: 'insensitive' } : undefined,
    price: price || undefined,
    location: location ? { startsWith: location, mode: 'insensitive' } : undefined,
    usersCount: usersCount || undefined,
  };

  // Remove undefined values from the query object
  Object.keys(where).forEach(key => {
    if (where[key] === undefined) {
      delete where[key];
    }
  });

  // Fetch data based on the constructed where clause
  const provinces = await prisma.drugInfo.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { Province: true },
  });

  return NextResponse.json(provinces);
}



export async function POST(request: NextRequest) {
  try {const body = await request.json();
  console.log(body);
  const parseResult = validate(drugInfoSchema, body);

  if (!parseResult.success) {
    return NextResponse.json({ error: parseResult.error.errors }, { status: 400 });
  }

  const province = await prisma.province.findUnique({ where: { code: parseResult.data.ProvinceCode } });
  if (!province){
    console.log("Province not found");
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });}

  const newDrugInfo = await prisma.drugInfo.create({
    data: {
      startAge: parseResult.data.startAge,
      endAge: parseResult.data.endAge,
      gender: parseResult.data.gender,
      startDate: parseResult.data.startDate,
      endDate: parseResult.data.endDate,
      race: parseResult.data.race,
      drugName: parseResult.data.drugName,
      price: parseResult.data.price,
      location: parseResult.data.location,
      usersCount: parseResult.data.usersCount,
      ProvinceCode: parseResult.data.ProvinceCode,
    },
  });

  return NextResponse.json(newDrugInfo);}
  catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

