import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';


// Get a single working paper by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    const workingPaper = await prisma.workingPaper.findUnique({
      where: { id: parseInt(id, 10) },
     
    });

    if (!workingPaper) {
      return NextResponse.json({ error: 'Working Paper not found' }, { status: 404 });
    }

    return NextResponse.json(workingPaper, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch working paper' }, { status: 500 });
  }
}

// Update a working paper by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
   
  const { id } = params;
  
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const abstract = formData.get('abstract') as string;
    const documentUrl = formData.get('documentUrl') as string

 

    // Optional: check if document is being updated


  

    const updatedWorkingPaper = await prisma.workingPaper.update({
      where: { id: parseInt(id, 10) },
      data: {
        id:parseInt(id),
        title,
        abstract,
        documentUrl: documentUrl
      },
    });

    return NextResponse.json(updatedWorkingPaper, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update working paper' }, { status: 500 });
  }
}

// Delete a working paper by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
    // First, delete the associated document
    const workingPaper = await prisma.workingPaper.findUnique({
      where: { id: parseInt(id, 10) },
    
    });

    if (!workingPaper) {
      return NextResponse.json({ error: 'Working Paper not found' }, { status: 404 });
    }

     // Then delete the working paper
     await prisma.workingPaper.delete({
        where: { id: parseInt(id, 10) },
      });

    // Delete the document first
  
   

   

    return NextResponse.json({ message: 'Working Paper deleted successfully' }, { status: 200 });
  } catch (error) {

    console.log(error)
    return NextResponse.json({ error: 'Failed to delete working paper' }, { status: 500 });
  }
}
