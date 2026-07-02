import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';
import { NotFoundError } from '../types/errors';

const router = Router();

// Get all products with filtering
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, brand, minPrice, maxPrice, search, skip = '0', take = '20' } = req.query as {
      category?: string;
      brand?: string;
      minPrice?: string;
      maxPrice?: string;
      search?: string;
      skip?: string;
      take?: string;
    };

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
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
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
    next(error);
  }
});

// Get single product
router.get('/:slug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params as { slug: string };

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
    next(error);
  }
});

// Get related products
router.get('/:slug/related', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params as { slug: string };
    const { take = '5' } = req.query as { take?: string };

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
    next(error);
  }
});

export default router;
