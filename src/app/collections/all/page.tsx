import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/integrations/shopify/services/collectionService";

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600">Browse our complete collection</p>
      </div>

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
              </div>
              <h3 className="font-medium mb-1 group-hover:text-blue-600 transition">
                {product.title}
              </h3>
              <span className="font-bold">{product.price}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}