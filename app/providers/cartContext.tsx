"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/types";

interface CartItem {
  uid: string;
  title: string;
  price?: number | null;
  media?: { url: string }[];
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  cartCount: number;
  notification: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const simplifyProduct = (product: Product | CartItem): CartItem => ({
  uid: product.uid,
  title: product.title,
  price: product.price,
  media: product.media ? [{ url: product.media[0]?.url }] : [],
  quantity: 1,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = getCookie("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        setCartCount(
          parsedCart.reduce(
            (total: number, item: CartItem) => total + item.quantity,
            0
          )
        );
      } catch (e) {
        console.error("Failed to parse cart from cookie", e);
      }
    }
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.uid === product.uid
    );

    if (existingItemIndex !== -1) {
      // Item already exists, increase quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };

      setCartItems(updatedCart);
      setCartCount(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
      setCookie("cart", JSON.stringify(updatedCart), 7);
      showNotification(`Added another ${product.title} to cart`);
    } else {
      // New item, add to cart
      const simplifiedProduct = simplifyProduct(product);
      const updatedCart = [...cartItems, simplifiedProduct];

      setCartItems(updatedCart);
      setCartCount(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
      setCookie("cart", JSON.stringify(updatedCart), 7);
      showNotification(`${product.title} added to cart`);
    }
  };

  const removeFromCart = (productId: string) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.uid === productId
    );

    if (existingItemIndex !== -1 && cartItems[existingItemIndex].quantity > 1) {
      // If quantity > 1, decrease quantity by 1
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity - 1,
      };

      setCartItems(updatedCart);
      setCartCount(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
      setCookie("cart", JSON.stringify(updatedCart), 7);
      showNotification("Item quantity reduced");
    } else {
      // Remove item completely
      const updatedCart = cartItems.filter((item) => item.uid !== productId);

      setCartItems(updatedCart);
      setCartCount(
        updatedCart.reduce((total, item) => total + item.quantity, 0)
      );
      setCookie("cart", JSON.stringify(updatedCart), 7);
      showNotification("Item removed from cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount, notification }}
    >
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-black text-white py-2 px-4 rounded-md shadow-lg z-50 transition-opacity">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
