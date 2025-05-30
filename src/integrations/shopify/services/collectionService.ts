import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import getAllProductsQuery from "./graphql/products.graphql";
import { getCollections as getCollectionsQuery, getCollectionByHandle as getCollectionByHandleQuery } from "./graphql/collections.graphql";
import { GetCollectionsQuery, GetCollectionByHandleQuery } from "@/generated/shopifySchemaTypes";

interface Product {
  id: string;
  title: string;
  handle: string;
  imageUrl: string | null;
  price: string;
  compareAtPrice?: string | null;
  availableForSale?: boolean;
}

interface Collection {
  id: string;
  title: string;
  handle: string;
  description?: string;
  imageUrl?: string | null;
  products?: Product[];
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

export async function getAllProducts(): Promise<Product[]> {
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

export async function getCollections(first: number = 10): Promise<Collection[]> {
  const data = await shopifyFetch<GetCollectionsQuery>(
    print(getCollectionsQuery),
    { first }
  );

  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    imageUrl: node.image?.url,
    products: node.products.edges.map(({ node: product }) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      imageUrl: product.featuredImage?.url || null,
      price: `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
    })),
  }));
}

export async function getCollectionByHandle(
  handle: string,
  first: number = 24,
  after?: string
): Promise<{
  collection: Collection | null;
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const data = await shopifyFetch<GetCollectionByHandleQuery>(
    print(getCollectionByHandleQuery),
    { handle, first, after }
  );

  if (!data.collection) {
    return {
      collection: null,
      products: [],
      pageInfo: { hasNextPage: false, endCursor: null },
    };
  }

  const collection = {
    id: data.collection.id,
    title: data.collection.title,
    handle: data.collection.handle,
    description: data.collection.description || undefined,
    imageUrl: data.collection.image?.url,
  };

  const products = data.collection.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    imageUrl: node.featuredImage?.url || null,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    compareAtPrice: node.compareAtPriceRange?.minVariantPrice
      ? `${node.compareAtPriceRange.minVariantPrice.amount} ${node.compareAtPriceRange.minVariantPrice.currencyCode}`
      : null,
    availableForSale: node.availableForSale,
  }));

  return {
    collection,
    products,
    pageInfo: data.collection.products.pageInfo,
  };
}

// Keep the old function for backward compatibility
export async function getAllCollections(): Promise<Product[]> {
  return getAllProducts();
}