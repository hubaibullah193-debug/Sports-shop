import { Router, Response } from 'express';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/errors';

const router = Router();

// Search products
router.get('/search', async (req: AuthRequest, res: Response) => {
  try {
    const { q, take = 10 } = req.query;

    if (!q || typeof q !== 'string') {
      return res.json({ results: [] });
    }

    const results = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { category: { name: { contains: q, mode: 'insensitive' } } },
          { brand: { name: { contains: q, mode: 'insensitive' } } },
        ],
      },
      take: Number(take),
      include: {
        images: { take: 1 },
        category: true,
        brand: true,
      },
    });

    res.json({ results });
  } catch (error) {
    throw error;
  }
});

// Get suggestions (autocomplete)
router.get('/suggestions', async (req: AuthRequest, res: Response) => {
  try {
    const { q } = req.query;

    if (!q || typeof q !== 'string') {
      return res.json({ suggestions: [] });
    }

    const products = await prisma.product.findMany({
      where: {
        name: { contains: q, mode: 'insensitive' },
      },
      select: { name: true },
      take: 5,
      distinct: ['name'],
    });

    const categories = await prisma.category.findMany({
      where: {
        name: { contains: q, mode: 'insensitive' },
      },
      select: { name: true },
      take: 5,
    });

    const suggestions = [
      ...products.map((p) => ({ text: p.name, type: 'product' })),
      ...categories.map((c) => ({ text: c.name, type: 'category' })),
    ];

    res.json({ suggestions });
  } catch (error) {
    throw error;
  }
});

export default router;
