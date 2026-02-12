import createShopifyApolloClient from "../shopify-apollo-client";
import {
  CartLinesUpdateDocument,
  CartLinesUpdateMutation,
  CartLinesUpdateMutationVariables,
} from "@/generated/shopifySchemaTypes";

const client = createShopifyApolloClient();

/**
 * Update cart line quantities
 */
export async function cartLinesUpdate(
  cartId: string,
  lines: CartLinesUpdateMutationVariables["lines"],
): Promise<CartLinesUpdateMutation["cartLinesUpdate"]> {
  try {
    const { data } = await client.mutate<
      CartLinesUpdateMutation,
      CartLinesUpdateMutationVariables
    >({
      mutation: CartLinesUpdateDocument,
      variables: {
        cartId,
        lines,
      },
    });

    return data?.cartLinesUpdate ?? null;
  } catch (error) {
    console.error("Error updating cart lines:", error);
    throw error;
  }
}
