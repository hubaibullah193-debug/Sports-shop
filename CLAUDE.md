# Claude Development Guide for Elite Sports Store

This file contains coding rules, architecture patterns, and operational guidelines for developing the Elite Sports Store e-commerce platform.

## Project Overview

**Elite Sports Store** is a full-stack e-commerce platform built with:
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, PostgreSQL, Prisma ORM, JWT authentication
- **DevOps**: Docker, GitHub Actions, Turbo monorepo
- **Database**: PostgreSQL with 20+ normalized models

### Key Principles
- **Type Safety**: Strict TypeScript everywhere; no `any` types
- **Performance**: Lazy loading, code splitting, image optimization
- **Responsive**: Mobile-first design with dark mode
- **Security**: JWT auth, bcrypt hashing, CORS, input validation
- **Maintainability**: Clear separation of concerns, reusable components

---

## Architecture

### Frontend (`apps/web`)
```
src/
├── app/              # Next.js pages (23 pages)
├── components/       # Reusable React components (8 components)
├── store/           # Zustand state management
├── utils/           # API client, helpers, endpoints
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
└── globals.css      # Theme & global styles
```

**Key Pages**:
- `/` — Home with hero, categories, testimonials
- `/shop` — Product catalog with filters & search
- `/products/[slug]` — Product details with reviews
- `/cart` — Shopping cart with order summary
- `/checkout` — Multi-step checkout
- `/auth/login`, `/auth/register` — Authentication
- `/dashboard` — User order history
- `/admin/dashboard` — Admin analytics
- `/printing` — Printing services quote system
- `/gallery`, `/faq`, `/about`, `/contact` — Content pages

### Backend (`apps/api`)
```
src/
├── routes/          # API route modules (14 modules)
├── middleware/      # Express middleware
├── utils/          # Auth, email, Stripe, Prisma
├── types/          # TypeScript interfaces
└── index.ts        # Server entry point

prisma/
├── schema.prisma   # Database schema (20 models)
├── seed.ts         # Sample data
└── migrations/     # Database migrations
```

**Route Modules**:
- `auth.routes.ts` — Registration, login, JWT tokens
- `product.routes.ts` — Product CRUD & search
- `category.routes.ts` — Categories & subcategories
- `order.routes.ts` — Order creation & management
- `review.routes.ts` — Product reviews
- `user.routes.ts` — User profiles, addresses, wishlist
- `printing.routes.ts` — Printing services & quotes
- `admin.routes.ts` — Admin dashboard stats
- `analytics.routes.ts` — Detailed analytics
- `search.routes.ts` — Product search & suggestions
- Plus 4 more for brands, gallery, FAQs, contact

### Database Schema
**Core Models**:
- `User` — Customers, admins, employees
- `Product` — Inventory with SKU, pricing, stock
- `Category` — Hierarchical product categories
- `Brand` — Product manufacturers
- `Order` — Customer orders with items
- `OrderItem` — Individual items in orders
- `Review` — Product reviews with ratings
- `WishlistItem` — Saved products
- `PrintingService` — 20 service types
- `PrintingOrder` — Quote requests
- Plus 10 more for addresses, coupons, gallery, FAQ, etc.

---

## Coding Standards

### TypeScript
```typescript
// ✅ DO: Define interfaces for all data structures
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// ❌ DON'T: Use 'any' type
const data: any = response; // Avoid!

// ✅ DO: Use strict null checks
const price = product?.price ?? 0;

// ✅ DO: Define return types on functions
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

### React Components
```typescript
// ✅ DO: Use 'use client' for client components
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/Button';

// ✅ DO: Props interface with clear naming
interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:shadow-lg transition"
    >
      {/* Component content */}
    </motion.div>
  );
};

// ❌ DON'T: Inline styles or hardcoded colors
// Use Tailwind classes instead
```

### Express Routes
```typescript
// ✅ DO: Use middleware for validation
router.post(
  '/orders',
  authenticate,                    // Auth middleware
  [
    body('items').isArray(),        // Express validator
    body('shippingAddress').notEmpty(),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      validateRequest(req, res);    // Check validation errors
      const { items, shippingAddress } = req.body;
      
      // Business logic
      const order = await prisma.order.create({ data: {...} });
      
      res.status(201).json(order);
    } catch (error) {
      throw error;                  // Error handler catches it
    }
  }
);

// ✅ DO: Use proper HTTP status codes
res.status(201).json(data);         // Created
res.status(200).json(data);         // OK
res.status(400).json({ error: '...' }); // Bad request
res.status(401).json({ error: '...' }); // Unauthorized
res.status(404).json({ error: '...' }); // Not found
```

### Tailwind CSS
```tsx
// ✅ DO: Use Tailwind classes with custom variants
<div className="card">
  <h1 className="heading-lg mb-4">Title</h1>
  <p className="text-gray-600 dark:text-dark-200">Description</p>
  <Button variant="primary" size="lg">Action</Button>
</div>

// ✅ DO: Responsive design mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// ✅ DO: Dark mode support
<div className="bg-white dark:bg-dark-800 text-text dark:text-dark-50">

// ❌ DON'T: Mix Tailwind with inline styles
// Use Tailwind exclusively
```

---

## Common Patterns

### API Client Usage
```typescript
// ✅ DO: Use the configured apiClient with interceptors
import apiClient from '@/utils/api';

const response = await apiClient.get('/api/products?category=sports');
const data = response.data;

// ✅ DO: Handle errors properly
try {
  await apiClient.post('/api/orders', { items, address });
} catch (error: any) {
  toast.error(error.response?.data?.error || 'Failed');
}
```

### State Management (Zustand)
```typescript
// ✅ DO: Create typed stores with clear selectors
const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product, quantity) => {
    set(state => ({
      items: [...state.items, { productId: product.id, quantity }]
    }));
  },
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}));

// ✅ DO: Use hooks in components
const { items, addItem, getTotalPrice } = useCartStore();
```

### Database Operations (Prisma)
```typescript
// ✅ DO: Use Prisma for all database operations
const product = await prisma.product.findUnique({
  where: { slug },
  include: {
    category: true,
    brand: true,
    images: { take: 1 },
    reviews: { take: 10 }
  }
});

// ✅ DO: Handle null cases
if (!product) {
  throw new NotFoundError('Product');
}

// ✅ DO: Use transactions for multi-step operations
await prisma.$transaction(async (tx) => {
  await tx.order.create({ data: {...} });
  await tx.inventory.update({ where: {...}, data: {...} });
});
```

### Authentication
```typescript
// ✅ DO: Use JWT tokens with secure storage
const token = generateToken({ id: user.id, email: user.email, role: user.role });
localStorage.setItem('token', token);

// ✅ DO: Include token in API requests (handled by interceptor)
// apiClient automatically adds: Authorization: Bearer {token}

// ✅ DO: Verify auth on protected routes
router.get('/protected', authenticate, async (req: AuthRequest, res) => {
  // req.user is populated by middleware
  const userId = req.user!.id;
});
```

---

## File Organization Rules

### Adding New Pages
1. Create folder: `apps/web/src/app/[page-name]/`
2. Create file: `page.tsx` with `'use client'` directive
3. Use layout components: `<Container>`, `<Section>`
4. Import components from `@/components`
5. Use Zustand stores if needed
6. Add metadata in layout.tsx if SEO required

### Adding New API Routes
1. Create file: `apps/api/src/routes/[name].routes.ts`
2. Use Express Router for modularity
3. Add validation with express-validator
4. Include error handling (try-catch throws to middleware)
5. Register in `src/index.ts`: `app.use('/api/[path]', [name]Routes)`

### Adding Database Models
1. Edit `apps/api/prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name [description]`
3. Update seed data if needed: `prisma/seed.ts`
4. Create corresponding API routes

---

## Best Practices

### Performance
- ✅ Use `next/image` for all images
- ✅ Implement pagination for large lists
- ✅ Cache API responses in Zustand when appropriate
- ✅ Use dynamic imports for heavy components
- ✅ Optimize bundle: `npm run build` and review output

### Security
- ✅ Never expose secrets in code; use environment variables
- ✅ Validate all user input (frontend + backend)
- ✅ Use HTTPS in production
- ✅ Hash passwords with bcrypt (never plain text)
- ✅ Use CORS only for trusted origins
- ✅ Implement rate limiting on APIs

### Error Handling
```typescript
// ✅ DO: Use custom error classes
if (!user) {
  throw new NotFoundError('User');
}

if (email === existingEmail) {
  throw new ValidationError('Email already registered');
}

// Backend error handler catches and responds appropriately
```

### Testing
- Write unit tests for utilities
- Write integration tests for APIs
- Use React Testing Library for components
- Run tests before committing: `npm run test`

---

## Development Workflow

### Starting Work
```bash
# 1. Pull latest
git pull origin main

# 2. Create branch
git checkout -b feature/[name]

# 3. Start dev server
npm run dev
```

### Making Changes
```bash
# 1. Make code changes
# 2. Type check
npm run type-check

# 3. Lint
npm run lint

# 4. Test
npm run test

# 5. Commit with clear message
git add .
git commit -m "feat: add feature description"
```


### Deploying
```bash
# 1. Build locally
npm run build

# 2. Test build
npm run start

# 3. Push to main
git push origin feature/[name]

# 4. Create PR and get review
# 5. Merge and deploy to production
```

---

## Debugging Tips

### Frontend Issues
```bash
# Check TypeScript errors
npm run type-check

# View database
cd apps/api && npx prisma studio

# Check API responses
# Use browser DevTools Network tab or Postman
```

### Backend Issues
```bash
# View API logs
# Check terminal output from 'npm run dev'

# Test endpoints
curl -X GET http://localhost:5000/api/products

# Check database state
cd apps/api && npx prisma studio
```

### Common Issues & Solutions
1. **Port already in use** → `npx kill-port 3000 5000`
2. **Database connection error** → Check `DATABASE_URL` in `.env`
3. **Module not found** → Run `npm install`
4. **TypeScript errors** → Run `npm run type-check`

---

## When to Use What

| Task | Where | How |
|------|-------|-----|
| New page | `apps/web/src/app/[path]` | Create `page.tsx` with layout |
| New API endpoint | `apps/api/src/routes/[name].routes.ts` | Router module with validation |
| New component | `apps/web/src/components/[Name].tsx` | React component with props interface |
| Database query | `apps/api/src/routes/` | Use Prisma client |
| State logic | `apps/web/src/store/` | Create Zustand store |
| Helper function | `apps/web/src/utils/` | Pure function or class |
| Style | `apps/web/src/globals.css` | Tailwind classes in components |

---

## Resources

- **Docs**: See README.md, QUICKSTART.md, DEVELOPMENT.md
- **API Endpoints**: `apps/web/src/utils/endpoints.ts`
- **Database**: `apps/api/prisma/schema.prisma`
- **Types**: `apps/web/src/types/index.ts` and `apps/api/src/types/errors.ts`

---

## Communication

When working on this project:
- ✅ Ask clarifying questions if requirements are unclear
- ✅ Suggest architectural improvements if you see better patterns
- ✅ Report what was actually done vs. what was requested
- ✅ Mention dependencies or blockers upfront
- ✅ Provide concrete examples when explaining changes

---

**Last Updated**: 2026-07-02  
**By**: Claude Code  
**Status**: Active Development

