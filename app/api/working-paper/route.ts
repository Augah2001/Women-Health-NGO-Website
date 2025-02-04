import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '../../../prisma/client'; // Ensure your prisma client is correctly imported

export async function GET(req: NextRequest) {
  try {
    const allWorkingPapers = await prisma.workingPaper.findMany({
      
      orderBy: {
        date: 'desc', // Sort by date in descending order
      },
    });
    return NextResponse.json(allWorkingPapers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch working papers' }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get('title') as string;
    const abstract = formData.get('abstract') as string;
    const documentId = parseInt(formData.get('documentId') as string, 10);
    const date = new Date(formData.get('date') as string);
   

    const documentUrl = formData.get('documentUrl') as string;
      if (!documentUrl) {
        return NextResponse.json({ error: 'No document content file uploaded' }, { status: 400 });
      }
     

     

    const newWorkingPaper = await prisma.workingPaper.create({
      data: {
        title,
        abstract,
        documentUrl,
        date,
        
      },
    });

    return NextResponse.json(newWorkingPaper, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create working paper' }, { status: 500 });
  }
}

  
