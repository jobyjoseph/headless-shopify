import createShopifyApolloClient from "../shopify-apollo-client";
import {
  GetCartDocument,
  GetCartQuery,
  GetCartQueryVariables,
} from "@/generated/shopifySchemaTypes";

const client = createShopifyApolloClient();

/**
 * Get cart details from Shopify
 */
export async function getCart(cartId: string): Promise<GetCartQuery["cart"]> {
  try {
    const { data } = await client.query<GetCartQuery, GetCartQueryVariables>({
      query: GetCartDocument,
      variables: { cartId },
      fetchPolicy: "network-only",
    });
    return data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}
