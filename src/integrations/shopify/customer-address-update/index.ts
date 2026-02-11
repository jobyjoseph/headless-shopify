import {
  CustomerAddressUpdateDocument,
  CustomerAddressUpdateMutation,
  CustomerAddressUpdateMutationVariables,
  MailingAddressInput,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAddressUpdate = async (
  customerAccessToken: string,
  addressId: string,
  address: MailingAddressInput,
): Promise<CustomerAddressUpdateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerAddressUpdateMutation,
      CustomerAddressUpdateMutationVariables
    >({
      mutation: CustomerAddressUpdateDocument,
      variables: { customerAccessToken, addressId, address },
    });

    if (!data) {
      throw new Error("No data returned from customerAddressUpdate mutation");
    }

    return data;
  } catch (error) {
    console.error("Error updating customer address:", error);
  }
};
