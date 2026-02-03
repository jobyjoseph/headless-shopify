import {
  AllProductsDocument,
  AllProductsQuery,
  AllProductsQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";
import { formatPrice } from "@/utils/formatPrice";
import { cache } from "react";

export const getAllProducts = cache(async () => {
  const pageSize = 100;
  let hasNextPage = true;
  let after: string | null = null;
  const products: AllProductsQuery["products"]["edges"] = [];
  const client = createApolloClient();

  while (hasNextPage) {
    const { data } = await client.query<
      AllProductsQuery,
      AllProductsQueryVariables
    >({
      query: AllProductsDocument,
      variables: {
        first: pageSize,
        after,
      },
    });

    if (!data) {
      throw new Error("No data returned from all products query");
    }

    data.products.edges.forEach((edge) => products.push(edge));
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return products.map(({ node: product }) => ({
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
