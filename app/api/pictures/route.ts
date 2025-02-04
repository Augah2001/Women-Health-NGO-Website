import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import sharp from 'sharp';

interface FormDataFields {
  content: File[];
  date: Date[];
  PeerOutreachId?: number;
  ImageCollectionTitle?: string;
}
export async function GET(req: NextRequest) {
  try {
    // Extract pagination parameters from the query string
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // Calculate pagination offsets
    const skip = (page - 1) * limit;

    // Fetch paginated and filtered pictures from Prisma
    const [allPictures, totalCount] = await Promise.all([
      prisma.picture.findMany({
        skip,
        take: limit,
        where: {
          ImageCollectionTitle: {
            not: null, // Filter to include only those with a non-null imageCollectionTitle
          },
        },
      }),
      prisma.picture.count({
        where: {
          ImageCollectionTitle: {
            not: null, // Count only those with a non-null imageCollectionTitle
          },
        },
      }), // Get the total count of picture items that match the filter
    ]);

  

    // Determine if there are more items to load
    const hasMore = totalCount > page * limit;

    // Return paginated results along with metadata
    return NextResponse.json({
      data: allPictures,
      totalCount,
      hasMore,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pictures:', error);
    return NextResponse.json({ error: 'Error fetching pictures' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {

  
  try {
    const formData = await req.formData();

    const images = formData.getAll('imageUrl') as string[];

    console.log(formData)
    
  
    const PeerOutreachId = formData.get('PeerOutreachId') ? parseInt(formData.get('PeerOutreachId') as string, 10) : undefined;
    const collectionTitle = formData.get('ImageCollectionTitle') as string | undefined;
    

    if (images.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let imageCollectionTitle: string | undefined;

    // Only create or find the collection if the title is not null, empty, or undefined
    if (collectionTitle && collectionTitle.trim()) {
      const existingCollection = await prisma.imageCollection.findFirst({
        where: { title: collectionTitle },
      });

      if (existingCollection) {
        imageCollectionTitle = existingCollection.title;
      } else {
        const newCollection = await prisma.imageCollection.create({
          data: {
            title: collectionTitle,
            date: new Date(), // Automatically set the current date
          },
        });
        imageCollectionTitle = newCollection.title;
      }
    }

    // Create pictures with the resolved ImageCollectionTitle
    const picturesData = await Promise.all(images.map(async (image, index) => {
      

      return {
        imageUrl: image,
        PeerOutreachId,
        ImageCollectionTitle: imageCollectionTitle, // This will be undefined if no collection was created or found
      };
    }));

    const createdPictures = await prisma.picture.createMany({
      data: picturesData,
    });

    return NextResponse.json({ message: 'Pictures created successfully', createdPictures }, { status: 201 });
  } catch (error) {
    console.error('Error creating pictures:', error);
    return NextResponse.json({ error: 'Error creating pictures' }, { status: 500 });
  }
}
