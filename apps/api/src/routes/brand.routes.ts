import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all brands
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { skip = '0', take = '20' } = _req.query as { skip?: string; take?: string };

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
    next(error);
  }
});

// Get brand by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params as { slug: string };

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
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    res.json(brand);
  } catch (error) {
    next(error);
  }
});

export default router;
