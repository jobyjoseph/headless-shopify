import type { ProductQuery } from "@/generated/shopifySchemaTypes";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductDisplayData {
  title: string;
  formattedPrice: string;
  images: ProductImage[];
  description: string;
}

export function getProductDisplayData(data: ProductQuery): ProductDisplayData {
  const title = data.product.title;
  const price = data.product.priceRange?.minVariantPrice;

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currencyCode,
      }).format(parseFloat(price.amount))
    : "$0.00";

  const images: ProductImage[] =
    data.product.images?.edges?.map((edge) => ({
      src: edge.node.url,
      alt: edge.node.altText || title,
    })) || [];

  const description = data.product.description || "";

  return {
    title,
    formattedPrice,
    images,
    description,
  };
}
