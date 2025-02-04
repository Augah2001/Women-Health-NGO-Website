import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";


interface ResearchData {
  publicationDate: string;
  title: string;
  author: string;
  abstract: string;

  documentUrl?: string; 
  imageUrl?: string;
}



export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // 1. Ensure id is a valid integer
  const researchId = parseInt(id);
  if (isNaN(researchId)) {
    return NextResponse.json({ message: 'Invalid research ID' }, { status: 400 });
  }

  // 2. Fetch research data
  const research = await prisma.research.findUnique({
    where: { id: researchId },
  });

  // 3. Handle case where research is not found
  if (!research) {
    return NextResponse.json({ message: 'Research not found' }, { status: 404 });
  }



  // 5. Return research data along with the image URL if available
  return NextResponse.json(research, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    const researchId = parseInt(params.id); 

    if (!researchId) {
      return NextResponse.json({ error: 'Research ID is required for update' }, { status: 400 });
    }

    const existingResearch = await prisma.research.findUnique({
      where: { id: researchId },
    });

    if (!existingResearch) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 });
    }

    // Update research data
    const updatedResearchData: ResearchData = {
      publicationDate: formData.get('publicationDate') as string || existingResearch.publicationDate,
      title: formData.get('title') as string || existingResearch.title,
      author: formData.get('author') as string || existingResearch.author,
      abstract: formData.get('abstract') as string || existingResearch.abstract,
       // Keep current image URL unless changed later
    };

    // Handle optional document content update
  
      const documentUrl = formData.get('documentUrl') as string;
   

    // Handle optional image content update
   const imageUrl = formData.get('imageUrl') as string
    // Now, update the research record in the database
    const updatedResearch = await prisma.research.update({
      where: { id: researchId },
      data: {...updatedResearchData ,...(imageUrl&& {imageUrl: imageUrl}) ,...(documentUrl&& {documentUrl: documentUrl})},
    });

    return NextResponse.json(updatedResearch, { status: 200 });
  } catch (error) {
    console.error('Error updating research:', error);
    return NextResponse.json({ error: 'Error updating research' }, { status: 500 });
  }
}


// DELETE endpoint: Delete a research entry (and its associated document)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const researchId = parseInt(params.id); 

    if (!researchId) {
      return NextResponse.json({ error: 'Research ID is required for deletion' }, { status: 400 });
    }

    const existingResearch = await prisma.research.findUnique({
      where: { id: researchId },
    });

    if (!existingResearch) {
      return NextResponse.json({ error: 'Research not found' }, { status: 404 });
    }

    await prisma.research.delete({
      where: { id: researchId },
    });




    

    return NextResponse.json({ message: 'Research and associated document deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting research:', error);
    return NextResponse.json({ error: 'Error deleting research' }, { status: 500 });
  }
}
