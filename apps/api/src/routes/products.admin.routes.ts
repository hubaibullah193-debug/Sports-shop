import { Router, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any, _res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Create product (admin only)
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  [
    body('sku').notEmpty(),
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('categoryId').notEmpty(),
  ],
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req, res);
      const {
        sku,
        name,
        slug,
        description,
        price,
        compareAtPrice,
        cost,
        discount,
        categoryId,
        brandId,
        stock,
        weight,
        dimensions,
      } = req.body as {
        sku: string;
        name: string;
        slug?: string;
        description?: string;
        price: number;
        compareAtPrice?: number;
        cost?: number;
        discount?: number;
        categoryId: string;
        brandId?: string;
        stock?: number;
        weight?: string;
        dimensions?: string;
      };

      const product = await prisma.product.create({
        data: {
          sku,
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
          description,
          price,
          compareAtPrice,
          cost,
          discount,
          categoryId,
          brandId,
          stock: stock ? Number(stock) : undefined,
          weight,
          dimensions,
        } as any,
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Update product (admin only)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as { id: string };
      const updateData = req.body as Record<string, any>;

      const product = await prisma.product.update({
        where: { id },
        data: updateData,
      });

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Delete product (admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params as { id: string };

      await prisma.product.delete({
        where: { id },
      });

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
);

// Bulk update stock
router.post(
  '/stock/bulk-update',
  authenticate,
  authorize('ADMIN'),
  [body('updates').isArray()],
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req, res);
      const { updates } = req.body as {
        updates: Array<{ productId: string; stock: number }>;
      };

      const results = await Promise.all(
        updates.map((update: any) =>
          prisma.product.update({
            where: { id: update.productId },
            data: { stock: update.stock },
          })
        )
      );

      res.json({ message: 'Stock updated', updated: results.length });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
