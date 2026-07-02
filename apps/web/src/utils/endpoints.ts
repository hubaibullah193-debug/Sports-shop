export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    ME: '/api/auth/me',
  },

  // Products
  PRODUCTS: {
    GET_ALL: '/api/products',
    GET_ONE: (slug: string) => `/api/products/${slug}`,
    GET_RELATED: (slug: string) => `/api/products/${slug}/related`,
  },

  // Categories
  CATEGORIES: {
    GET_ALL: '/api/categories',
    GET_ONE: (slug: string) => `/api/categories/${slug}`,
  },

  // Brands
  BRANDS: {
    GET_ALL: '/api/brands',
    GET_ONE: (slug: string) => `/api/brands/${slug}`,
  },

  // Orders
  ORDERS: {
    GET_ALL: '/api/orders',
    GET_ONE: (orderNumber: string) => `/api/orders/${orderNumber}`,
    CREATE: '/api/orders',
  },

  // Reviews
  REVIEWS: {
    GET_BY_PRODUCT: (productId: string) => `/api/reviews/product/${productId}`,
    CREATE: '/api/reviews',
  },

  // Users
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    GET_ADDRESSES: '/api/users/addresses',
    ADD_ADDRESS: '/api/users/addresses',
    GET_WISHLIST: '/api/users/wishlist',
    ADD_TO_WISHLIST: (productId: string) => `/api/users/wishlist/${productId}`,
    REMOVE_FROM_WISHLIST: (productId: string) => `/api/users/wishlist/${productId}`,
  },

  // Printing
  PRINTING: {
    GET_SERVICES: '/api/printing/services',
    REQUEST_QUOTE: '/api/printing/quote',
    GET_ORDERS: '/api/printing/orders',
  },

  // Contact & Support
  CONTACT: {
    SUBMIT: '/api/contact',
    GET_FAQ: '/api/faq',
    SUBSCRIBE_NEWSLETTER: '/api/contact/newsletter',
  },

  // Gallery
  GALLERY: {
    GET_ALL: '/api/gallery',
    GET_CATEGORIES: '/api/gallery/categories',
  },

  // Search
  SEARCH: {
    PRODUCTS: '/api/search/search',
    SUGGESTIONS: '/api/search/suggestions',
  },

  // Admin
  ADMIN: {
    DASHBOARD: '/api/admin/dashboard',
    GET_PRODUCTS: '/api/admin/products',
    GET_ORDERS: '/api/admin/orders',
    GET_CUSTOMERS: '/api/admin/customers',
    GET_MESSAGES: '/api/admin/messages',
    ANALYTICS: '/api/analytics/analytics',
    INVENTORY_ALERTS: '/api/analytics/inventory-alerts',
    CUSTOMER_INSIGHTS: '/api/analytics/customer-insights',
  },
};

export default API_ENDPOINTS;
