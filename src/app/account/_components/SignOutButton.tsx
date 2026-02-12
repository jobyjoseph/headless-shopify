"use client";

import React from "react";
import Cookies from "js-cookie";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      const cartId = Cookies.get("cart_id");

      await fetch("/api/shopify/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartId }),
      });
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="text-gray-600 hover:text-gray-900 font-light cursor-pointer"
    >
      Sign Out
    </button>
  );
};
