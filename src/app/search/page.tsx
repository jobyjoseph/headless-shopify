import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/integrations/shopify/services/searchService";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";

  let searchResult = null;
  if (query) {
    searchResult = await searchProducts(query);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Search</h1>
        <form className="max-w-2xl">
          <div className="flex gap-2">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search for products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {query && searchResult && (
        <div>
          <div className="mb-6">
            <p className="text-gray-600">
              {searchResult.totalCount > 0 ? (
                <>
                  Found{" "}
                  <span className="font-semibold">
                    {searchResult.totalCount}
                  </span>{" "}
                  results for &quot;
                  <span className="font-semibold">{query}</span>&quot;
                </>
              ) : (
                <>
                  No results found for &quot;
                  <span className="font-semibold">{query}</span>&quot;
                </>
              )}
            </p>
          </div>

          {searchResult.products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResult.products.map((product) => (
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
                    <span className="font-bold">{product.price}</span>
                    {product.compareAtPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        {product.compareAtPrice}
                      </span>
                    )}
                  </div>
                  {!product.availableForSale && (
                    <span className="text-sm text-gray-500">Out of stock</span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            query && (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">
                  No products match your search.
                </p>
                <p className="text-gray-500">
                  Try using different keywords or browse our collections.
                </p>
                <Link
                  href="/collections/all"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Browse all products →
                </Link>
              </div>
            )
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-16">
          <p className="text-gray-500">Enter a search term to find products.</p>
        </div>
      )}
    </div>
  );
}
