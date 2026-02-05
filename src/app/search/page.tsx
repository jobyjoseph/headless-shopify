import Image from "next/image";
import Link from "next/link";
import { searchProducts } from "@/integrations/shopify/search";

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

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const searchResults = query
    ? await searchProducts({ query })
    : { query: "", productsCount: 0, products: [] };

  return (
    <main className="px-5 py-8 lg:px-10 lg:py-12">
      {/* Search Header */}
      <div className="pb-6 mb-8 text-center">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          {query ? `Search Results for "${searchResults.query}"` : "Search"}
        </h1>
        <p className="text-gray-900">
          {query
            ? `${searchResults.productsCount} results`
            : "Enter a search term to see results"}
        </p>
      </div>

      {/* Search Results Grid */}
      {searchResults.products.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
          {searchResults.products.map((product) => (
            <ProductTile key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center text-gray-500">
          No results found for &quot;{query}&quot;.
        </div>
      ) : null}
    </main>
  );
}
