import { HiOutlineShoppingBag } from "react-icons/hi";
import React from "react";
import Link from "next/link";

export const CartLink = () => {
  const cartCount = 24; // Hardcoded for design preview

  return (
    <Link href="/cart" className="p-1 inline-flex relative">
      <HiOutlineShoppingBag className="text-2xl" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
};
