// getAllTweets.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tweets = await prisma.tweet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include:{
        author: {
          select: {
            name: true,
          },
        },
      }
    });

    return new NextResponse(JSON.stringify(tweets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Something went wrong.', {
      status: 500,
    });
  }
}
