// src/app/api/research-with-us/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client'; // Ensure the correct path to your prisma client

export async function GET(req: NextRequest) {
  try {
    const researchProjects = await prisma.researchWithUs.findMany({
     
      orderBy: {postDate:'desc'}
    });
    return NextResponse.json(researchProjects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch research projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      const formData = await req.formData();
  
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const startDate = new Date(formData.get('startDate') as string);
      const endDate = new Date(formData.get('endDate') as string);
      const collaborators = (formData.get('collaborators') as string).split(',');
  
      const documentUrl = formData.get('documentUrl') as string;
      if (!documentUrl) {
        return NextResponse.json({ error: 'No document content file uploaded' }, { status: 400 });
      }
      
  
    
  
      const newResearch = await prisma.researchWithUs.create({
        data: {
          title,
          description,
          startDate,
          endDate,
          collaborators,
          documentUrl
        },
      });
  
      return NextResponse.json(newResearch, { status: 201 });
    } catch (error) {
        console.log(error);
      return NextResponse.json({ error: 'Failed to create research project' }, { status: 500 });
    }
  }