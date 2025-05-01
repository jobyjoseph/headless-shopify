"use client";

import { useState } from "react";
import {
  addToCart,
  createCart,
} from "@/integrations/shopify/services/cartService";
import { getCartId, setCartId } from "@/utils/cart";

interface AddToCartButtonProps {
  variantId: string;
}

export default function AddToCartButton({ variantId }: AddToCartButtonProps) {
  const [adding, setAdding] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAddToCart(productId: string) {
    setAdding(true);
    try {
      let cartId = getCartId();
      if (!cartId) {
        const newCart = await createCart(productId);
        cartId = newCart.id;
        setCartId(cartId);
      } else {
        await addToCart(cartId, productId);
      }
      setSuccess(true);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
    setAdding(false);
  }

  return (
    <>
      <button
        onClick={() => handleAddToCart(variantId)}
        disabled={adding}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        {adding ? "Adding..." : "Add to Cart"}
      </button>

      {success && <p className="text-green-600 mt-4">Added to cart!</p>}
    </>
  );
}
