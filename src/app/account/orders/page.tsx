"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "@/components/Pagination/Pagination";
import { formatPrice } from "@/utils/formatPrice";

const ORDERS_PER_PAGE = 2;

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState<
    Array<{
      id: string;
      orderIdNumber: string;
      orderNumber: number;
      processedAt: string;
      status: string;
      totalAmount: string;
      currencyCode: string;
      items: Array<{
        id: string;
        name: string;
        variant?: string;
        quantity: number;
        price: string;
        currencyCode: string;
        image?: string | null;
        imageAlt?: string | null;
      }>;
    }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/shopify/customer-orders", {
          cache: "no-store",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Unable to load orders.");
        }
        const data = (await response.json()) as {
          orders?: {
            edges: Array<{
              node: {
                id: string;
                orderNumber: number;
                processedAt: string;
                fulfillmentStatus: string | null;
                financialStatus: string | null;
                totalPrice: { amount: string; currencyCode: string };
                lineItems: {
                  edges: Array<{
                    node: {
                      title: string;
                      quantity: number;
                      originalTotalPrice: {
                        amount: string;
                        currencyCode: string;
                      };
                      variant?: {
                        title?: string | null;
                        image?: { url: string; altText?: string | null } | null;
                      } | null;
                    };
                  }>;
                };
              };
            }>;
          };
        };

        const mapped = (data.orders?.edges ?? []).map((edge) => {
          const order = edge.node;
          const orderIdNumber =
            order.id.split("/").pop()?.split("?")[0] || order.id;
          return {
            id: order.id,
            orderIdNumber,
            orderNumber: order.orderNumber,
            processedAt: order.processedAt,
            status:
              order.fulfillmentStatus || order.financialStatus || "Processing",
            totalAmount: order.totalPrice.amount,
            currencyCode: order.totalPrice.currencyCode,
            items: order.lineItems.edges.map((itemEdge, itemIndex) => {
              const item = itemEdge.node;
              return {
                id: `${order.id}-${itemIndex}`,
                name: item.title,
                variant: item.variant?.title || undefined,
                quantity: item.quantity,
                price: item.originalTotalPrice.amount,
                currencyCode: item.originalTotalPrice.currencyCode,
                image: item.variant?.image?.url || null,
                imageAlt: item.variant?.image?.altText || null,
              };
            }),
          };
        });

        setOrders(mapped);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load orders.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;
  const currentOrders = useMemo(
    () => orders.slice(startIndex, endIndex),
    [orders, startIndex, endIndex],
  );

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
          {loading && <div className="text-gray-600">Loading orders...</div>}
          {!loading && error && <div className="text-red-600">{error}</div>}
          {!loading && !error && currentOrders.length === 0 && (
            <div className="text-gray-600">No orders found.</div>
          )}
          {!loading &&
            !error &&
            currentOrders.map((order) => (
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
                      <p className="text-gray-900">
                        {new Date(order.processedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Total</p>
                      <p className="font-medium">
                        {formatPrice(order.totalAmount, order.currencyCode)}
                      </p>
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
                      {item.image ? (
                        <div className="w-16 bg-gray-100 flex-shrink-0 relative aspect-[3/4]">
                          <Image
                            src={item.image}
                            alt={item.imageAlt || item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 bg-gray-100 flex-shrink-0 relative aspect-[3/4]" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {item.variant}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatPrice(item.price, item.currencyCode)}
                        </p>
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
                    href={`/account/orders/${order.orderIdNumber}`}
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
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
