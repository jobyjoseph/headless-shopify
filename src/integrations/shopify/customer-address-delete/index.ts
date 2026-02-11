import {
  CustomerAddressDeleteDocument,
  CustomerAddressDeleteMutation,
  CustomerAddressDeleteMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAddressDelete = async (
  customerAccessToken: string,
  addressId: string,
): Promise<CustomerAddressDeleteMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerAddressDeleteMutation,
      CustomerAddressDeleteMutationVariables
    >({
      mutation: CustomerAddressDeleteDocument,
      variables: { customerAccessToken, addressId },
    });

    if (!data) {
      throw new Error("No data returned from customerAddressDelete mutation");
    }

    return data;
  } catch (error) {
    console.error("Error deleting customer address:", error);
  }
};
