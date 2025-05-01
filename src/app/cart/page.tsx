"use client";

import { getCartId } from "@/utils/cart";
import { getCart } from "@/integrations/shopify/services/cartService";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<Awaited<ReturnType<typeof getCart>> | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = getCartId();
      if (!cartId) {
        setError("Your cart is empty.");
        setLoading(false);
        return;
      }

      try {
        const cartData = await getCart(cartId);
        setCart(cartData);
      } catch (e) {
        console.error(e);
        setError("Could not load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p className="p-6">Loading cart...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!cart || cart.lines.edges.length === 0)
    return <p className="p-6">Your cart is empty.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cart.lines.edges.map(({ node }) => (
          <div
            key={node.id}
            className="flex items-start space-x-4 border-b pb-4"
          >
            <Image
              src={node.merchandise.image?.url}
              alt={
                node.merchandise.image?.altText ||
                node.merchandise.product.title
              }
              width={100}
              height={100}
              className="object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {node.merchandise.product.title}
              </h2>
              <p className="text-gray-600">Variant: {node.merchandise.title}</p>
              <p className="text-gray-800">
                Quantity: {node.quantity} × {node.merchandise.price.amount}{" "}
                {node.merchandise.price.currencyCode}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">
          Subtotal: {cart.cost.subtotalAmount.amount}{" "}
          {cart.cost.subtotalAmount.currencyCode}
        </p>

        <a
          href={cart.checkoutUrl}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
