import React from "react";
import Link from "next/link";

export default function AddressesPage() {
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Addresses</h1>
          <Link
            href="/account"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Back to Account
          </Link>
        </div>

        {/* Empty state */}
        <div className="text-center py-16 border border-gray-200">
          <p className="text-gray-500 mb-4">
            You haven&apos;t saved any addresses yet.
          </p>
          <button className="inline-block bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors uppercase cursor-pointer">
            Add New Address
          </button>
        </div>

        {/* Add address form - will be shown when adding new address */}
        {/*
        <form className="border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Add New Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-gray-900">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-gray-900">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="address1" className="text-gray-900">Address</label>
              <input
                type="text"
                id="address1"
                name="address1"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-gray-900">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="zip" className="text-gray-900">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors cursor-pointer uppercase"
          >
            Save Address
          </button>
        </form>
        */}
      </div>
    </div>
  );
}
