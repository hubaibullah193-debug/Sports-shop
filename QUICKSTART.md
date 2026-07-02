# Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Environment Variables

**Backend** (`apps/api/.env`):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/elite_sports
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
CLIENT_URL=http://localhost:3000
```

**Frontend** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 3: Database Setup
```bash
cd apps/api
npx prisma migrate dev
npm run db:seed
cd ../..
```

### Step 4: Start Development
```bash
npm run dev
```

Visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: http://localhost:5432 (PostgreSQL)

## 📱 Test Credentials

After seeding, use these accounts:
- **Admin**: admin@elitesports.com / password123
- **Customer**: Create via registration form

## 🔑 Key Features Ready to Use

### ✅ Implemented
- Product catalog with filtering and search
- Shopping cart with persistent storage
- User authentication (register, login, JWT)
- Order management
- Printing service quotes
- User profiles and wishlist
- Admin dashboard with analytics
- Responsive design with dark mode
- Newsletter subscription
- Contact form
- FAQ system
- Gallery

### ⏳ Next Steps
1. **Payment Integration**: Add Stripe/PayPal checkout
2. **Email Notifications**: Order confirmations, password resets
3. **Advanced Search**: Full-text search with Elasticsearch
4. **Analytics Dashboard**: Real-time sales metrics
5. **File Uploads**: Printing order file management
6. **Multi-language**: i18n support

## 📚 Project Structure

```
Sport shop/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/     # Pages
│   │   │   ├── components/
│   │   │   ├── store/   # Zustand
│   │   │   └── utils/   # Helpers
│   │   └── package.json
│   │
│   └── api/              # Express backend
│       ├── src/
│       │   ├── routes/  # API endpoints
│       │   ├── middleware/
│       │   ├── utils/   # Helpers
│       │   └── index.ts
│       ├── prisma/
│       │   └── schema.prisma
│       └── package.json
│
├── package.json          # Monorepo config
├── turbo.json           # Build orchestration
├── tsconfig.json        # TypeScript
├── docker-compose.yml   # Local dev environment
└── README.md
```

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start both apps

# Building
npm run build            # Build both apps
npm run type-check       # TypeScript validation
npm run lint             # ESLint check

# Database
cd apps/api
npx prisma migrate dev   # Run migrations
npx prisma db push      # Sync schema
npx prisma studio      # GUI database viewer
npm run db:seed        # Populate sample data

# Docker
docker-compose up -d    # Start all services
docker-compose down     # Stop all services
```

## 🔐 User Roles

- **CUSTOMER**: Browse, shop, order, review
- **EMPLOYEE**: Manage printing orders
- **ADMIN**: Full system access

## 🎨 Customization

### Change Colors
Edit `apps/web/src/globals.css`:
```css
:root {
  --primary: #0d6efd;
  --secondary: #198754;
  --accent: #ff6b00;
}
```

### Modify Database Schema
1. Edit `apps/api/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name your_migration_name`

### Add New Pages
Create in `apps/web/src/app/[path]/page.tsx`

### Add API Routes
Create in `apps/api/src/routes/[name].routes.ts`

## 📊 API Documentation

All endpoints are documented in `apps/api/src/utils/endpoints.ts`

Common endpoints:
```
GET    /api/products              # List products
GET    /api/products/:slug        # Get product
POST   /api/auth/register         # Create account
POST   /api/auth/login            # Login
GET    /api/orders                # User orders
POST   /api/orders                # Place order
POST   /api/reviews               # Add review
GET    /api/printing/services    # Printing services
```

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel deploy
```

### Backend (Render)
1. Push to GitHub
2. Connect repo to Render
3. Set environment variables
4. Deploy

### Docker
```bash
docker-compose -f docker-compose.prod.yml up
```

## 🆘 Troubleshooting

### "Port already in use"
```bash
npx kill-port 3000 5000
```

### "Database connection failed"
- Check PostgreSQL is running
- Verify `DATABASE_URL` in `.env`
- Run `npx prisma migrate reset`

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### TypeScript errors
```bash
npm run type-check
```

## 📖 Learn More

- [Next.js Docs](https://nextjs.org)
- [Express.js Guide](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io)
- [Tailwind CSS](https://tailwindcss.com)

## ✨ What's Next?

1. **Customize** colors, text, and branding
2. **Connect** payment gateway (Stripe/PayPal)
3. **Configure** email service for notifications
4. **Deploy** to production
5. **Monitor** with analytics

## 💬 Support

For issues:
1. Check DEVELOPMENT.md for detailed setup
2. Review console/terminal for error messages
3. Check database with `npx prisma studio`
4. Verify environment variables

---

**Ready to build?** Start with `npm run dev` and visit http://localhost:3000! 🎉
