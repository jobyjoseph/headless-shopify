"use client";

import { HiOutlineShoppingBag } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import { useCart } from "@/providers/cart-provider";

export const CartLink = () => {
  const { cart, loading } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <Link href="/cart" className="p-1 inline-flex relative">
      <HiOutlineShoppingBag className="text-2xl" />
      {!loading && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
};
