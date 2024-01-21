// getUserTweets.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return new NextResponse('User ID is required', {
        status: 400,
      });
    }

    const userTweets = await prisma.tweet.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return new NextResponse(JSON.stringify(userTweets), {
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
