import {
  ProductDocument,
  ProductQueryVariables,
  ProductQuery,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const product = async (
  input: ProductQueryVariables
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
      const errorMessage = `No data returned for product with handle: ${handle}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
