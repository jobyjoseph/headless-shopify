"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "@/components/Pagination/Pagination";

// Sample orders data
const sampleOrders = [
  {
    id: "order-1",
    orderNumber: "1042",
    date: "January 15, 2026",
    status: "Delivered",
    total: "$360.00",
    items: [
      {
        id: "item-1",
        name: "Accolade Full Zip Hoodie",
        variant: "Black / M",
        quantity: 1,
        price: "$148.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/U3041RG_01_b2_s1_a1_m190_640x.jpg?v=1767399600",
      },
      {
        id: "item-2",
        name: "Airlift Intrigue Bra",
        variant: "Espresso / S",
        quantity: 1,
        price: "$78.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W9557R_04064_b2_s1_a1_m177_640x.jpg?v=1767400164",
      },
      {
        id: "item-3",
        name: "7/8 High-Waist Airlift Legging",
        variant: "Espresso / S",
        quantity: 1,
        price: "$134.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W5766R_04064_b2_s1_a2_1_m265_640x.jpg?v=1768867889",
      },
    ],
  },
  {
    id: "order-2",
    orderNumber: "1038",
    date: "January 8, 2026",
    status: "Delivered",
    total: "$454.00",
    items: [
      {
        id: "item-4",
        name: "Accolade Crew Neck Pullover",
        variant: "Candy Heart Pink / M",
        quantity: 1,
        price: "$138.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/U3031RG_06661_b2_s1_a1_m177_640x.jpg?v=1768594553",
      },
      {
        id: "item-5",
        name: "Accolade Straight Leg Sweatpant",
        variant: "Candy Heart Pink / M",
        quantity: 1,
        price: "$138.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/U5012RG_06661_b2_s1_a1_m267_640x.jpg?v=1768928782",
      },
      {
        id: "item-6",
        name: "Suit Up Trouser (Regular)",
        variant: "Black / S",
        quantity: 1,
        price: "$148.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W51432R_01_b2_s1_a1_m190_640x.jpg?v=1767400907",
      },
      {
        id: "item-7",
        name: "Match Point Short",
        variant: "Candy Heart Pink / XS",
        quantity: 1,
        price: "$78.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W6334R_06661_b2_s1_a1_m191_1b78e1f6-376d-4424-94e9-7638fe1c4e18_640x.jpg?v=1768504143",
      },
    ],
  },
  {
    id: "order-3",
    orderNumber: "1025",
    date: "December 20, 2025",
    status: "Delivered",
    total: "$222.00",
    items: [
      {
        id: "item-8",
        name: "Airbrush Better Together Bra",
        variant: "Candy Heart Pink/White / S",
        quantity: 1,
        price: "$88.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W9918R_0998_b2_s1_a1_m190_e07d9ca3-6fa1-454d-920b-35e55d55e27b_640x.jpg?v=1768422542",
      },
      {
        id: "item-9",
        name: "Airbrush High-Waist 7/8 Better Together Legging",
        variant: "Candy Heart Pink/White / S",
        quantity: 1,
        price: "$134.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W54309R_0998_b2_s1_a1_m190_db246b70-0383-452c-a98d-3ed86c7d44f8_640x.jpg?v=1768868956",
      },
    ],
  },
  {
    id: "order-4",
    orderNumber: "1012",
    date: "December 5, 2025",
    status: "Delivered",
    total: "$212.00",
    items: [
      {
        id: "item-10",
        name: "Dreamlight Long Sleeve Top",
        variant: "Candlelight Yellow / M",
        quantity: 1,
        price: "$84.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W3984R_06645_b2_s1_a1_m177_640x.jpg?v=1766050527",
      },
      {
        id: "item-11",
        name: "Mid-Rise Dreamlight Straight Pant",
        variant: "Candlelight Yellow / M",
        quantity: 1,
        price: "$128.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W54302R_06645_b2_s1_a1_m177_640x.jpg?v=1766052971",
      },
    ],
  },
  {
    id: "order-5",
    orderNumber: "998",
    date: "November 18, 2025",
    status: "Delivered",
    total: "$156.00",
    items: [
      {
        id: "item-12",
        name: "Ribbed Prosper Tank",
        variant: "Candy Heart Pink / S",
        quantity: 1,
        price: "$78.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W2799R_06661_b2_s1_a1_m191_640x.jpg?v=1768302759",
      },
      {
        id: "item-13",
        name: "Match Point Short",
        variant: "Black / S",
        quantity: 1,
        price: "$78.00",
        image:
          "https://cdn.shopify.com/s/files/1/2185/2813/files/W6334R_06661_b2_s1_a1_m191_1b78e1f6-376d-4424-94e9-7638fe1c4e18_640x.jpg?v=1768504143",
      },
    ],
  },
];

const ORDERS_PER_PAGE = 2;

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleOrders.length / ORDERS_PER_PAGE);

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;
  const currentOrders = sampleOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order History
          </h1>
          <Link
            href="/account"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Back to Account
          </Link>
        </div>

        {/* Orders list */}
        <div className="space-y-10">
          {currentOrders.map((order) => (
            <div key={order.id} className="border border-gray-200">
              {/* Order header */}
              <div className="flex flex-wrap justify-between items-start gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Order</p>
                    <p className="font-medium">#{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="text-gray-900">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Total</p>
                    <p className="font-medium">{order.total}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order items */}
              <div className="divide-y divide-gray-100">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-4 p-4">
                    <div className="w-16 bg-gray-100 flex-shrink-0 relative aspect-[3/4]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.price}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="p-4 text-center text-sm text-gray-500">
                    + {order.items.length - 2} more item
                    {order.items.length - 2 > 1 ? "s" : ""}
                  </div>
                )}
              </div>

              {/* View Details Link */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-gray-900 hover:text-gray-600 font-medium text-sm"
                >
                  View Order Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
