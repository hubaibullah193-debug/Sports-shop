// prisma/seed.ts
import { PrismaClient, UserRole, PrintingServiceType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.printingService.deleteMany();
  await prisma.faq.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@elitesports.com',
      password: '$2a$10$YourHashedPasswordHere', // bcrypt hash
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });

  // Create categories
  const sports = await prisma.category.create({
    data: {
      name: 'Sports Equipment',
      slug: 'sports-equipment',
      description: 'Professional sports equipment and gear',
    },
  });

  const stationery = await prisma.category.create({
    data: {
      name: 'Stationery',
      slug: 'stationery',
      description: 'Quality stationery products for office and school',
    },
  });

  const printing = await prisma.category.create({
    data: {
      name: 'Printing Materials',
      slug: 'printing-materials',
      description: 'Materials for professional printing',
    },
  });

  // Create subcategories
  await prisma.category.create({
    data: {
      name: 'Balls & Equipment',
      slug: 'balls-equipment',
      parentId: sports.id,
    },
  });

  // Create brands
  const nike = await prisma.brand.create({
    data: {
      name: 'Nike',
      slug: 'nike',
      website: 'https://nike.com',
    },
  });

  const adidas = await prisma.brand.create({
    data: {
      name: 'Adidas',
      slug: 'adidas',
      website: 'https://adidas.com',
    },
  });

  // Create printing services
  const printingServices = [
    { type: PrintingServiceType.FLEX_PRINTING, name: 'Flex Printing', basePrice: 50 },
    { type: PrintingServiceType.BANNER_PRINTING, name: 'Banner Printing', basePrice: 100 },
    { type: PrintingServiceType.VINYL_PRINTING, name: 'Vinyl Printing', basePrice: 75 },
    { type: PrintingServiceType.BUSINESS_CARDS, name: 'Business Cards', basePrice: 25 },
    { type: PrintingServiceType.VISITING_CARDS, name: 'Visiting Cards', basePrice: 20 },
    { type: PrintingServiceType.FLYERS, name: 'Flyers', basePrice: 30 },
    { type: PrintingServiceType.BROCHURES, name: 'Brochures', basePrice: 40 },
    { type: PrintingServiceType.POSTERS, name: 'Posters', basePrice: 35 },
    { type: PrintingServiceType.T_SHIRT_PRINTING, name: 'T-Shirt Printing', basePrice: 60 },
    { type: PrintingServiceType.STICKER_PRINTING, name: 'Sticker Printing', basePrice: 15 },
  ];

  for (const service of printingServices) {
    await prisma.printingService.create({
      data: service,
    });
  }

  // Create FAQs
  await prisma.faq.create({
    data: {
      question: 'What are your delivery options?',
      answer: 'We offer free delivery for orders above $50 and standard delivery for smaller orders.',
      category: 'Delivery',
      order: 1,
    },
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
