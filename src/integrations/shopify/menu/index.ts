import {
  MenuDocument,
  MenuQueryVariables,
  MenuQuery,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const getMenu = async (
  input: MenuQueryVariables,
): Promise<MenuQuery | null> => {
  try {
    const { handle } = input;

    const client = createApolloClient();
    const { data } = await client.query<MenuQuery, MenuQueryVariables>({
      query: MenuDocument,
      variables: {
        handle,
      },
    });

    if (!data) {
      throw new Error("No data returned from menu query");
    }

    return data;
  } catch (error) {
    console.error("Error fetching menu:", error);
    return null;
  }
};
