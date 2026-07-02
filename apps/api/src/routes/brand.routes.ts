import { Router, Response } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all brands
router.get('/', async (req: any, res: Response) => {
  try {
    const { skip = 0, take = 20 } = req.query;

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        skip: Number(skip),
        take: Number(take),
        include: { _count: { select: { products: true } } },
      }),
      prisma.brand.count(),
    ]);

    res.json({
      brands,
      total,
      skip: Number(skip),
      take: Number(take),
    });
  } catch (error) {
    throw error;
  }
});

// Get brand by slug
router.get('/:slug', async (req: any, res: Response) => {
  try {
    const { slug } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        products: {
          take: 12,
          include: { images: { take: 1 } },
        },
      },
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    throw error;
  }
});

export default router;
