import React from "react";
import Link from "next/link";

// Sample addresses data
const sampleAddresses = [
  {
    id: "address-1",
    isDefault: true,
    name: "Jane Doe",
    address1: "123 Yoga Lane",
    address2: "Apt 4B",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "United States",
    phone: "(310) 555-1234",
  },
  {
    id: "address-2",
    isDefault: false,
    name: "Jane Doe",
    address1: "456 Fitness Blvd",
    address2: "",
    city: "Santa Monica",
    state: "CA",
    zip: "90401",
    country: "United States",
    phone: "(310) 555-5678",
  },
  {
    id: "address-3",
    isDefault: false,
    name: "Jane Doe (Work)",
    address1: "789 Corporate Plaza",
    address2: "Suite 200",
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
    country: "United States",
    phone: "(310) 555-9012",
  },
];

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

        {/* Add New Address Button */}
        <div className="mb-8">
          <button className="bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors uppercase cursor-pointer text-sm">
            Add New Address
          </button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAddresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 p-5 relative flex flex-col"
            >
              {address.isDefault && (
                <span className="absolute top-3 right-3 text-xs bg-gray-100 text-gray-600 px-2 py-1">
                  Default
                </span>
              )}
              <div className="space-y-1 flex-1">
                <p className="font-medium text-gray-900">{address.name}</p>
                <p className="text-gray-600">{address.address1}</p>
                {address.address2 && (
                  <p className="text-gray-600">{address.address2}</p>
                )}
                <p className="text-gray-600">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-gray-600">{address.country}</p>
                {address.phone && (
                  <p className="text-gray-500 text-sm mt-2">{address.phone}</p>
                )}
              </div>
              <div className="flex gap-4 pt-4 mt-4 border-t border-gray-100">
                <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                  Edit
                </button>
                {!address.isDefault && (
                  <>
                    <button className="text-gray-600 hover:text-gray-900 text-sm cursor-pointer">
                      Set as Default
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm cursor-pointer">
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
