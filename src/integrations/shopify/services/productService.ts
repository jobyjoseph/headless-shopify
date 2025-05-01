import { shopifyFetch } from "../storefrontClient";

interface Variant {
  id: string;
  title: string;
  available: boolean;
}

interface Product {
  id: string;
  title: string;
  descriptionHtml: string;
  images: { url: string; altText: string | null }[];
  price: string;
  variants: Variant[];
}

interface ImageNode {
  url: string;
  altText: string | null;
}

interface ImageEdge {
  node: ImageNode;
}

interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
}

interface VariantEdge {
  node: VariantNode;
}

interface PriceRange {
  minVariantPrice: {
    amount: string;
    currencyCode: string;
  };
}

interface ProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: ImageEdge[];
  };
  variants: {
    edges: VariantEdge[];
  };
  priceRange: PriceRange;
}

interface GetProductByHandleResponse {
  product: ProductNode | null;
}

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  const getProductByHandleQuery = `
    query getProductByHandle($handle: String!) {
        product(handle: $handle) {
            id
            title
            descriptionHtml
            images(first: 5) {
                edges {
                    node {
                    url
                    altText
                    }
                }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                }
              }
            }
            priceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
        }
    }
  `;
  const data = await shopifyFetch<GetProductByHandleResponse>(
    getProductByHandleQuery,
    {
      handle,
    }
  );

  const product = data.product;

  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    images: product.images.edges.map((edge) => ({
      url: edge.node.url,
      altText: edge.node.altText,
    })),
    price: `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
    variants: product.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      available: edge.node.availableForSale,
    })),
  };
}
