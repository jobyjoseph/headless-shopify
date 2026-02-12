"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface SimilarProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  handle: string;
}

interface SimilarItemsProps {
  products: SimilarProduct[];
}

export const SimilarItems = ({ products }: SimilarItemsProps) => {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Similar Items
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="group"
          >
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
        ))}
      </div>
    </section>
  );
};
