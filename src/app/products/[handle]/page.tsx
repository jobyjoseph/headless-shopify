import { getProductByHandle } from "@/integrations/shopify/services/productService";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "./_components/AddToCart";

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) {
    notFound(); // shows Next.js 404 page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.edges.map((img, idx) => (
            <Image
              key={idx}
              src={img.node.url}
              alt={img.node.altText || product.title}
              width={600}
              height={600}
              className="object-cover rounded"
            />
          ))}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-800 mb-6">
            {product.priceRange.maxVariantPrice.amount}
          </p>

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <AddToCartButton variantId={product.variants[0].id} />
        </div>
      </div>
    </div>
  );
}
