"use client";

import { getCurrentUser } from "@/lib/shopify/queries/customers/getCurrentUser";

import React, { useEffect, useState } from "react";

const AccountLink = () => {
  const [user, setUser] = useState(null);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
      setShowUser(true);
    })();
  }, []);

  const openAuthModal = () => {
    document.getElementById("auth-modal").classList.remove("hidden");
  };

  if (!showUser) return null;

  return (
    <div>
      {user?.id ? (
        <span className="ml-1">Hi {user?.firstName}!</span>
      ) : (
        <button className="ml-2" onClick={openAuthModal}>
          <span>Login / Register</span>
        </button>
      )}
    </div>
  );
};

export default AccountLink;
