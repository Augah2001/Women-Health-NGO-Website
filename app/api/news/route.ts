import { NextRequest, NextResponse } from 'next/server';


import prisma from '../../../prisma/client';





interface RequestBody {
  title: string;
  date: string;
  body: string;
  imageUrl: string;

}



export async function GET(req: NextRequest) {
  try {
    // Extract pagination parameters from the query string
    const url = new URL(req.url);
    console.log(url)
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    // Calculate pagination offsets
    const skip = (page - 1) * limit;

    // Fetch paginated news items from Prisma
    const [news, totalCount] = await Promise.all([
      prisma.news.findMany({
        skip,
        take: limit,
        orderBy: {
          date: 'desc',
        },
      }),
      prisma.news.count(), // Get the total count of news items
    ]);

   

    // Determine if there are more items to load
    const hasMore = totalCount > page * limit;

   

    // Return paginated results along with metadata
    return NextResponse.json({
      data: news,
      totalCount,
      hasMore,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data.' }, { status: 500 });
  }
}





export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
   
    const image = formData.get('imageUrl') as File;

    if (!image) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }


   
        

    const requestBody: RequestBody = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      body: formData.get('body') as string,
      imageUrl: formData.get('imageUrl') as string,
    };

    const news = await prisma.news.create({
      data: {
        ...requestBody,
        
        
      },
    });
    

    return NextResponse.json( news , { status: 201 });

  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Error creating news' }, { status: 500 });
  }
}
