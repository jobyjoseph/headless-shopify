import React from "react";
import Link from "next/link";
import { SignOutButton } from "@/app/account/_components/SignOutButton";

export default function AccountPage() {
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Orders */}
          <Link
            href="/account/orders"
            className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600">
              Orders
            </h2>
            <p className="text-gray-500 font-light">
              View your order history and track shipments
            </p>
          </Link>

          {/* Addresses */}
          <Link
            href="/account/addresses"
            className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600">
              Addresses
            </h2>
            <p className="text-gray-500 font-light">
              Manage your shipping and billing addresses
            </p>
          </Link>

          {/* Profile */}
          <Link
            href="/account/profile"
            className="border border-gray-200 p-6 hover:border-gray-400 transition-colors group"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-600">
              Profile
            </h2>
            <p className="text-gray-500 font-light">
              Update your personal information and password
            </p>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
