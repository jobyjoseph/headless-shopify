import {
  FeaturedProductsDocument,
  FeaturedProductsQuery,
  FeaturedProductsQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";
import { formatPrice } from "@/utils/formatPrice";
import { cache } from "react";

const FEATURED_PRODUCTS_QUERY = "tag:featured";

export const getFeaturedProducts = cache(async (first = 8) => {
  const client = createApolloClient();
  const { data } = await client.query<
    FeaturedProductsQuery,
    FeaturedProductsQueryVariables
  >({
    query: FeaturedProductsDocument,
    variables: {
      first,
      query: FEATURED_PRODUCTS_QUERY,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) {
    throw new Error("No data returned from featured products query");
  }

  return data.products.edges.map(({ node: product }) => ({
    id: product.id,
    title: product.title,
    handle: product.handle,
    image: product.featuredImage?.url ?? null,
    imageAlt: product.featuredImage?.altText ?? product.title,
    price: formatPrice(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode,
    ),
  }));
});
