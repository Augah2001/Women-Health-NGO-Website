import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';

// GET: Fetch all image collections
export async function GET(req: NextRequest) {
  try {
    const collections = await prisma.imageCollection.findMany({
      include: {
        pictures: true, // Include related pictures if needed
      },
    });

    return NextResponse.json(collections, { status: 200 });
  } catch (error) {
    console.error('Error fetching image collections:', error);
    return NextResponse.json({ error: 'Error fetching image collections' }, { status: 500 });
  }
}

// POST: Create a new image collection
export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newCollection = await prisma.imageCollection.create({
      data: {
        title,
      },
    });

    return NextResponse.json(newCollection, { status: 201 });
  } catch (error) {
    console.error('Error creating image collection:', error);
    return NextResponse.json({ error: 'Error creating image collection' }, { status: 500 });
  }
}
