import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
      // Extract the news ID from the query parameters
      const newsId = id;
  
      if (!newsId) {
        return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
      }
  
      // Fetch the specific news item using the ID
      const news = await prisma.news.findUnique({
        where: { id: parseInt(newsId) },
      });
  
      if (!news) {
        return NextResponse.json({ error: 'News not found' }, { status: 404 });
      }
  
     
  
      return NextResponse.json(news, { status: 200 });
    } catch (error) {
      console.error('Error fetching news:', error);
      return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
    }
  }

  export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const newsId = parseInt(params.id);
      console.log(params)
  
      if (!newsId) {
        return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
      }
  
      const formData = await req.formData();
      const imageUrl = formData.get('imageUrl') as string;
  
      
  
      const requestBody: any = {
        title: formData.get('title') as string,
        date: formData.get('date') as string,
        body: formData.get('body') as string,
      };
  
      const updatedNews = await prisma.news.update({
        where: { id: newsId },
        data: {
          ...requestBody,
          ...(imageUrl && { imageUrl }), // Only include the image field if imageData is not null
        },
      });
      
     
      return NextResponse.json(updatedNews , { status: 200 });
  
    } catch (error) {
      console.error('Error updating news:', error);
      return NextResponse.json({ error: 'Error updating news' }, { status: 500 });
    }
  }
  
  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const newsId = parseInt(params.id);
  
      if (!newsId) {
        return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
      }
  
      await prisma.news.delete({
        where: { id: newsId },
      });
  
      return NextResponse.json({ message: 'News deleted successfully' }, { status: 200 });
    } catch (error) {
      console.log('Error deleting news:', error);
      return NextResponse.json({ error: 'Error deleting news' }, { status: 500 });
    }
  }