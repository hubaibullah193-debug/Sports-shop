import { Router, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

// Dashboard stats
router.get(
  '/dashboard',
  authenticate,
  authorize('ADMIN'),
  async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const [totalRevenue, totalOrders, totalCustomers, lowStockProducts] = await Promise.all([
        prisma.order.aggregate({
          _sum: { total: true },
          where: { status: 'DELIVERED' },
        }),
        prisma.order.count(),
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
        prisma.product.count({ where: { stock: { lte: 10 } } }),
      ]);

      res.json({
        totalRevenue: totalRevenue._sum.total || 0,
        totalOrders,
        totalCustomers,
        lowStockProducts,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Products management
router.get(
  '/products',
  authenticate,
  authorize('ADMIN'),
  async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skip = '0', take = '20' } = _req.query as { skip?: string; take?: string };

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          skip: Number(skip),
          take: Number(take),
          include: { category: true, brand: true, _count: { select: { reviews: true } } },
        }),
        prisma.product.count(),
      ]);

      res.json({ products, total, skip: Number(skip), take: Number(take) });
    } catch (error) {
      next(error);
    }
  }
);

// Orders management
router.get(
  '/orders',
  authenticate,
  authorize('ADMIN'),
  async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skip = '0', take = '20' } = _req.query as { skip?: string; take?: string };

      const [orders, total] = await Promise.all([
        prisma.order.findMany({
          skip: Number(skip),
          take: Number(take),
          include: { user: true, items: true },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.order.count(),
      ]);

      res.json({ orders, total, skip: Number(skip), take: Number(take) });
    } catch (error) {
      next(error);
    }
  }
);

// Customers
router.get(
  '/customers',
  authenticate,
  authorize('ADMIN'),
  async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skip = '0', take = '20' } = _req.query as { skip?: string; take?: string };

      const [customers, total] = await Promise.all([
        prisma.user.findMany({
          where: { role: 'CUSTOMER' },
          skip: Number(skip),
          take: Number(take),
          include: { _count: { select: { orders: true } } },
        }),
        prisma.user.count({ where: { role: 'CUSTOMER' } }),
      ]);

      res.json({ customers, total, skip: Number(skip), take: Number(take) });
    } catch (error) {
      next(error);
    }
  }
);

// Contact messages
router.get(
  '/messages',
  authenticate,
  authorize('ADMIN'),
  async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });

      res.json(messages);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
