// getAllTweets.js

import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // Get the user id from the session
    const session = await getSession({ req: request });
    const userId = session?.user?.id;

    // Find tweets associated with the user id
    const tweets = await prisma.tweet.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
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
