import { Router, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

const router = Router();

// Get all categories
router.get('/', async (req: AuthRequest, res: Response) => {
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
    throw error;
  }
});

// Get category by slug
router.get('/:slug', async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    throw error;
  }
});

export default router;
