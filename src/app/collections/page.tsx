"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "@/components/Pagination/Pagination";

// Placeholder data - will be replaced with Shopify API data
const placeholderCollection = {
  title: "All Products",
  description:
    "Discover our complete collection of premium products.",
  productsCount: 16,
  products: [
    {
      id: "1",
      title: "Cotton Real Deal Button Up Long Sleeve",
      price: "$98.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3970R_06661_b1_s1_a3_m91_640x.jpg?v=1768293180",
      handle: "cotton-real-deal-button-up-long-sleeve",
    },
    {
      id: "2",
      title: "Ribbed Prosper Tank",
      price: "$68.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W2799R_06661_b2_s1_a1_m191_640x.jpg?v=1768302759",
      handle: "ribbed-prosper-tank",
    },
    {
      id: "3",
      title: "Seamless Ribbed Favorite Bra Tank",
      price: "$72.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W9730R_06661_b1_s1_a2_m262_640x.jpg?v=1768295294",
      handle: "seamless-ribbed-favorite-bra-tank",
    },
    {
      id: "4",
      title: "Alosoft Crop Finesse Short Sleeve",
      price: "$58.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W1406R_06661_b1_s1_a4_m91_640x.jpg?v=1768292548",
      handle: "alosoft-crop-finesse-short-sleeve",
    },
    {
      id: "5",
      title: "Dreamlight Long Sleeve Top",
      price: "$72.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3984R_06661_b2_s1_a1_m267_640x.jpg?v=1768928500",
      handle: "dreamlight-long-sleeve-top",
    },
    {
      id: "6",
      title: "Alosoft Back For More Tee",
      price: "$58.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W1492R_06645_b2_s1_a1_m191_640x.jpg?v=1766048744",
      handle: "alosoft-back-for-more-tee",
    },
    {
      id: "7",
      title: "Airbrush Streamlined Bra Tank",
      price: "$68.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W9538R_0998_b1_s1_a4_m91_640x.jpg?v=1768338651",
      handle: "airbrush-streamlined-bra-tank",
    },
    {
      id: "8",
      title: "Ribbed Sea Coast Long Sleeve",
      price: "$64.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3781R_01_b1_s1_a1_1_m91_640x.jpg?v=1731610124",
      handle: "ribbed-sea-coast-long-sleeve",
    },
    {
      id: "9",
      title: "Aspire Tank",
      price: "$58.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W2675RG_0930_b1_s1_a3_m261_640x.jpg?v=1763642268",
      handle: "aspire-tank",
    },
    {
      id: "10",
      title: "Alosoft Intuition Long Sleeve Bra",
      price: "$84.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W9888R_01_b2_s1_a1_m177_640x.jpg?v=1766050963",
      handle: "alosoft-intuition-long-sleeve-bra",
    },
    {
      id: "11",
      title: "Airlift Winter Warm 1/4 Zip",
      price: "$108.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3788R_01_b1_s1_a2_m209_640x.jpg?v=1761855834",
      handle: "airlift-winter-warm-quarter-zip",
    },
    {
      id: "12",
      title: "Ribbed Modal Long Sleeve",
      price: "$68.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3903R_01_b1_s1_a1_1_m54_640x.jpg?v=1736900415",
      handle: "ribbed-modal-long-sleeve",
    },
    {
      id: "13",
      title: "Seamless Delight High Neck Bra",
      price: "$64.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W9536R_06645_b2_s1_a1_m190_640x.jpg?v=1766052596",
      handle: "seamless-delight-high-neck-bra",
    },
    {
      id: "14",
      title: "All Day Short Sleeve",
      price: "$58.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W1430R_00_b1_s1_a2_m241_640x.jpg?v=1759775196",
      handle: "all-day-short-sleeve",
    },
    {
      id: "15",
      title: "Alosoft 1/2 Zip Rapid Pullover",
      price: "$92.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W3694R_02125_b1_s1_a1_1_m161_640x.jpg?v=1765563078",
      handle: "alosoft-half-zip-rapid-pullover",
    },
    {
      id: "16",
      title: "Alosoft Finesse Tee",
      price: "$64.00",
      image:
        "https://cdn.shopify.com/s/files/1/2185/2813/files/W1404R_01_b1_s1_a1_1_m262_640x.jpg?v=1766081095",
      handle: "alosoft-finesse-tee",
    },
  ],
};

interface ProductTileProps {
  product: {
    id: string;
    title: string;
    price: string;
    image: string;
    handle: string;
  };
}

const ProductTile = ({ product }: ProductTileProps) => {
  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden mb-3">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="font-normal text-gray-900 group-hover:text-gray-600 transition-colors">
        {product.title}
      </h3>
      <p className="font-light text-gray-500 mt-1">{product.price}</p>
    </Link>
  );
};

export default function CollectionsPage() {
  // TODO: Fetch all products from Shopify API
  const collection = placeholderCollection;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      {/* Collection Header */}
      <div className="pb-6 mb-8 text-center">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          {collection.title}
        </h1>
        <p className="text-gray-600 mb-3">{collection.description}</p>
        <p className="text-gray-900">{collection.productsCount} products</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
        {collection.products.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

