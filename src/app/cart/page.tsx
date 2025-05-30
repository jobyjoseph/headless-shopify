"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { getCartId, clearCartId } from "@/utils/cart";
import { getCart, updateCartItemQuantity, removeCartItem } from "@/integrations/shopify/services/cartService";

interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    product: {
      title: string;
    };
    title: string;
    image?: {
      url: string;
      altText: string | null;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export default function CartPage() {
  const [cart, setCart] = useState<{
    lines: { edges: { node: CartItem }[] };
    cost: { subtotalAmount: { amount: string; currencyCode: string } };
    checkoutUrl: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchCart = async () => {
    const cartId = getCartId();
    if (!cartId) {
      setLoading(false);
      return;
    }

    try {
      const cartData = await getCart(cartId);
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Clear invalid cart ID
      clearCartId();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    const cartId = getCartId();
    if (!cartId) return;

    setUpdating(lineId);
    try {
      if (newQuantity <= 0) {
        await removeCartItem(cartId, lineId);
      } else {
        await updateCartItemQuantity(cartId, lineId, newQuantity);
      }
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    const cartId = getCartId();
    if (!cartId) return;

    setUpdating(lineId);
    try {
      await removeCartItem(cartId, lineId);
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading cart...</div>
      </div>
    );
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/collections/all"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.lines.edges.map(({ node }: { node: CartItem }) => (
            <div
              key={node.id}
              className="border rounded-lg p-4 flex gap-4 relative"
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 relative bg-gray-100 rounded-md overflow-hidden">
                {node.merchandise.image ? (
                  <Image
                    src={node.merchandise.image.url}
                    alt={node.merchandise.image.altText || node.merchandise.product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-medium mb-1">{node.merchandise.product.title}</h3>
                {node.merchandise.title !== "Default Title" && (
                  <p className="text-sm text-gray-600 mb-2">{node.merchandise.title}</p>
                )}
                <p className="font-bold">
                  {node.merchandise.price.currencyCode} {node.merchandise.price.amount}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(node.id, node.quantity - 1)}
                  disabled={updating === node.id}
                  className="w-8 h-8 rounded-md border border-gray-300 hover:border-gray-400 transition disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={node.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || 0;
                    if (newQuantity !== node.quantity) {
                      handleUpdateQuantity(node.id, newQuantity);
                    }
                  }}
                  disabled={updating === node.id}
                  className="w-16 h-8 text-center border border-gray-300 rounded-md disabled:opacity-50"
                  min="0"
                />
                <button
                  onClick={() => handleUpdateQuantity(node.id, node.quantity + 1)}
                  disabled={updating === node.id}
                  className="w-8 h-8 rounded-md border border-gray-300 hover:border-gray-400 transition disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(node.id)}
                disabled={updating === node.id}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>

              {/* Loading Overlay */}
              {updating === node.id && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="text-sm">Updating...</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">
                  {cart.cost.subtotalAmount.currencyCode} {cart.cost.subtotalAmount.amount}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>
                  {cart.cost.subtotalAmount.currencyCode} {cart.cost.subtotalAmount.amount}
                </span>
              </div>
            </div>

            <a
              href={cart.checkoutUrl}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Proceed to Checkout
            </a>

            <Link
              href="/collections/all"
              className="block text-center mt-4 text-blue-600 hover:text-blue-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}