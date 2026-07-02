import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, quantity) => {
    const { items } = get();
    const existingItem = items.find((i) => i.productId === product.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        ),
      });
    } else {
      set({
        items: [
          ...items,
          {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            quantity,
          },
        ],
      });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.productId !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
    } else {
      set({
        items: get().items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
