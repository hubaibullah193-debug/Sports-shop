import { Router, Response } from 'express';
import { query, param, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { NotFoundError, ValidationError } from '../types/errors';
import { AuthRequest } from '../middleware/auth';

const router = Router();

const validateRequest = (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Get all products with filtering
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const { category, brand, minPrice, maxPrice, search, skip = 0, take = 20 } = req.query;

    const where: any = { isActive: true };

    if (category) {
      where.category = { slug: category };
    }

    if (brand) {
      where.brand = { slug: brand };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: Number(skip),
        take: Number(take),
        include: {
          category: true,
          brand: true,
          images: { take: 1 },
          _count: { select: { reviews: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products,
      pagination: {
        total,
        skip: Number(skip),
        take: Number(take),
        hasMore: Number(skip) + Number(take) < total,
      },
    });
  } catch (error) {
    throw error;
  }
});

// Get single product
router.get('/:slug', async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: true,
        specifications: true,
        reviews: {
          include: { user: { select: { firstName: true, lastName: true, avatar: true } } },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundError('Product');
    }

    res.json(product);
  } catch (error) {
    throw error;
  }
});

// Get related products
router.get('/:slug/related', async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const { take = 5 } = req.query;

    const product = await prisma.product.findUnique({
      where: { slug },
      select: { categoryId: true, id: true },
    });

    if (!product) {
      throw new NotFoundError('Product');
    }

    const related = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        isActive: true,
      },
      take: Number(take),
      include: {
        images: { take: 1 },
        brand: true,
      },
    });

    res.json(related);
  } catch (error) {
    throw error;
  }
});

export default router;
