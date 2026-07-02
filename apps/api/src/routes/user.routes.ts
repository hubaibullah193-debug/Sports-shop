import { Router, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { authenticate, AuthRequest } from '../middleware/auth';
import { NotFoundError, ValidationError } from '../types/errors';

const router = Router();

const validateRequest = (req: any): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError('Validation failed', errors.array());
  }
};

// Get user profile
router.get('/profile', authenticate, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    next(error);
  }
});

// Update user profile
router.put(
  '/profile',
  authenticate,
  [
    body('firstName').optional().notEmpty(),
    body('lastName').optional().notEmpty(),
    body('phone').optional().isMobilePhone('any'),
  ],
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req);
      const { firstName, lastName, phone, gender, dateOfBirth } = req.body as {
        firstName?: string;
        lastName?: string;
        phone?: string;
        gender?: string;
        dateOfBirth?: string;
      };

      const user = await prisma.user.update({
        where: { id: req.user!.id },
        data: {
          firstName,
          lastName,
          phone,
          gender: gender as any, // Matches Gender enum
          dateOfBirth,
        },
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Get user addresses
router.get('/addresses', authenticate, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.user!.id },
    });

    res.json(addresses);
  } catch (error) {
    next(error);
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
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      validateRequest(req);
      const { type, street, city, state, postalCode, country, isDefault } = req.body as {
        type: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        isDefault?: boolean;
      };

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
      next(error);
    }
  }
);

// Get wishlist
router.get('/wishlist', authenticate, async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
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
    next(error);
  }
});

// Add to wishlist
router.post(
  '/wishlist/:productId',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId } = req.params as { productId: string };

      const existing = await prisma.wishlistItem.findUnique({
        where: {
          userId_productId: {
            userId: req.user!.id,
            productId,
          },
        },
      });

      if (existing) {
        res.status(400).json({ error: 'Already in wishlist' });
        return;
      }

      const item = await prisma.wishlistItem.create({
        data: {
          userId: req.user!.id,
          productId,
        },
      });

      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
);

// Remove from wishlist
router.delete(
  '/wishlist/:productId',
  authenticate,
  async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { productId } = req.params as { productId: string };

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
      next(error);
    }
  }
);

export default router;
