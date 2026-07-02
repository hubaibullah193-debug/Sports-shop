import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest, ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any, res: Response) => {
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
  async (req: AuthRequest, res: Response) => {
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
      } = req.body;

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
          stock,
          weight,
          dimensions,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      throw error;
    }
  }
);

// Update product (admin only)
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const product = await prisma.product.update({
        where: { id },
        data: updateData,
      });

      res.json(product);
    } catch (error) {
      throw error;
    }
  }
);

// Delete product (admin only)
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.product.delete({
        where: { id },
      });

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      throw error;
    }
  }
);

// Bulk update stock
router.post(
  '/stock/bulk-update',
  authenticate,
  authorize('ADMIN'),
  [body('updates').isArray()],
  async (req: AuthRequest, res: Response) => {
    try {
      validateRequest(req, res);
      const { updates } = req.body;

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
      throw error;
    }
  }
);

export default router;
