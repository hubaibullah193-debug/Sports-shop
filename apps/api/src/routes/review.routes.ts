import { Router, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Add review
router.post(
  '/',
  authenticate,
  [
    body('productId').notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('title').notEmpty(),
  ],
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req);
      const { productId, rating, title, comment } = req.body as {
        productId: string;
        rating: number;
        title: string;
        comment?: string;
      };

      const review = await prisma.review.create({
        data: {
          userId: req.user!.id,
          productId,
          rating,
          title,
          comment,
          isVerified: true,
        },
      });

      res.status(201).json({
        message: 'Review added successfully',
        review,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get product reviews
router.get('/product/:productId', async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params as { productId: string };
    const { skip = 0, take = 10 } = req.query as { skip?: string; take?: string };

    const reviews = await prisma.review.findMany({
      where: { productId },
      skip: Number(skip),
      take: Number(take),
      include: {
        user: { select: { firstName: true, lastName: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const total = await prisma.review.count({ where: { productId } });
    const avgRating = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
    });

    res.json({
      reviews,
      avgRating: avgRating._avg.rating,
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

export default router;
