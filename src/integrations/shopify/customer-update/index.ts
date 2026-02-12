import {
  CustomerUpdateDocument,
  CustomerUpdateInput,
  CustomerUpdateMutation,
  CustomerUpdateMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerUpdate = async (
  customerAccessToken: string,
  customer: CustomerUpdateInput,
): Promise<CustomerUpdateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerUpdateMutation,
      CustomerUpdateMutationVariables
    >({
      mutation: CustomerUpdateDocument,
      variables: { customerAccessToken, customer },
    });

    if (!data) {
      throw new Error("No data returned from customerUpdate mutation");
    }

    return data;
  } catch (error) {
    console.error("Error updating Shopify customer:", error);
  }
};
