import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Search products
router.get('/search', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q, take = '10' } = req.query as { q?: string; take?: string };

    if (!q || typeof q !== 'string') {
      res.json({ results: [] });
      return;
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
    next(error);
  }
});

// Get suggestions (autocomplete)
router.get('/suggestions', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query as { q?: string };

    if (!q || typeof q !== 'string') {
      res.json({ suggestions: [] });
      return;
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
      ...products.map((p: any) => ({ text: p.name, type: 'product' })),
      ...categories.map((c: any) => ({ text: c.name, type: 'category' })),
    ];

    res.json({ suggestions });
  } catch (error) {
    next(error);
  }
});

export default router;
