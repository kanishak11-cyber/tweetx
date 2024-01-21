// /pages/api/follow/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export async function GET(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' });
    }

    // Retrieve the followers of the authenticated user
    const followers = await prisma.follower.findMany({
      where: { userId: session.user.id },
      include: {
        user: true,
      },
    });

    return NextResponse.json({ followers });
  } catch (error) {
    console.error(error);
    return NextResponse.error('Internal Server Error', { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const session = await getSession({ req });
    console.log(session)

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized', status: 401 });
    }

    const { followId } = await req.body.json(); // Corrected line

    // Check if the user with followId exists
    const followUser = await prisma.user.findUnique({
      where: { id: followId },
    });

    if (!followUser) {
      return NextResponse.error('User not found', { status: 404 });
    }

    // Create a follow relationship
    const follow = await prisma.follower.create({
      data: {
        follower: { connect: { id: session.user.id } },
        following: { connect: { id: followId } },
      },
    });

    return NextResponse.json({ message: 'POST request processed', status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error', status: 500 });
  }
}
