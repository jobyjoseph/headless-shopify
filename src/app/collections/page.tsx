import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/integrations/shopify/all-products";

interface ProductTileProps {
  product: {
    id: string;
    title: string;
    price: string;
    image: string | null;
    imageAlt: string;
    handle: string;
  };
}

const ProductTile = ({ product }: ProductTileProps) => {
  return (
    <Link href={`/products/${product.handle}`} className="group">
      <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden mb-3">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : null}
      </div>
      <h3 className="font-normal text-gray-900 group-hover:text-gray-600 transition-colors">
        {product.title}
      </h3>
      <p className="font-light text-gray-500 mt-1">{product.price}</p>
    </Link>
  );
};

export default async function CollectionsPage() {
  const products = await getAllProducts();
  const collection = {
    title: "All Products",
    description: "Discover our complete collection of premium products.",
    productsCount: products.length,
    products,
  };

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
    </main>
  );
}
