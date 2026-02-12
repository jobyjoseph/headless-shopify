import {
  CustomerAccessTokenCreateDocument,
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreateMutation,
  CustomerAccessTokenCreateMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAccessTokenCreate = async (
  input: CustomerAccessTokenCreateInput
): Promise<CustomerAccessTokenCreateMutation> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerAccessTokenCreateMutation,
      CustomerAccessTokenCreateMutationVariables
    >({
      mutation: CustomerAccessTokenCreateDocument,
      variables: { input },
    });
    if (!data) {
      throw new Error(
        "No data returned from customerAccessTokenCreate mutation"
      );
    }
    return data;
  } catch (error) {
    console.error("Error creating customer access token:", error);
  }
};
