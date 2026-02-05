"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import { getCart } from "@/integrations/shopify/cart";
import { createCart } from "@/integrations/shopify/cart-create";
import { cartLinesAdd } from "@/integrations/shopify/cart-lines-add";
import { cartLinesUpdate } from "@/integrations/shopify/cart-lines-update";
import { cartLinesRemove } from "@/integrations/shopify/cart-lines-remove";
import type {
  GetCartQuery,
  CartLineInput,
  CartLineUpdateInput,
} from "@/generated/shopifySchemaTypes";

const CART_ID_COOKIE_NAME = "cart_id";

/**
 * Get the current cart ID from cookie
 */
function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(CART_ID_COOKIE_NAME) || null;
}

/**
 * Save the cart ID to cookie
 */
function setCartId(cartId: string): void {
  if (typeof window !== "undefined") {
    Cookies.set(CART_ID_COOKIE_NAME, cartId, { expires: 30, sameSite: "lax" });
  }
}

interface CartContextType {
  cart: GetCartQuery["cart"] | null;
  loading: boolean;
  error: string | null;
  refreshCart: () => Promise<void>;
  addToCart: (lines: CartLineInput[]) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeCartLine: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Get or create cart - retrieves existing cart or creates a new one
 */
async function getOrCreateCart() {
  const existingCartId = getCartId();

  if (existingCartId) {
    try {
      const cart = await getCart(existingCartId);
      if (cart) {
        return cart;
      }
    } catch (error) {
      console.error("Error fetching existing cart, creating new one:", error);
    }
  }

  // If no cart exists or it failed to fetch, create a new one
  const result = await createCart();

  // Store the new cart ID
  if (result?.cart?.id) {
    setCartId(result.cart.id);
  }

  return result?.cart ?? null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<GetCartQuery["cart"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cartData = await getOrCreateCart();
      setCart(cartData);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (lines: CartLineInput[]) => {
      try {
        setError(null);

        // Ensure we have a cart
        let currentCartId = cart?.id || getCartId();

        if (!currentCartId) {
          // Create a new cart if none exists
          const newCart = await getOrCreateCart();
          currentCartId = newCart?.id;
          setCart(newCart);
        }

        if (!currentCartId) {
          throw new Error("Failed to get or create cart");
        }

        // Add items to cart
        const result = await cartLinesAdd(currentCartId, lines);

        if (result?.userErrors && result.userErrors.length > 0) {
          throw new Error(
            result.userErrors[0]?.message || "Failed to add to cart",
          );
        }

        // Update cart state with the new data
        if (result?.cart) {
          setCart(result.cart);
        }
      } catch (err) {
        console.error("Failed to add to cart:", err);
        setError(err instanceof Error ? err.message : "Failed to add to cart");
        throw err;
      }
    },
    [cart],
  );

  const updateCartLine = useCallback(
    async (lineId: string, quantity: number) => {
      try {
        setError(null);

        const currentCartId = cart?.id || getCartId();
        if (!currentCartId) {
          throw new Error("No cart available");
        }

        const result = await cartLinesUpdate(currentCartId, [
          {
            id: lineId,
            quantity,
          } as CartLineUpdateInput,
        ]);

        if (result?.userErrors && result.userErrors.length > 0) {
          throw new Error(
            result.userErrors[0]?.message || "Failed to update cart",
          );
        }

        if (result?.cart) {
          setCart(result.cart);
        }
      } catch (err) {
        console.error("Failed to update cart:", err);
        setError(err instanceof Error ? err.message : "Failed to update cart");
        throw err;
      }
    },
    [cart],
  );

  const removeCartLine = useCallback(
    async (lineId: string) => {
      try {
        setError(null);

        const currentCartId = cart?.id || getCartId();
        if (!currentCartId) {
          throw new Error("No cart available");
        }

        const result = await cartLinesRemove(currentCartId, [lineId]);

        if (result?.userErrors && result.userErrors.length > 0) {
          throw new Error(
            result.userErrors[0]?.message || "Failed to remove item",
          );
        }

        if (result?.cart) {
          setCart(result.cart);
        }
      } catch (err) {
        console.error("Failed to remove cart item:", err);
        setError(err instanceof Error ? err.message : "Failed to remove item");
        throw err;
      }
    },
    [cart],
  );

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        refreshCart,
        addToCart,
        updateCartLine,
        removeCartLine,
      }}
    >
      {children}
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
