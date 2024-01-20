import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authorize = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error("Please fill in all fields.");
  }

  const user = await prisma.User.findUnique({
    where: {
      email: String(email),
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid password.");
  }

  return user;
};

const handleSession = async ({ session }) => {
  try {
    const email = session?.user?.email;

    if (!email) {
      console.error("email not found in session:", session);
      throw new Error("email not found.");
    }

    const userData = await prisma.User.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
      },
    });

    if (!userData) {
      throw new Error("User not found.");
    }

    const { name } = userData;

    return {
      ...session,
      user: {
        ...session.user,
        email,
        name,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: '',
        },
        password: {
          label: "Password",
          type: "date",
          placeholder: '',
        },
      },
      authorize: authorize,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    session: handleSession,
    jwt: async ({ token, user }) => ({
      ...token,
      email: user?.email,
      name: user?.name,
    }),
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET, handler as PUT, handler as DELETE}
