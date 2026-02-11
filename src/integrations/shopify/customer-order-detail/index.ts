import {
  CustomerOrderDetailDocument,
  CustomerOrderDetailQuery,
  CustomerOrderDetailQueryVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerOrderDetail = async (
  variables: CustomerOrderDetailQueryVariables,
): Promise<CustomerOrderDetailQuery | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.query<
      CustomerOrderDetailQuery,
      CustomerOrderDetailQueryVariables
    >({
      query: CustomerOrderDetailDocument,
      variables,
      fetchPolicy: "no-cache",
    });

    if (!data) {
      throw new Error("No data returned from customerOrderDetail query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching customer order detail:", error);
  }
};
