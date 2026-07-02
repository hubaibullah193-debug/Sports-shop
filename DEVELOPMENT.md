# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm 9+

### Quick Setup

1. **Install dependencies**
```bash
npm install
```

2. **Setup environment variables**
```bash
# Copy example env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

3. **Setup database**
```bash
cd apps/api
npx prisma migrate dev
npm run db:seed
```

4. **Start development**
```bash
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Docs: http://localhost:5000/api

## Project Structure

### Frontend (`apps/web`)
- **src/app** - Next.js pages and layouts
- **src/components** - Reusable React components
- **src/store** - Zustand stores (auth, cart)
- **src/utils** - Helper functions and API client
- **src/types** - TypeScript type definitions

### Backend (`apps/api`)
- **src/routes** - API route handlers
- **src/middleware** - Express middleware (auth, errors, logging)
- **src/utils** - Helper functions
- **src/types** - TypeScript types
- **prisma** - Database schema and migrations

## Common Tasks

### Add a new page
1. Create file in `apps/web/src/app/new-page/page.tsx`
2. Use layout components from `@/components/Layout`
3. Use API client from `@/utils/api`

### Add a new API endpoint
1. Create route file in `apps/api/src/routes/name.routes.ts`
2. Import and use in `src/index.ts`
3. Use Prisma for database operations

### Update database schema
1. Modify `apps/api/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name migration_name`
3. The migration is applied and seed updates

### Add styling
- Use Tailwind classes directly
- Custom classes in `apps/web/src/globals.css`
- Theme colors in `tailwind.config.ts`

## Testing

### Run tests
```bash
npm run test
```

### Run linter
```bash
npm run lint
```

### Type check
```bash
npm run type-check
```

## Deployment

### Docker
```bash
docker-compose up -d
```

### Vercel (Frontend)
```bash
npm install -g vercel
cd apps/web
vercel
```

### Render (Backend)
1. Push to GitHub
2. Connect repository to Render
3. Set environment variables
4. Deploy

## Code Standards

### Naming Conventions
- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`helpers.ts`)
- Types: PascalCase (`User`)
- Constants: UPPER_SNAKE_CASE (`JWT_SECRET`)

### File Organization
- Group related files together
- Keep components small and focused
- Export from index files for easier imports

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Database connection error
```bash
# Check PostgreSQL is running
# Verify DATABASE_URL in .env
# Reset database
npx prisma migrate reset
```

### Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Performance Tips

- Use `next/image` for images
- Implement pagination for large lists
- Cache API responses with Zustand
- Use code splitting with dynamic imports
- Monitor bundle size with `npm run build`

## Security

- Never commit `.env` files
- Use environment variables for secrets
- Validate input on both client and server
- Use HTTPS in production
- Implement rate limiting
- Keep dependencies updated: `npm audit`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
