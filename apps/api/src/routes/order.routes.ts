import { Router, Response } from 'express';
import prisma from '../utils/prisma';
import { authenticate, authorize } from '../middleware/auth';
import { AuthRequest, NotFoundError, ValidationError } from '../types/errors';

const router = Router();

// Get user orders
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    throw error;
  }
});

// Get single order
router.get('/:orderNumber', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { orderNumber } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        orderNumber,
        userId: req.user!.id,
      },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundError('Order');
    }

    res.json(order);
  } catch (error) {
    throw error;
  }
});

// Create order
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      throw new ValidationError('No items in order');
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundError('Product');
      }

      const price = product.price;
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price,
      });
    }

    const tax = subtotal * 0.1; // 10% tax
    const shippingCost = subtotal > 50 ? 0 : 5; // Free shipping for orders > $50
    const total = subtotal + tax + shippingCost;

    const orderNumber = `ORD-${Date.now()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user!.id,
        items: {
          create: orderItems,
        },
        subtotal,
        tax,
        shippingCost,
        total,
        shippingAddress,
        billingAddress: billingAddress || shippingAddress,
        paymentMethod,
      },
      include: { items: { include: { product: true } } },
    });

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
