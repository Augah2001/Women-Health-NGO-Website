import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import validate, { peerOutreachSchema } from "../../validate";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // 1. Ensure id is a valid integer
  const outreachId = parseInt(id);
  if (isNaN(outreachId)) {
    return NextResponse.json(
      { message: "Invalid outreach ID" },
      { status: 400 }
    );
  }

  // 2. Fetch outreach data
  const outreach = await prisma.peerOutreach.findUnique({
    where: { id: outreachId },
    include: { images: true },
  });

  // 3. Handle case where outreach is not found
  if (!outreach) {
    return NextResponse.json(
      { message: "Outreach not found" },
      { status: 404 }
    );
  }

  // 4. Process image if available
 
    // 5. Handle case where image is not available but outreach is found
    return NextResponse.json(outreach, { status: 200 });
  
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Parse the formData
    const formData = await req.formData();

    // Extract fields from formData
    const theme = formData.get("theme") as string;
    const location = formData.get("location") as string;
    const From = new Date(formData.get("From") as string);
    const To = new Date(formData.get("To") as string);
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;

    const data = { theme, location, From, To, description, body };
    const parseResult = validate(peerOutreachSchema, data);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 }
      );
    }

    const images = await Promise.all(
      formData.getAll("images").map(async (img: any) => {
        
        return img;
      })
    );

    console.log(images);
   

    // Update the existing PeerOutreach entry
    const updatedPeerOutreach = await prisma.peerOutreach.update({
      where: { id: parseInt(id) },
      data: {
        theme,
        location,
        From,
        To,
        description,
        body,
        ...(images.length > 0 && {
          images: {
            deleteMany: {}, // Delete existing images
            create: images.map((img: any) => ({ imageUrl: img })), // Add new images
          },
        }),
      },
      include: { images: true },
    });
    

   

    

    return NextResponse.json(updatedPeerOutreach, { status: 200 }); 
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update PeerOutreach" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // 1. Fetch the PeerOutreach entry to get the image IDs
    const peerOutreach = await prisma.peerOutreach.findUnique({
      where: { id: parseInt(id) },
      include: { images: true }, // Include the associated images
    });

    if (!peerOutreach) {
      return NextResponse.json({ error: 'PeerOutreach not found' }, { status: 404 });
    }

    // 2. Delete the associated images
    const imageIds = peerOutreach.images.map(image => image.id);
    await prisma.picture.deleteMany({
      where: { id: { in: imageIds } },
    });

    // 3. Delete the PeerOutreach entry
    const deleted = await prisma.peerOutreach.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({id: deleted}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete PeerOutreach or associated images" },
      { status: 500 }
    );
  }
}
