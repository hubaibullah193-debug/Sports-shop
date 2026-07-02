import { Router, Response } from 'express';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/errors';

const router = Router();

// Get all printing services
router.get('/services', async (req: AuthRequest, res: Response) => {
  try {
    const services = await prisma.printingService.findMany({
      where: { isActive: true },
    });

    res.json(services);
  } catch (error) {
    throw error;
  }
});

// Create printing quote request
router.post('/quote', async (req: AuthRequest, res: Response) => {
  try {
    const {
      serviceType,
      customerName,
      customerEmail,
      customerPhone,
      quantity,
      paperSize,
      paperType,
      colorMode,
      sided,
      lamination,
      binding,
      deliveryMethod,
      deliveryAddress,
    } = req.body;

    const service = await prisma.printingService.findFirst({
      where: { type: serviceType },
    });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Calculate estimated cost (basic calculation)
    let estimatedCost = service.basePrice;
    estimatedCost += quantity * 2; // Cost per unit
    if (lamination) estimatedCost += quantity * 1;
    if (binding) estimatedCost += 5;

    const orderNumber = `PRINT-${Date.now()}`;

    const quote = await prisma.printingOrder.create({
      data: {
        orderNumber,
        serviceType,
        customerName,
        customerEmail,
        customerPhone,
        quantity,
        paperSize,
        paperType,
        colorMode,
        sided,
        lamination,
        binding,
        deliveryMethod,
        deliveryAddress,
        estimatedCost,
        status: 'PENDING',
        fileUrl: '', // Will be updated after file upload
        fileName: '',
        userId: req.user?.id,
      },
    });

    res.status(201).json({
      message: 'Quote request created',
      quote,
    });
  } catch (error) {
    throw error;
  }
});

// Get user printing orders
router.get('/orders', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.printingOrder.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    throw error;
  }
});

export default router;
