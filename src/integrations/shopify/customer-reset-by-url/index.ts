import {
  CustomerResetByUrlDocument,
  CustomerResetByUrlMutation,
  CustomerResetByUrlMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerResetByUrl = async (
  password: string,
  resetUrl: string,
): Promise<CustomerResetByUrlMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerResetByUrlMutation,
      CustomerResetByUrlMutationVariables
    >({
      mutation: CustomerResetByUrlDocument,
      variables: { password, resetUrl },
    });

    if (!data) {
      throw new Error("No data returned from customerResetByUrl mutation");
    }

    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
  }
};
