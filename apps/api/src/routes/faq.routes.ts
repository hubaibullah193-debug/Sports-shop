import { Router, Response, NextFunction, Request } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all FAQs by category
router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query as { category?: string };

    const where: any = { isActive: true };
    if (category) {
      where.category = category;
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    res.json(faqs);
  } catch (error) {
    next(error);
  }
});

// Get FAQ by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params as { id: string };

    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      res.status(404).json({ error: 'FAQ not found' });
      return;
    }

    res.json(faq);
  } catch (error) {
    next(error);
  }
});

export default router;
