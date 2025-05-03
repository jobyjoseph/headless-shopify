import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import getAllProductsQuery from "./graphql/products.graphql";

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
  const data = await shopifyFetch<{ products: { edges: ProductEdge[] } }>(
    print(getAllProductsQuery),
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
