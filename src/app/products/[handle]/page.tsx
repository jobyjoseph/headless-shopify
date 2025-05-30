import { notFound } from "next/navigation";
import { getProductByHandle } from "@/integrations/shopify/services/productService";
import ProductVariantSelector from "./_components/ProductVariantSelector";
import ProductImageGallery from "./_components/ProductImageGallery";
import { Metadata } from "next";

type Props = {
  params: { handle: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || `Buy ${product.title} from our store`,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map(({ node }) => ({
    id: node.id,
    url: node.url,
    altText: node.altText || product.title,
  }));

  const variants = product.variants.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    availableForSale: node.availableForSale,
    quantityAvailable: node.quantityAvailable || 0,
    price: node.price,
    compareAtPrice: node.compareAtPrice,
    image: node.image,
    selectedOptions: node.selectedOptions,
  }));

  const defaultVariant = variants.find((v) => v.availableForSale) || variants[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <ProductImageGallery images={images} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-baseline gap-3 mb-4">
              {defaultVariant.compareAtPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  {defaultVariant.compareAtPrice.currencyCode} {defaultVariant.compareAtPrice.amount}
                </span>
              )}
              <span className="text-3xl font-bold">
                {defaultVariant.price.currencyCode} {defaultVariant.price.amount}
              </span>
              {defaultVariant.compareAtPrice && (
                <span className="bg-red-600 text-white px-2 py-1 text-sm rounded">
                  Save {Math.round(((parseFloat(defaultVariant.compareAtPrice.amount) - parseFloat(defaultVariant.price.amount)) / parseFloat(defaultVariant.compareAtPrice.amount)) * 100)}%
                </span>
              )}
            </div>
          </div>

          {/* Variant Selector and Add to Cart */}
          <ProductVariantSelector
            variants={variants}
            options={product.options}
          />

          {/* Product Description */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <ul className="space-y-2 text-gray-600">
              <li>SKU: {product.id.split("/").pop()}</li>
              <li>Availability: {product.availableForSale ? "In Stock" : "Out of Stock"}</li>
              {variants.length > 1 && (
                <li>{variants.length} variants available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}