import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/integrations/shopify/storefrontClient";
import { print } from "graphql";
import getFeaturedProductsQuery from "@/integrations/shopify/services/graphql/featuredProducts.graphql";
import { GetFeaturedProductsQuery } from "@/generated/shopifySchemaTypes";
import { getCollections } from "@/integrations/shopify/services/collectionService";

export default async function HomePage() {
  // Fetch featured products
  const featuredData = await shopifyFetch<GetFeaturedProductsQuery>(
    print(getFeaturedProductsQuery),
    { first: 8 }
  );

  const featuredProducts = featuredData.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    imageUrl: node.featuredImage?.url || null,
    price: node.priceRange.minVariantPrice.amount,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    compareAtPrice: node.compareAtPriceRange?.minVariantPrice?.amount,
    availableForSale: node.availableForSale,
  }));

  // Fetch collections
  const collections = await getCollections(4);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative h-[500px] mb-12 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-xl mb-8">Discover amazing products at great prices</p>
            <Link
              href="/collections/all"
              className="inline-block bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Shop by Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition"
              >
                <div className="aspect-square relative">
                  {collection.imageUrl ? (
                    <Image
                      src={collection.imageUrl}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{collection.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link
            href="/collections/all"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                )}
                {product.compareAtPrice && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                    Sale
                  </div>
                )}
              </div>
              <h3 className="font-medium mb-1 group-hover:text-blue-600 transition">
                {product.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {product.currencyCode} {product.price}
                </span>
                {product.compareAtPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    {product.currencyCode} {product.compareAtPrice}
                  </span>
                )}
              </div>
              {!product.availableForSale && (
                <span className="text-sm text-gray-500">Out of stock</span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 rounded-lg p-8 text-center mb-16">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="text-gray-600 mb-6">
          Subscribe to our newsletter and get 10% off your first order
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}