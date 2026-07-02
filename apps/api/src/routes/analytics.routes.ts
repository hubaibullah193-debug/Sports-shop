import { Router, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get analytics dashboard
router.get('/analytics', authenticate, async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
        orderBy: { productId: 'asc' },
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
    next(error);
  }
});

// Get inventory alerts
router.get('/inventory-alerts', authenticate, async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const alerts = await prisma.product.findMany({
      where: {
        stock: { lte: 10 },
      },
      include: { category: true },
      orderBy: { stock: 'asc' },
    });

    res.json(alerts);
  } catch (error) {
    next(error);
  }
});

// Get customer insights
router.get('/customer-insights', authenticate, async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    next(error);
  }
});

export default router;
