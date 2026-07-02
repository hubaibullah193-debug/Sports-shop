import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any, res: Response) => {
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
  async (req: any, res: Response) => {
    try {
      validateRequest(req, res);
      const { name, email, phone, subject, message } = req.body;

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
      throw error;
    }
  }
);

// Get all FAQs
router.get('/faq', async (req: any, res: Response) => {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    res.json(faqs);
  } catch (error) {
    throw error;
  }
});

// Subscribe to newsletter
router.post(
  '/newsletter',
  [body('email').isEmail().normalizeEmail()],
  async (req: any, res: Response) => {
    try {
      validateRequest(req, res);
      const { email, name } = req.body;

      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email },
      });

      if (existing && existing.isActive) {
        return res.status(400).json({ error: 'Already subscribed' });
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
      throw error;
    }
  }
);

export default router;
