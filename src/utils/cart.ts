const CART_ID_STORAGE_KEY = "shopify_cart_id";

/**
 * Get the current cart ID from localStorage
 */
export function getCartId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_STORAGE_KEY);
}

/**
 * Save the cart ID to localStorage
 */
export function setCartId(cartId: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
  }
}

/**
 * Clear the cart ID from localStorage
 */
export function clearCartId(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_ID_STORAGE_KEY);
  }
}
