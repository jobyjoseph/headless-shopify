import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import searchProductsQuery from "./graphql/search.graphql";
import { SearchProductsQuery } from "@/generated/shopifySchemaTypes";

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageUrl: string | null;
  price: string;
  compareAtPrice: string | null;
  availableForSale: boolean;
}

interface SearchResult {
  products: Product[];
  totalCount: number;
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export async function searchProducts(
  query: string,
  first: number = 24,
  after?: string
): Promise<SearchResult> {
  const data = await shopifyFetch<SearchProductsQuery>(
    print(searchProductsQuery),
    { query, first, after }
  );

  if (!data || !data.search || !data.search.edges) {
    return {
      products: [],
      totalCount: 0,
      pageInfo: {
        hasNextPage: false,
        endCursor: null,
      },
    };
  }

  const products = data.search.edges
    .filter((edge) => edge.node.__typename === "Product")
    .map((edge) => {
      if (edge.node.__typename !== "Product") return null;
      const product = edge.node;
      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description || "",
        imageUrl: product.featuredImage?.url || null,
        price: `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
        compareAtPrice: product.compareAtPriceRange?.minVariantPrice
          ? `${product.compareAtPriceRange.minVariantPrice.amount} ${product.compareAtPriceRange.minVariantPrice.currencyCode}`
          : null,
        availableForSale: product.availableForSale,
      };
    })
    .filter((product): product is Product => product !== null);

  return {
    products,
    totalCount: data.search.totalCount || 0,
    pageInfo: data.search.pageInfo || {
      hasNextPage: false,
      endCursor: null,
    },
  };
}
