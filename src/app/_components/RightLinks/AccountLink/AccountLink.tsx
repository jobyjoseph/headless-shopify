"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineUser } from "react-icons/hi";
import { getCurrentUser } from "@/lib/shopify/queries/customers/getCurrentUser";
import Link from "next/link";

export const AccountLink = () => {
  const [user, setUser] = useState(null);
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      setUser(user);
      setShowUser(true);
    })();
  }, []);

  if (!showUser) return null;

  return (
    <div>
      {user?.id ? (
        <Link href="/account" className="p-1 inline-flex items-center">
          <span className="md:hidden">
            <HiOutlineUser className="text-2xl" />
          </span>
          <span className="hidden md:inline ml-1">Hi {user?.firstName}!</span>
        </Link>
      ) : (
        <Link href="/account/login" className="p-1 inline-flex">
          <span className="md:hidden">
            <HiOutlineUser className="text-2xl" />
          </span>
          <span className="hidden md:inline">Login / Register</span>
        </Link>
      )}
    </div>
  );
};
