  import { NextResponse } from "next/server";
  import { PrismaClient } from "@prisma/client";

  const prisma = new PrismaClient();

  export async function POST(req) {
    try {
      const { authorId,text} = await req.json();

      if (!text) {
        return new NextResponse("Please fill all the required fields", {
          status: 400,
        });
      }

      const newTweet = await prisma.tweet.create({
        data: {
          text: text,
          authorId: authorId ,
        },
      });

      console.log("Tweet Created:", newTweet);

      return new NextResponse("Tweet created successfully.", {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new NextResponse("Something went wrong.", {
        status: 500,
      });
    }
  }

  export async function GET() {
    try {
      const tweets = await prisma.tweet.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return new NextResponse(JSON.stringify(tweets), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse("Something went wrong.", {
        status: 500,
      });
    }
  }