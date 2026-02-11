"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";

export const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
    } finally {
      document.cookie =
        "shopifyCustomerAccessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
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
