const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.book.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@readify.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'user@readify.com',
      password: userPassword,
      name: 'John Doe',
      role: 'USER',
    },
  });

  // Create books
  await prisma.book.createMany({
    data: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A classic American novel set in the Jazz Age, exploring themes of love, wealth, and the American Dream.',
        price: 12.99,
        category: 'Classics',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/gatsby.jpg',
        stock: 50,
        rating: 4.5,
        reviews: 328,
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        description: 'An easy and proven way to build good habits, break bad ones, and master tiny behaviors that lead to remarkable results.',
        price: 16.99,
        category: 'Business',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/atomic.jpg',
        stock: 75,
        rating: 4.8,
        reviews: 1250,
      },
      {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel that depicts a totalitarian society under constant surveillance, exploring themes of power and control.',
        price: 13.99,
        category: 'Classics',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/1984.jpg',
        stock: 60,
        rating: 4.6,
        reviews: 892,
      },
      {
        title: 'Rich Dad Poor Dad',
        author: 'Robert T. Kiyosaki',
        description: 'A personal finance book that contrasts the financial philosophies of two father figures, teaching financial literacy and investment.',
        price: 14.99,
        category: 'Business',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/richDad.jpg',
        stock: 80,
        rating: 4.7,
        reviews: 2100,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A Pulitzer Prize-winning novel about racial injustice and childhood innocence in the American South.',
        price: 11.99,
        category: 'Classics',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/mockingbird.jpg',
        stock: 45,
        rating: 4.7,
        reviews: 1567,
      },
      {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        description: 'A guide to building successful businesses through validated learning, rapid experimentation, and iterative product development.',
        price: 15.99,
        category: 'Business',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/leanstartup.jpg',
        stock: 55,
        rating: 4.5,
        reviews: 756,
      },
      {
        title: 'Mindset',
        author: 'Carol S. Dweck',
        description: 'Explores the difference between fixed and growth mindsets and how adopting a growth mindset can lead to greater success.',
        price: 14.99,
        category: 'Self-Help',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/mindset.jpg',
        stock: 70,
        rating: 4.6,
        reviews: 1234,
      },
      {
        title: 'The 7 Habits of Highly Effective People',
        author: 'Stephen R. Covey',
        description: 'A groundbreaking book on personal development and leadership, introducing seven habits for achieving success and fulfillment.',
        price: 17.99,
        category: 'Self-Help',
        imageUrl: 'https://res.cloudinary.com/demo/image/fetch/c_limit,w_500/https://example.com/7habits.jpg',
        stock: 65,
        rating: 4.8,
        reviews: 1890,
      },
    ],
  });

  // Fetch all books to use in order
  const books = await prisma.book.findMany();

  // Create a sample order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: 29.98,
      status: 'completed',
      items: {
        create: [
          {
            bookId: books[0].id,
            quantity: 1,
            price: 12.99,
          },
          {
            bookId: books[1].id,
            quantity: 1,
            price: 16.99,
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Admin user:', admin.email);
  console.log('Regular user:', user.email);
  console.log(`Created ${books.length} books`);
  console.log('Created sample order');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });