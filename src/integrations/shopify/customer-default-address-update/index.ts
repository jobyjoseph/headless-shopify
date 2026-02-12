import {
  CustomerDefaultAddressUpdateDocument,
  CustomerDefaultAddressUpdateMutation,
  CustomerDefaultAddressUpdateMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerDefaultAddressUpdate = async (
  customerAccessToken: string,
  addressId: string,
): Promise<CustomerDefaultAddressUpdateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerDefaultAddressUpdateMutation,
      CustomerDefaultAddressUpdateMutationVariables
    >({
      mutation: CustomerDefaultAddressUpdateDocument,
      variables: { customerAccessToken, addressId },
    });

    if (!data) {
      throw new Error(
        "No data returned from customerDefaultAddressUpdate mutation",
      );
    }

    return data;
  } catch (error) {
    console.error("Error setting default address:", error);
  }
};
