import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Get a single research by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const research = await prisma.researchWithUs.findUnique({
      where: { id: parseInt(id, 10) },
     
    });

    if (!research) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 });
    }

    return NextResponse.json(research, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch research' }, { status: 500 });
  }
}

// Update a research by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const startDate = new Date(formData.get('startDate') as string);
    const endDate = new Date(formData.get('endDate') as string);
  

    // Optional: check if document is being updated
    const documentUrl = formData.get('documentUrl') as string;
   



    const updatedResearch = await prisma.researchWithUs.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        startDate,
        endDate,
        ...(documentUrl && { documentUrl })
      },
    });

    return NextResponse.json(updatedResearch, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to update research' }, { status: 500 });
  }
}

// Delete a research by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // First, delete the associated document
    const research = await prisma.researchWithUs.findUnique({
      where: { id: parseInt(id, 10) },
      
    });

    if (!research) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 });
    }

    // Delete the research
    await prisma.researchWithUs.delete({
      where: { id: parseInt(id, 10) },
    });

    // Delete the associated document, only if it exists


    return NextResponse.json({ message: 'Research deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete research' }, { status: 500 });
  }
}
