import {
  CollectionByHandleDocument,
  CollectionByHandleQuery,
  CollectionByHandleQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";
import { formatPrice } from "@/utils/formatPrice";
import { cache } from "react";

interface GetCollectionByHandleInput {
  handle: string;
  first?: number;
  page?: number;
}

export const getCollectionByHandle = cache(
  async (input: GetCollectionByHandleInput) => {
    const { handle, first = 16, page = 1 } = input;
    const currentPage = page < 1 ? 1 : page;
    let hasNextPage = true;
    let after: string | null = null;
    let collectionData: CollectionByHandleQuery["collection"] | null = null;
    let pageEdges: NonNullable<
      CollectionByHandleQuery["collection"]
    >["products"]["edges"] = [];
    let pageHasNext = false;
    let pageHasPrevious = false;

    const client = createApolloClient();

    let current = 1;
    while (hasNextPage && current <= currentPage) {
      const { data } = await client.query<
        CollectionByHandleQuery,
        CollectionByHandleQueryVariables
      >({
        query: CollectionByHandleDocument,
        variables: {
          handle,
          first,
          after,
        },
      });

      if (!data?.collection) {
        return null;
      }

      collectionData = data.collection;
      if (current === currentPage) {
        pageEdges = data.collection.products.edges;
        pageHasNext = data.collection.products.pageInfo.hasNextPage;
        pageHasPrevious = data.collection.products.pageInfo.hasPreviousPage;
      }

      hasNextPage = data.collection.products.pageInfo.hasNextPage;
      after = data.collection.products.pageInfo.endCursor ?? null;
      current += 1;
    }

    if (!collectionData) {
      return null;
    }

    return {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      currentPage,
      hasNextPage: pageHasNext,
      hasPreviousPage: pageHasPrevious,
      products: pageEdges.map(({ node: product }) => ({
        id: product.id,
        title: product.title,
        handle: product.handle,
        image: product.featuredImage?.url ?? null,
        imageAlt: product.featuredImage?.altText ?? product.title,
        price: formatPrice(
          product.priceRange.minVariantPrice.amount,
          product.priceRange.minVariantPrice.currencyCode,
        ),
      })),
    };
  },
);
