import { Router, Response, NextFunction, Request } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Submit contact message
router.post(
  '/',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('subject').notEmpty().trim(),
    body('message').notEmpty().trim(),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req);
      const { name, email, phone, subject, message } = req.body as {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
      };

      const contact = await prisma.contactMessage.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
        },
      });

      res.status(201).json({
        message: 'Thank you for contacting us. We will get back to you soon.',
        contact,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get all FAQs
router.get('/faq', async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    res.json(faqs);
  } catch (error) {
    next(error);
  }
});

// Subscribe to newsletter
router.post(
  '/newsletter',
  [body('email').isEmail().normalizeEmail()],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req);
      const { email, name } = req.body as { email: string; name?: string };

      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (existing && existing.isActive) {
        res.status(400).json({ error: 'Already subscribed' });
        return;
      }

      if (existing && !existing.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true },
        });
      } else {
        await prisma.newsletterSubscriber.create({
          data: { email, name },
        });
      }

      res.json({
        message: 'Successfully subscribed to our newsletter!',
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
