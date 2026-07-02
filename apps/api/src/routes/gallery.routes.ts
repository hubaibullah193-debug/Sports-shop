import { Router, Response } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all gallery images
router.get('/', async (req: any, res: Response) => {
  try {
    const { category, skip = 0, take = 12 } = req.query;

    const where: any = {};
    if (category) {
      where.category = category;
    }

    const [images, total] = await Promise.all([
      prisma.galleryImage.findMany({
        where,
        skip: Number(skip),
        take: Number(take),
        orderBy: { order: 'asc' },
      }),
      prisma.galleryImage.count({ where }),
    ]);

    res.json({
      images,
      pagination: {
        total,
        skip: Number(skip),
        take: Number(take),
      },
    });
  } catch (error) {
    throw error;
  }
});

// Get gallery categories
router.get('/categories', async (req: any, res: Response) => {
  try {
    const categories = await prisma.galleryImage.findMany({
      distinct: ['category'],
      select: { category: true },
    });

    res.json(categories.map((c) => c.category).filter(Boolean));
  } catch (error) {
    throw error;
  }
});

export default router;
