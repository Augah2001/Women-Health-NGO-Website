import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = parseInt(params.id, 10); 
  
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid picture ID' }, { status: 400 });
      }
  
      const formData = await req.formData();
  
      const file = formData.get('content') as File | null;
      const date = formData.get('date') ? new Date(formData.get('date') as string) : undefined;
      const PeerOutreachId = formData.get('PeerOutreachId') ? parseInt(formData.get('PeerOutreachId') as string, 10) : undefined;
      const ImageCollectionId = formData.get('ImageCollectionId') ? parseInt(formData.get('ImageCollectionId') as string, 10) : undefined;
  
      let updatedData: { content?: Buffer; date?: Date; PeerOutreachId?: number; ImageCollectionId?: number } = {};
  
      if (file) {
        const imageData = await file.arrayBuffer();
        const optimizedImageBuffer = await sharp(imageData)
          .resize({ width: 600 }) 
          .jpeg({ quality: 80 }) 
          .toBuffer();
        updatedData.content = optimizedImageBuffer;
      }
  
      if (date) updatedData.date = date;
      if (PeerOutreachId !== undefined) updatedData.PeerOutreachId = PeerOutreachId;
      if (ImageCollectionId !== undefined) updatedData.ImageCollectionId = ImageCollectionId;
  
      const updatedPicture = await prisma.picture.update({
        where: { id },
        data: updatedData,
      });
  
      return NextResponse.json({ message: 'Picture updated successfully', updatedPicture }, { status: 200 });
    } catch (error) {
      console.error('Error updating picture:', error);
      return NextResponse.json({ error: 'Error updating picture' }, { status: 500 });
    }
  }
  
  export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

    console.log("DELETE PICTURE")
    try {
      const id = parseInt(params.id, 10);
  
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid picture ID' }, { status: 400 });
      }
  
      await prisma.picture.delete({
        where: { id },
      });
  
      return NextResponse.json({ message: 'Picture deleted successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error deleting picture:', error);
      return NextResponse.json({ error: 'Error deleting picture' }, { status: 500 });
    }
  }
  
  export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const picture = await prisma.picture.findUnique({
        where: { id: parseInt(params.id, 10) },
      });
  
      if (!picture) {
        return NextResponse.json({ error: 'Picture not found' }, { status: 404 });
      }
  
      
  
      return NextResponse.json(picture, { status: 200 });
    } catch (error) {
      console.error('Error fetching picture:', error);
      return NextResponse.json({ error: 'Error fetching picture' }, { status: 500 });
    }
  }