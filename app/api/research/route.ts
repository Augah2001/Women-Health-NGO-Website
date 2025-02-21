import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import prisma from "../../../prisma/client";
import sharp from "sharp";
import pako from "pako";

// Interfaces for Research and Document data
interface ResearchData {
  publicationDate: string;
  title: string;
  abstract: string;
  author: string;
  
  imageUrl: any,

  documentUrl: string;
}




// GET endpoint: Fetch all research entries
export async function GET(req: NextRequest) {
  try {
    // Extract pagination parameters from the query string
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    // Calculate pagination offsets
    const skip = (page - 1) * limit;

    // Fetch paginated research items from Prisma
    const [allResearch, totalCount] = await Promise.all([
      prisma.research.findMany({
        skip,
        take: limit,
        orderBy: {
          publicationDate: "desc", // Sort by date in descending order
        },
        
      }),
      prisma.research.count(), // Get the total count of research items
    ]);

    // Process research data

    // Determine if there are more items to load
    const hasMore = totalCount > page * limit;
    console.log(allResearch)
    // Return paginated results along with metadata
    return NextResponse.json(
      {
        data: allResearch,
        totalCount,
        hasMore,
      },
      { status: 200 }
    );

    
  } catch (error) {
    console.log("Error fetching research:", error);
    return NextResponse.json(
      { error: "Error fetching research" },
      { status: 500 }
    );
  }
}

// POST endpoint: Create new research entry and associated document
export async function POST(req: NextRequest) {


  try {
    const formData = await req.formData();
    const imagePath = formData.get("imageUrl") as File;

    if (!imagePath) {
      return NextResponse.json(
        { error: "No image file uploaded" },
        { status: 400 }
      );
    }

    

    const contentPath = formData.get("documentUrl") as File;
    if (!contentPath) {
      return NextResponse.json(
        { error: "No document content file uploaded" },
        { status: 400 }
      );
    }


    const researchData: ResearchData = {
      publicationDate: formData.get("publicationDate") as string,
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      abstract: formData.get("abstract") as string,
      documentUrl: formData.get("documentUrl") as string,
      imageUrl: formData.get("imageUrl"),
    };

    

    

    const newResearch = await prisma.research.create({
      data: {
        ...researchData,
        
      },
    });

    console.timeEnd("POST request duration"); // End timing

    return NextResponse.json(newResearch, { status: 201 });
  } catch (error) {
    console.error("Error creating research:", error);
    return NextResponse.json(
      { error: "Error creating research" },
      { status: 500 }
    );
  }
}
