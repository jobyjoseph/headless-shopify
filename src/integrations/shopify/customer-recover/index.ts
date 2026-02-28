import {
  CustomerRecoverDocument,
  CustomerRecoverMutation,
  CustomerRecoverMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerRecover = async (
  email: string,
): Promise<CustomerRecoverMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerRecoverMutation,
      CustomerRecoverMutationVariables
    >({
      mutation: CustomerRecoverDocument,
      variables: { email },
    });

    if (!data) {
      throw new Error("No data returned from customerRecover mutation");
    }

    return data;
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
