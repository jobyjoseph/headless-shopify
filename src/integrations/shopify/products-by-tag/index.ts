import {
  ProductsByTagDocument,
  ProductsByTagQueryVariables,
  ProductsByTagQuery,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";
import { cache } from "react";

export const getProductsByTag = cache(
  async (
    input: ProductsByTagQueryVariables,
  ): Promise<ProductsByTagQuery | null> => {
    try {
      const { query, first } = input;

      const client = createApolloClient();
      const { data } = await client.query<
        ProductsByTagQuery,
        ProductsByTagQueryVariables
      >({
        query: ProductsByTagDocument,
        variables: {
          query,
          first,
        },
      });

      if (!data) {
        throw new Error("No data returned from products by tag query");
      }

      console.log(data);

      return data;
    } catch (error) {
      console.error("Error fetching products by tag:", error);
      return null;
    }
  },
);
