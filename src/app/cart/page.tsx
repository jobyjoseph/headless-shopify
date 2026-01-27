"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Mock cart data
const mockCartItems = [
  {
    id: "1",
    title: "Cotton Real Deal Button Up Long Sleeve",
    variant: "White / Medium",
    price: 98.0,
    quantity: 1,
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W3970R_06661_b1_s1_a3_m91_640x.jpg?v=1768293180",
    handle: "cotton-real-deal-button-up-long-sleeve",
  },
  {
    id: "2",
    title: "Ribbed Prosper Tank",
    variant: "Black / Small",
    price: 68.0,
    quantity: 2,
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W2799R_06661_b2_s1_a1_m191_640x.jpg?v=1768302759",
    handle: "ribbed-prosper-tank",
  },
  {
    id: "3",
    title: "Seamless Ribbed Favorite Bra Tank",
    variant: "Beige / Large",
    price: 72.0,
    quantity: 1,
    image:
      "https://cdn.shopify.com/s/files/1/2185/2813/files/W9730R_06661_b1_s1_a2_m262_640x.jpg?v=1768295294",
    handle: "seamless-ribbed-favorite-bra-tank",
  },
];

interface CartItemProps {
  item: {
    id: string;
    title: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
    handle: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-200">
      <Link
        href={`/products/${item.handle}`}
        className="w-24 h-32 lg:w-32 lg:h-40 relative bg-gray-100 flex-shrink-0 cursor-pointer"
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${item.handle}`}
            className="font-normal text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
          >
            {item.title}
          </Link>
          <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              disabled={item.quantity <= 1}
            >
              −
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => onRemove(item.id)}
            className="block text-sm text-gray-500 hover:text-gray-900 underline transition-colors cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-normal text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState(mockCartItems);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const isEmpty = cartItems.length === 0;

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      {/* Page Header */}
      <div className="pb-6 mb-8 text-center">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Your Cart
        </h1>
        <p className="text-gray-600">
          {isEmpty
            ? "Your cart is empty"
            : `${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`}
        </p>
      </div>

      {isEmpty ? (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/collections/all"
            className="inline-block bg-gray-900 text-white px-8 py-3 font-normal hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="border-t border-gray-200">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <Link
              href="/collections/all"
              className="inline-block mt-6 text-sm text-gray-600 hover:text-gray-900 underline transition-colors cursor-pointer"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gray-50 p-6 lg:p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-gray-900 text-white py-3 font-normal hover:bg-gray-800 transition-colors cursor-pointer">
                Proceed to Checkout
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
