import { Router, Response } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest } from '../types/errors';

const router = Router();

// Dashboard stats
router.get('/dashboard', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response) => {
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
    throw error;
  }
});

// Products management
router.get('/products', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const { skip = 0, take = 20 } = req.query;

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
    throw error;
  }
});

// Orders management
router.get('/orders', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const { skip = 0, take = 20 } = req.query;

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
    throw error;
  }
});

// Customers
router.get('/customers', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const { skip = 0, take = 20 } = req.query;

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
    throw error;
  }
});

// Contact messages
router.get('/messages', authenticate, authorize('ADMIN'), async (req: AuthRequest, res: Response) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(messages);
  } catch (error) {
    throw error;
  }
});

export default router;
