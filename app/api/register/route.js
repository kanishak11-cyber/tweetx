// Import necessary modules
import { NextResponse } from "next/server";
// import { prisma } from "@prisma/client/index";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Define the POST handler
export async function POST(req) {
  try {
    // Extract user information from the request body
    const { name, email, password, confirmPassword } = await req.json();

    // Check if all required fields are provided
    if (!email || !password || !confirmPassword) {
      return new NextResponse("Please fill all the required fields", {
        status: 400,
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return new NextResponse("Passwords do not match", {
        status: 400,
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse("User with this email already exists.", {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // Log the user creation and return a success response
    console.log("User Created:", newUser);

    return new NextResponse(
      "User created successfully.",
      
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log any errors and return an appropriate error response
    console.error("Error creating user:", error);
    return new NextResponse("Failed to create user. Please try again later.", {
      status: 500,
    });
  }
}


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include:{
        tweets: {
          select: {
            text: true,
          },
        },
        followers: true,
        following: true,
      }
    });
    return new NextResponse(JSON.stringify(users), {
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