import {
  CustomerAddressCreateDocument,
  CustomerAddressCreateMutation,
  CustomerAddressCreateMutationVariables,
  MailingAddressInput,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAddressCreate = async (
  customerAccessToken: string,
  address: MailingAddressInput,
): Promise<CustomerAddressCreateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerAddressCreateMutation,
      CustomerAddressCreateMutationVariables
    >({
      mutation: CustomerAddressCreateDocument,
      variables: { customerAccessToken, address },
    });

    if (!data) {
      throw new Error("No data returned from customerAddressCreate mutation");
    }

    return data;
  } catch (error) {
    console.error("Error creating customer address:", error);
  }
};
