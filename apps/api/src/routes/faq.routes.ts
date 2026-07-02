import { Router, Response } from 'express';
import prisma from '../utils/prisma';

const router = Router();

// Get all FAQs by category
router.get('/', async (req: any, res: Response) => {
  try {
    const { category } = req.query;

    const where = { isActive: true };
    if (category) {
      Object.assign(where, { category });
    }

    const faqs = await prisma.faq.findMany({
      where,
      orderBy: { order: 'asc' },
    });

    res.json(faqs);
  } catch (error) {
    throw error;
  }
});

// Get FAQ by ID
router.get('/:id', async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const faq = await prisma.faq.findUnique({
      where: { id },
    });

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json(faq);
  } catch (error) {
    throw error;
  }
});

export default router;
