import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

// Sample orders data (shared with orders list page - in real app this would come from API)
const sampleOrders = [
  {
    id: "order-1",
    orderNumber: "1042",
    date: "January 15, 2026",
    status: "Delivered",
    total: "$360.00",
    subtotal: "$360.00",
    shipping: "Free",
    tax: "$0.00",
    shippingAddress: {
      name: "Jane Doe",
      address1: "123 Yoga Lane",
      address2: "Apt 4B",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
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
    subtotal: "$502.00",
    shipping: "Free",
    tax: "$0.00",
    shippingAddress: {
      name: "Jane Doe",
      address1: "123 Yoga Lane",
      address2: "Apt 4B",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
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
];

interface OrderDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { orderId } = await params;
  const order = sampleOrders.find((o) => o.id === orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/account/orders"
              className="text-gray-600 hover:text-gray-900 font-light text-sm mb-2 inline-block"
            >
              ← Back to Orders
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">
              Order #{order.orderNumber}
            </h1>
          </div>
          <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-800">
            {order.status}
          </span>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Order Date</p>
            <p className="text-gray-900">{order.date}</p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Order Number</p>
            <p className="text-gray-900">#{order.orderNumber}</p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Total</p>
            <p className="font-medium text-gray-900">{order.total}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
            <div className="border border-gray-200 divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4">
                  <div className="w-20 bg-gray-100 flex-shrink-0 relative aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.variant}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="border border-gray-200 p-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{order.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{order.shipping}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{order.tax}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>{order.total}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="border border-gray-200 p-4">
                <p className="text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.address1}
                </p>
                {order.shippingAddress.address2 && (
                  <p className="text-gray-600">
                    {order.shippingAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase text-sm">
                Track Order
              </button>
              <button className="w-full border border-gray-900 text-gray-900 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer uppercase text-sm">
                Need Help?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
