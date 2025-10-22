"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  hydrate: () => void;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],

        addToCart: (item: Omit<CartItem, "quantity">) => {
          set((state) => {
            const existingItem = state.cart.find(
              (cartItem) => cartItem.id === item.id
            );

            if (existingItem) {
              // Item already in cart, increase quantity
              return {
                cart: state.cart.map((cartItem) =>
                  cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
                ),
              };
            }

            // New item, add to cart with quantity 1
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          });
        },

        removeFromCart: (id: string) => {
          set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
          }));
        },

        updateQuantity: (id: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeFromCart(id);
            return;
          }

          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          }));
        },

        clearCart: () => {
          set({ cart: [] });
        },

        getCartTotal: () => {
          const state = get();
          return state.cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
        },

        getCartCount: () => {
          const state = get();
          return state.cart.reduce((count, item) => count + item.quantity, 0);
        },

        hydrate: () => {
          // This method is called after hydration to ensure state is synced
        },
      }),
      {
        name: "cart-store", // localStorage key
      }
    ),
    { name: "CartStore", trace: true }
  )
);
