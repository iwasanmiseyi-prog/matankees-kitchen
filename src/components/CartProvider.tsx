"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string; // e.g. "Jollof Rice-5L"
  name: string;
  size: string;
  price: number | "on request";
  image: string;
  quantity: number;
}

interface CartContextProps {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const incrementItem = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  };

  const decrementItem = (id: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => {
    if (typeof item.price === "number") {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, incrementItem, decrementItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
