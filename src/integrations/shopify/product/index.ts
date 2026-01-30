import {
  ProductDocument,
  ProductQueryVariables,
  ProductQuery,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const getProduct = async (
  input: ProductQueryVariables,
): Promise<ProductQuery | null> => {
  try {
    const { handle } = input;

    const client = createApolloClient();
    const { data } = await client.query<ProductQuery, ProductQueryVariables>({
      query: ProductDocument,
      variables: {
        handle,
      },
    });

    if (!data) {
      throw new Error("No data returned from product query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
