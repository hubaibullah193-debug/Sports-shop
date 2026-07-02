import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest, ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Get analytics dashboard
router.get('/analytics', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topProducts,
      revenueByDay,
    ] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: { not: 'CANCELLED' },
        },
      }),
      prisma.order.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.order.aggregate({
        _avg: { total: true },
        where: {
          createdAt: { gte: thirtyDaysAgo },
          status: { not: 'CANCELLED' },
        },
      }),
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        take: 10,
        where: {
          order: {
            createdAt: { gte: thirtyDaysAgo },
          },
        },
      }),
      prisma.order.groupBy({
        by: ['createdAt'],
        _sum: { total: true },
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
    ]);

    res.json({
      totalRevenue: totalRevenue._sum.total || 0,
      totalOrders,
      averageOrderValue: averageOrderValue._avg.total || 0,
      topProducts,
      revenueByDay,
    });
  } catch (error) {
    throw error;
  }
});

// Get inventory alerts
router.get('/inventory-alerts', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const alerts = await prisma.product.findMany({
      where: {
        stock: { lte: prisma.product.fields.lowStockAlert },
      },
      include: { category: true },
      orderBy: { stock: 'asc' },
    });

    res.json(alerts);
  } catch (error) {
    throw error;
  }
});

// Get customer insights
router.get('/customer-insights', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const [
      totalCustomers,
      newCustomersThisMonth,
      returningCustomers,
      topCustomers,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.user.count({
        where: {
          role: 'CUSTOMER',
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.user.count({
        where: {
          role: 'CUSTOMER',
          orders: { some: {} },
        },
      }),
      prisma.user.findMany({
        where: { role: 'CUSTOMER' },
        include: { _count: { select: { orders: true } } },
        orderBy: { orders: { _count: 'desc' } },
        take: 10,
      }),
    ]);

    res.json({
      totalCustomers,
      newCustomersThisMonth,
      returningCustomers,
      topCustomers,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
