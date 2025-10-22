"use client";

import { useCartStore } from "@/lib/store";

export function useCart() {
  const store = useCartStore();

  return {
    items: store.cart,
    addToCart: store.addToCart,
    removeItem: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getTotalPrice: store.getCartTotal,
    getCartCount: store.getCartCount,
  };
}
