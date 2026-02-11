import {
  CustomerOrdersDocument,
  CustomerOrdersQuery,
  CustomerOrdersQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerOrders = async (
  variables: CustomerOrdersQueryVariables,
): Promise<CustomerOrdersQuery | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.query<
      CustomerOrdersQuery,
      CustomerOrdersQueryVariables
    >({
      query: CustomerOrdersDocument,
      variables,
      fetchPolicy: "no-cache",
    });

    if (!data) {
      throw new Error("No data returned from customerOrders query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching customer orders:", error);
  }
};
