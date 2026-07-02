-- Migration to create all tables for Elite Sports Store
-- This is a reference migration file

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "phone" TEXT,
  "avatar" TEXT,
  "gender" TEXT,
  "dateOfBirth" TIMESTAMP(3),
  "role" TEXT NOT NULL DEFAULT 'CUSTOMER',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "isVerified" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Categories table
CREATE TABLE IF NOT EXISTS "Category" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "icon" TEXT,
  "image" TEXT,
  "parentId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Brands table
CREATE TABLE IF NOT EXISTS "Brand" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "logo" TEXT,
  "description" TEXT,
  "website" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Products table
CREATE TABLE IF NOT EXISTS "Product" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "sku" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "shortDescription" TEXT,
  "price" DOUBLE PRECISION NOT NULL,
  "compareAtPrice" DOUBLE PRECISION,
  "cost" DOUBLE PRECISION,
  "discount" DOUBLE PRECISION DEFAULT 0,
  "categoryId" TEXT NOT NULL,
  "brandId" TEXT,
  "stock" INTEGER NOT NULL DEFAULT 0,
  "lowStockAlert" INTEGER NOT NULL DEFAULT 10,
  "weight" DOUBLE PRECISION,
  "dimensions" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "isNew" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "Product_categoryId_idx" ON "Product"("categoryId");
CREATE INDEX IF NOT EXISTS "Product_brandId_idx" ON "Product"("brandId");
CREATE INDEX IF NOT EXISTS "Product_slug_idx" ON "Product"("slug");
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email");
