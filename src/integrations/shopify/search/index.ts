import {
  SearchProductsDocument,
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";
import { formatPrice } from "@/utils/formatPrice";
import { cache } from "react";

interface SearchProductsInput {
  query: string;
}

export const searchProducts = cache(async (input: SearchProductsInput) => {
  const query = input.query.trim();

  if (!query) {
    return {
      query: "",
      productsCount: 0,
      products: [],
    };
  }

  const client = createApolloClient();
  let hasNextPage = true;
  let after: string | null = null;
  let totalCount = 0;
  const products: Array<{
    id: string;
    title: string;
    handle: string;
    image: string | null;
    imageAlt: string;
    price: string;
  }> = [];

  while (hasNextPage) {
    const { data } = await client.query<
      SearchProductsQuery,
      SearchProductsQueryVariables
    >({
      query: SearchProductsDocument,
      variables: {
        query,
        first: 250,
        after,
      },
    });

    if (!data?.search) {
      break;
    }

    totalCount = data.search.totalCount;

    data.search.edges.forEach(({ node }) => {
      if (node.__typename !== "Product") {
        return;
      }

      products.push({
        id: node.id,
        title: node.title,
        handle: node.handle,
        image: node.featuredImage?.url ?? null,
        imageAlt: node.featuredImage?.altText ?? node.title,
        price: formatPrice(
          node.priceRange.minVariantPrice.amount,
          node.priceRange.minVariantPrice.currencyCode,
        ),
      });
    });

    hasNextPage = data.search.pageInfo.hasNextPage;
    after = data.search.pageInfo.endCursor ?? null;
  }

  return {
    query,
    productsCount: totalCount || products.length,
    products,
  };
});
