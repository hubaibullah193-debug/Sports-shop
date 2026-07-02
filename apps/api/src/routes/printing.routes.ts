import { Router, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all printing services
router.get('/services', async (_req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await prisma.printingService.findMany({
      where: { isActive: true },
    });

    res.json(services);
  } catch (error) {
    next(error);
  }
});

// Create printing quote request
router.post('/quote', async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    } = req.body as {
      serviceType: string;
      customerName: string;
      customerEmail: string;
      customerPhone: string;
      quantity: number;
      paperSize: string;
      paperType: string;
      colorMode: string;
      sided: string;
      lamination?: boolean;
      binding?: string; // Changed from boolean to string
      deliveryMethod: string;
      deliveryAddress: string;
    };

    const service = await prisma.printingService.findFirst({
      where: { type: serviceType as any }, // Cast to match enum
    });

    if (!service) {
      res.status(404).json({ error: 'Service not found' });
      return;
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
        serviceType: serviceType as any,
        customerName,
        customerEmail,
        customerPhone,
        quantity,
        paperSize,
        paperType,
        colorMode,
        sided,
        lamination: lamination || false, // Boolean field
        binding, // String field - pass directly
        deliveryMethod,
        deliveryAddress,
        estimatedCost,
        status: 'PENDING' as any,
        fileUrl: '',
        fileName: '',
        userId: req.user?.id,
      },
    });

    res.status(201).json({
      message: 'Quote request created',
      quote,
    });
  } catch (error) {
    next(error);
  }
});

// Get user printing orders
router.get('/orders', authenticate, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await prisma.printingOrder.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router;
