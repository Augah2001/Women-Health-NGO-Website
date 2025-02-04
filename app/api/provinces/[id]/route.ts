import { NextRequest, NextResponse } from 'next/server';
import validate, { provinceSchema} from '../../validate';
import prisma from '../../../../prisma/client';

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {const province = await prisma?.province.findFirst({
    where: { id: parseInt(id) },
  });

  if (!province) return NextResponse.json({ error: 'Province not found' }, { status: 404 });

  return NextResponse.json(province);}
  catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'An error occurred while fetching the province' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const myId = parseInt(id);

  if (isNaN(myId)) {
    return NextResponse.json({ error: 'Invalid Province ID' }, { status: 400 });
  }

  const province = await prisma?.province.findFirst({
    where: { id: myId },
  });

  if (!province) {
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });
  }

  const deletedProvince = await prisma?.province.delete({
    where: { id: myId },
  });

  return NextResponse.json(deletedProvince);
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const body = await request.json();

  if (isNaN(parseInt(id))) {
    return NextResponse.json({ error: 'Invalid Province ID' }, { status: 400 });
  }

  const validateBody = validate(provinceSchema, body);

  if (!validateBody.success) {
    return NextResponse.json({ error: validateBody.error.errors }, { status: 400 });
  }

  const updatedProvince = await prisma?.province.update({
    where: { id: parseInt(id) },
    data: validateBody.data,
  });

  if (!updatedProvince) {
    return NextResponse.json({ error: 'Province not found' }, { status: 404 });
  }

  return NextResponse.json(updatedProvince);
}