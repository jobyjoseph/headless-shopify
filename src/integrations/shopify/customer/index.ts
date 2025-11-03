import {
  CustomerDocument,
  CustomerQueryVariables,
  CustomerQuery,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customer = async (
  input: CustomerQueryVariables
): Promise<CustomerQuery | null> => {
  try {
    const { customerAccessToken } = input;

    const client = createApolloClient();
    const { data } = await client.query<CustomerQuery, CustomerQueryVariables>({
      query: CustomerDocument,
      variables: {
        customerAccessToken,
      },
    });

    if (!data) {
      throw new Error("No data returned from customer query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching customer:", error);
    return null;
  }
};
