// Frontend type definitions
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role: 'ADMIN' | 'CUSTOMER' | 'EMPLOYEE';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  discount?: number;
  stock: number;
  images: ProductImage[];
  category: Category;
  brand?: Brand;
  reviews: Review[];
  isFeatured: boolean;
  isNew: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  deliveredAt?: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  discount?: number;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Review {
  id: string;
  rating: number;
  title: string;
  comment?: string;
  user: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
}

export interface PrintingService {
  id: string;
  type: string;
  name: string;
  description?: string;
  basePrice: number;
  turnaroundDays: number;
}

export interface PrintingOrder {
  id: string;
  orderNumber: string;
  serviceType: string;
  status: string;
  estimatedCost: number;
  finalCost?: number;
  createdAt: string;
}
