"use client";
import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import { useSession } from "@/providers/session-provider";
import Link from "next/link";

export const AccountLink = () => {
  const { user, loading } = useSession();

  if (loading) return null;

  return (
    <>
      {user?.id ? (
        <Link href="/account" className="p-1 inline-flex items-center">
          <span className="md:hidden">
            <HiOutlineUser className="text-2xl" />
          </span>
          <span className="hidden md:inline ml-1">
            Hi {user?.name ?? user?.email}!
          </span>
        </Link>
      ) : (
        <Link href="/account/login" className="p-1 inline-flex">
          <span className="md:hidden">
            <HiOutlineUser className="text-2xl" />
          </span>
          <span className="hidden md:inline">Login / Register</span>
        </Link>
      )}
    </>
  );
};
