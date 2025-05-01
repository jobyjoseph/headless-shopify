import { shopifyFetch } from "../storefrontClient";

interface Product {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  price: string;
}

interface ProductNode {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface ProductEdge {
  node: ProductNode;
}

export async function getAllCollections(): Promise<Product[]> {
  const getAllProductsQuery = `
    query getAllProducts($first: Int = 20) {
        products(first: $first) {
            edges {
                node {
                    id
                    title
                    handle
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
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
        }
    }
  `;
  const data = await shopifyFetch<{ products: { edges: ProductEdge[] } }>(
    getAllProductsQuery,
    { first: 50 }
  );

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    imageUrl: node.images.edges[0]?.node.url || null,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
  }));
}
