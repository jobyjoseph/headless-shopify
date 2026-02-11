import {
  CustomerAddressesDocument,
  CustomerAddressesQuery,
  CustomerAddressesQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAddresses = async (
  variables: CustomerAddressesQueryVariables,
): Promise<CustomerAddressesQuery | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.query<
      CustomerAddressesQuery,
      CustomerAddressesQueryVariables
    >({
      query: CustomerAddressesDocument,
      variables,
      fetchPolicy: "no-cache",
    });

    if (!data) {
      throw new Error("No data returned from customerAddresses query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching customer addresses:", error);
  }
};
