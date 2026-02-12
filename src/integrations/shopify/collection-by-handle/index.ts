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
    const { handle } = input;
    let hasNextPage = true;
    let after: string | null = null;
    let collectionData: CollectionByHandleQuery["collection"] | null = null;
    let allEdges: NonNullable<
      CollectionByHandleQuery["collection"]
    >["products"]["edges"] = [];

    const client = createApolloClient();

    while (hasNextPage) {
      const { data } = await client.query<
        CollectionByHandleQuery,
        CollectionByHandleQueryVariables
      >({
        query: CollectionByHandleDocument,
        variables: {
          handle,
          first: 250,
          after,
        },
      });

      if (!data?.collection) {
        return null;
      }

      collectionData = data.collection;

      allEdges = [...allEdges, ...data.collection.products.edges];

      hasNextPage = data.collection.products.pageInfo.hasNextPage;
      after = data.collection.products.pageInfo.endCursor ?? null;
    }

    if (!collectionData) {
      return null;
    }

    return {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      productsCount: allEdges.length,
      products: allEdges.map(({ node: product }) => ({
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
