import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest, NotFoundError, ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        addresses: true,
        loyaltyPoints: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    res.json(user);
  } catch (error) {
    throw error;
  }
});

// Update user profile
router.put(
  '/profile',
  authenticate,
  [
    body('firstName').optional().notEmpty(),
    body('lastName').optional().notEmpty(),
    body('phone').optional().isMobilePhone(),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      validateRequest(req, res);
      const { firstName, lastName, phone, gender, dateOfBirth } = req.body;

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          firstName,
          lastName,
          phone,
          gender,
          dateOfBirth,
        },
      });

      res.json(user);
    } catch (error) {
      throw error;
    }
  }
);

// Get user addresses
router.get('/addresses', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user!.id },
    });

    res.json(addresses);
  } catch (error) {
    throw error;
  }
});

// Add address
router.post(
  '/addresses',
  authenticate,
  [
    body('type').notEmpty(),
    body('street').notEmpty(),
    body('city').notEmpty(),
    body('state').notEmpty(),
    body('postalCode').notEmpty(),
    body('country').notEmpty(),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      validateRequest(req, res);
      const { type, street, city, state, postalCode, country, isDefault } = req.body;

      const address = await prisma.address.create({
        data: {
          userId: req.user!.id,
          type,
          street,
          city,
          state,
          postalCode,
          country,
          isDefault,
        },
      });

      res.status(201).json(address);
    } catch (error) {
      throw error;
    }
  }
);

// Get wishlist
router.get('/wishlist', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.user!.id },
      include: {
        product: {
          include: { images: { take: 1 }, brand: true },
        },
      },
    });

    res.json(wishlist);
  } catch (error) {
    throw error;
  }
});

// Add to wishlist
router.post('/wishlist/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Already in wishlist' });
    }

    const item = await prisma.wishlistItem.create({
      data: {
        userId: req.user!.id,
        productId,
      },
    });

    res.status(201).json(item);
  } catch (error) {
    throw error;
  }
});

// Remove from wishlist
router.delete('/wishlist/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: req.user!.id,
          productId,
        },
      },
    });

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    throw error;
  }
});

export default router;
