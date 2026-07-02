import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all gallery images
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, skip = '0', take = '12' } = req.query as { category?: string; skip?: string; take?: string };

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
    next(error);
  }
});

// Get gallery categories
router.get('/categories', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.galleryImage.findMany({
      distinct: ['category'],
      select: { category: true },
    });

    res.json(categories.map((c: any) => c.category).filter(Boolean));
  } catch (error) {
    next(error);
  }
});

export default router;
