import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import validate, { peerOutreachSchema } from "../validate";
import sharp from "sharp";

export async function GET(req: NextRequest) {
  try {
    const peerOutreach = await prisma.peerOutreach.findMany({
      include: {
        images: true, // Include associated Picture objects
      },
      orderBy: {
        From: "desc",
      }
    });

   

    

    return NextResponse.json(peerOutreach, { status: 200 });
  } catch (error) {
    
    return NextResponse.json(
      { error: "Failed to fetch PeerOutreach" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse the formData
    const formData = await req.formData();

    // Extract fields from formData and ensure they are strings or handle null cases
    const theme = formData.get("theme")?.toString() || ""; // Provide a fallback or handle error
    const location = formData.get("location")?.toString() || "";
    
    const fromValue = formData.get("From");
    const From = fromValue ? new Date(fromValue.toString()) : new Date(); // Handle null case

    const toValue = formData.get("To");
    const To = toValue ? new Date(toValue.toString()) : new Date(); // Handle null case

    const description = formData.get("description")?.toString() || "";
    const body = formData.get("body")?.toString() || "";

    const data = { theme, location, From, To, description, body };
    const parseResult = validate(peerOutreachSchema, data);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 }
      );
    }

    const images = await Promise.all(
      formData.getAll("images").map((img: any) => {
        
        
       
        return img
      })
    );

    
    
    if (images.length==0) {
      return NextResponse.json(
        { error: "Please select atleast one image" },
        { status: 400 }
      );
    }

 

    

    const newPeerOutreach = await prisma.peerOutreach.create({
      data: {
        theme,
        location,
        images: {
          create: images.map((img: any) => ({ imageUrl: img })),
        },
        From,
        To,
        description,
        body,
      },
      include: {
        images: true,
      },
    });

    

   console.log(newPeerOutreach);

    return NextResponse.json(newPeerOutreach, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create PeerOutreach" },
      { status: 500 }
    );
  }
}
