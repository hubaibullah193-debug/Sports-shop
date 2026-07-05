
# Elite Sports Store - Complete E-Commerce Platform

A premium, full-stack e-commerce solution for sports equipment, stationery, and professional printing services.

## 🚀 Features

### Frontend
- **Modern UI**: Built with Next.js 14, React 18, Tailwind CSS, and Framer Motion
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Dark Mode**: Full dark mode support
- **Performance**: Optimized images, lazy loading, code splitting
- **State Management**: Zustand for cart and auth management
- **Type Safety**: Full TypeScript support

### Backend
- **Express.js API**: RESTful API with comprehensive routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Security**: Helmet, CORS, input validation, rate limiting
- **Error Handling**: Centralized error handling middleware

### Modules
- 🛍️ Product Management with filtering and search
- 🛒 Shopping Cart with persistent storage
- 💳 Checkout with multiple payment methods
- 🖨️ Printing Services with quote system
- 👤 User Accounts with profiles and addresses
- ⭐ Reviews and Ratings
- 💝 Wishlist functionality
- 📊 Admin Dashboard
- 📞 Contact & Support
- 📧 Newsletter subscription
- 🎨 Gallery with filtering
- ❓ FAQ system

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 13+
- Git

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository>
cd "Sport shop"
npm install
```

### 2. Environment Variables

Create `.env` files in both `apps/api` and `apps/web`:

**apps/api/.env**
```
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/elite_sports
JWT_SECRET=your-jwt-secret-key-change-this-in-production
PORT=5000
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**apps/web/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
```

### 3. Database Setup

```bash
cd apps/api

# Run migrations
npx prisma migrate dev

# Seed sample data
npm run db:seed

# View database (optional)
npm run db:studio
```

### 4. Start Development Servers

```bash
# From root directory
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
Sport shop/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/        # Pages
│   │   │   ├── components/ # Reusable components
│   │   │   ├── store/      # Zustand stores
│   │   │   ├── utils/      # Helper functions
│   │   │   └── types/      # TypeScript types
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── api/                 # Express.js backend
│       ├── src/
│       │   ├── routes/     # API routes
│       │   ├── middleware/ # Auth, errors, logging
│       │   ├── utils/      # Helper functions
│       │   ├── types/      # TypeScript types
│       │   └── index.ts    # Server entry
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── package.json
│
├── package.json            # Monorepo config
├── tsconfig.json          # TypeScript config
├── turbo.json             # Turbo config
└── .prettierrc            # Code formatting

```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:slug` - Get single product
- `GET /api/products/:slug/related` - Get related products

### Categories & Brands
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category
- `GET /api/brands` - Get all brands

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:orderNumber` - Get order details
- `POST /api/orders` - Create new order

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review

### Printing Services
- `GET /api/printing/services` - Get printing services
- `POST /api/printing/quote` - Request quote

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/addresses` - Get addresses
- `POST /api/users/addresses` - Add address
- `GET /api/users/wishlist` - Get wishlist

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/products` - Product management
- `GET /api/admin/orders` - Order management
- `GET /api/admin/customers` - Customer management

## 🎨 Customization

### Colors
Update theme colors in:
- `apps/web/src/globals.css` - CSS variables
- `apps/web/tailwind.config.ts` - Tailwind theme

### Database
Modify schema in `apps/api/prisma/schema.prisma` and run migrations

## 🚀 Deployment

### Docker
```bash
docker-compose up -d
```

### Vercel (Frontend)
```bash
vercel deploy
```

### Render (Backend)
```bash
render deploy
```

## 📊 Technology Stack

**Frontend**
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Zustand
- TypeScript

**Backend**
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- Bcrypt

## 🔐 Security Features

- JWT authentication with secure cookies
- Bcrypt password hashing
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection (via Prisma)
- XSS protection

## 📝 License

Private - Elite Sports Store

## 🤝 Support

For issues or questions, contact: info@elitesports.com

---

Built with ❤️ using modern web technologies
