import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all categories
router.get('/', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: true,
        _count: { select: { products: true } },
      },
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// Get category by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params as { slug: string };

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
});

export default router;
