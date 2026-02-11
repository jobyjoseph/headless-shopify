import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { customerOrderDetail } from "@/integrations/shopify/customer-order-detail";
import { formatPrice } from "@/utils/formatPrice";

interface OrderDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { orderId } = await params;
  const token = (await cookies()).get("shopifyCustomerAccessToken")?.value;

  if (!token) {
    notFound();
  }

  const data = await customerOrderDetail({
    customerAccessToken: token,
    first: 50,
  });

  const orders = data?.customer?.orders?.edges ?? [];
  const order = orders
    .map((edge) => edge.node)
    .find((node) => node.id.split("/").pop()?.split("?")[0] === orderId);

  const orderStatus =
    order?.fulfillmentStatus || order?.financialStatus || "Processing";

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
            {orderStatus}
          </span>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Order Date</p>
            <p className="text-gray-900">
              {new Date(order.processedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Order Number</p>
            <p className="text-gray-900">#{order.orderNumber}</p>
          </div>
          <div className="border border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase mb-2">Total</p>
            <p className="font-medium text-gray-900">
              {formatPrice(
                order.totalPrice.amount,
                order.totalPrice.currencyCode,
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Items</h2>
            <div className="border border-gray-200 divide-y divide-gray-100">
              {order.lineItems.edges.map((itemEdge, index) => {
                const item = itemEdge.node;
                const image = item.variant?.image?.url || null;
                const imageAlt = item.variant?.image?.altText || item.title;
                return (
                  <div key={`${order.id}-${index}`} className="flex gap-4 p-4">
                    {image ? (
                      <div className="w-20 bg-gray-100 flex-shrink-0 relative aspect-[3/4]">
                        <Image
                          src={image}
                          alt={imageAlt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 bg-gray-100 flex-shrink-0 relative aspect-[3/4]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      {item.variant?.title && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.variant.title}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice(
                          item.originalTotalPrice.amount,
                          item.originalTotalPrice.currencyCode,
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                  <span>
                    {formatPrice(
                      order.subtotalPrice?.amount || "0",
                      order.totalPrice.currencyCode,
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {order.totalShippingPrice?.amount
                      ? formatPrice(
                          order.totalShippingPrice.amount,
                          order.totalShippingPrice.currencyCode,
                        )
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>
                    {order.totalTax?.amount
                      ? formatPrice(
                          order.totalTax.amount,
                          order.totalTax.currencyCode,
                        )
                      : formatPrice("0", order.totalPrice.currencyCode)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-medium text-gray-900">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      order.totalPrice.amount,
                      order.totalPrice.currencyCode,
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="border border-gray-200 p-4">
                {order.shippingAddress ? (
                  <>
                    <p className="text-gray-900">
                      {order.shippingAddress.name}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.address1}
                    </p>
                    {order.shippingAddress.address2 && (
                      <p className="text-gray-600">
                        {order.shippingAddress.address2}
                      </p>
                    )}
                    <p className="text-gray-600">
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.province}{" "}
                      {order.shippingAddress.zip}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.country}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600">No shipping address</p>
                )}
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
