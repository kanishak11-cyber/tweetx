// seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function seed() {
  try {
    // Clear existing data
    // await prisma.user.deleteMany();
    // await prisma.tweet.deleteMany();

    // Seed users
    const user1 = await prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'User 1',
        password: await bcrypt.hash('password123', 10), // Hash the password
        tweets: {
          create: {
            text: 'This is a tweet by User 1',
          },
        },
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'user2@example.com',
        name: 'User 2',
        password: await bcrypt.hash('password456', 10), // Hash the password
        tweets: {
          create: {
            text: 'This is a tweet by User 2',
          },
        },
      },
    });

    console.log('Data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}

seed();
