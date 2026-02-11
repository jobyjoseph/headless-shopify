import {
  CustomerCreateDocument,
  CustomerCreateInput,
  CustomerCreateMutation,
  CustomerCreateMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerCreate = async (
  input: CustomerCreateInput,
): Promise<CustomerCreateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerCreateMutation,
      CustomerCreateMutationVariables
    >({
      mutation: CustomerCreateDocument,
      variables: { input },
    });

    if (!data) {
      throw new Error("No data returned from customerCreate mutation");
    }

    return data;
  } catch (error) {
    console.error("Error creating Shopify customer:", error);
  }
};
