"use client";

import { HiOutlineUserCircle } from "react-icons/hi";
import { getCurrentUser } from "@/lib/shopify/queries/customers/getCurrentUser";

import React, { useEffect, useState } from "react";

const AccountLink = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
    })();
  }, []);

  const openAuthModal = () => {
    document.getElementById("auth-modal").classList.remove("hidden");
  };

  return (
    <div className="">
      {user?.id ? (
        <span className="ml-1">Hi {user?.firstName}</span>
      ) : (
        <button className="ml-2" onClick={openAuthModal}>
          <span>SIGN IN TO GET REWARDS</span>
        </button>
      )}
    </div>
  );
};

export default AccountLink;
