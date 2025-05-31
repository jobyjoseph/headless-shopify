import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollectionByHandle } from "@/integrations/shopify/services/collectionService";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const { collection, products } = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-600 max-w-3xl">{collection.description}</p>
        )}
      </div>

      {/* Collection Banner Image */}
      {collection.imageUrl && (
        <div className="relative h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={collection.imageUrl}
            alt={collection.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
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
              {product.availableForSale === false && (
                <span className="text-sm text-gray-500">Out of stock</span>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
}