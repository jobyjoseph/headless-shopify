import { getAllCollections } from "@/integrations/shopify/services/collectionService";
import Link from "next/link";
import Image from "next/image";

export default async function CollectionsAllPage() {
  const products = await getAllCollections();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.handle}`}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            {product.imageUrl && (
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover mb-4"
              />
            )}
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
