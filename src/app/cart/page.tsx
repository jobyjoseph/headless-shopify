"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/utils/formatPrice";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    variant: string;
    price: number;
    quantity: number;
    image: string | null;
    imageAlt: string;
    handle: string;
    currency: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isUpdating: boolean;
  isRemoving: boolean;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  isUpdating,
  isRemoving,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-200">
      <Link
        href={`/products/${item.handle}`}
        className="w-24 h-32 lg:w-32 lg:h-40 relative bg-gray-100 flex-shrink-0 cursor-pointer"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-cover"
          />
        ) : null}
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
          <div className="flex items-center gap-1.5 mt-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              disabled={item.quantity <= 1 || isUpdating || isRemoving}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-lg"
              disabled={isUpdating || isRemoving}
              aria-label="Increase quantity"
            >
              +
            </button>
            {isUpdating ? (
              <span className="text-xs text-gray-500">Updating...</span>
            ) : null}
          </div>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-gray-500 hover:text-gray-900 underline transition-colors mt-3 w-fit cursor-pointer disabled:cursor-not-allowed"
          disabled={isRemoving || isUpdating}
        >
          {isRemoving ? "Removing..." : "Remove"}
        </button>
      </div>
      <div className="text-right">
        <p className="font-normal text-gray-900">
          {formatPrice(String(item.price * item.quantity), item.currency)}
        </p>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { cart, loading, error, refreshCart, updateCartLine, removeCartLine } =
    useCart();
  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null);
  const [removingLineId, setRemovingLineId] = useState<string | null>(null);
  const cartLines = cart?.lines?.edges ?? [];
  const items = cartLines
    .map((edge) => {
      const line = edge.node;
      const merchandise = line.merchandise;
      if (merchandise.__typename !== "ProductVariant") {
        return null;
      }

      const priceAmount = Number(merchandise.price.amount);

      return {
        id: line.id,
        title: merchandise.product.title,
        variant: merchandise.title,
        price: Number.isNaN(priceAmount) ? 0 : priceAmount,
        quantity: line.quantity,
        image: merchandise.image?.url ?? null,
        imageAlt: merchandise.image?.altText ?? merchandise.product.title,
        handle: merchandise.product.handle,
        currency: merchandise.price.currencyCode,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const isEmpty = !loading && items.length === 0;
  const subtotal = cart?.cost?.subtotalAmount
    ? formatPrice(
        cart.cost.subtotalAmount.amount,
        cart.cost.subtotalAmount.currencyCode,
      )
    : "";
  const tax = cart?.cost?.totalTaxAmount
    ? formatPrice(
        cart.cost.totalTaxAmount.amount,
        cart.cost.totalTaxAmount.currencyCode,
      )
    : "";
  const total = cart?.cost?.totalAmount
    ? formatPrice(
        cart.cost.totalAmount.amount,
        cart.cost.totalAmount.currencyCode,
      )
    : "";

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      setUpdatingLineId(lineId);
      await updateCartLine(lineId, quantity);
    } finally {
      setUpdatingLineId(null);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    try {
      setRemovingLineId(lineId);
      await removeCartLine(lineId);
    } finally {
      setRemovingLineId(null);
    }
  };

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      {/* Page Header */}
      <div className="pb-6 mb-8 text-center">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Your Cart
        </h1>
        <p className="text-gray-600">
          {loading
            ? "Loading cart..."
            : isEmpty
              ? "Your cart is empty"
              : `${cart?.totalQuantity ?? items.length} item${
                  (cart?.totalQuantity ?? items.length) === 1 ? "" : "s"
                } in your cart`}
        </p>
      </div>

      {error ? (
        <div className="text-center py-10">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refreshCart}
            className="inline-block bg-gray-900 text-white px-6 py-2 font-normal hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-16 text-gray-500">
          Loading your cart...
        </div>
      ) : isEmpty ? (
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
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                  isUpdating={updatingLineId === item.id}
                  isRemoving={removingLineId === item.id}
                />
              ))}
            </div>
            <Link
              href="/"
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
                  <span>{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Tax</span>
                  <span>{tax || "Calculated at checkout"}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-900 font-semibold">
                    <span>Total</span>
                    <span>{total}</span>
                  </div>
                </div>
              </div>
              {cart?.checkoutUrl ? (
                <Link
                  href={cart.checkoutUrl}
                  className="block text-center w-full mt-6 bg-gray-900 text-white py-3 font-normal hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  className="w-full mt-6 bg-gray-300 text-white py-3 font-normal cursor-not-allowed"
                  disabled
                >
                  Proceed to Checkout
                </button>
              )}
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
