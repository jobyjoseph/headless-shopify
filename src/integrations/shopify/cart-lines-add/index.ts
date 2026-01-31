import createShopifyApolloClient from "../shopify-apollo-client";
import {
  CartLinesAddDocument,
  CartLinesAddMutation,
  CartLinesAddMutationVariables,
} from "@/generated/shopifySchemaTypes";

const client = createShopifyApolloClient();

/**
 * Add items to cart
 */
export async function cartLinesAdd(
  cartId: string,
  lines: CartLinesAddMutationVariables["lines"],
): Promise<CartLinesAddMutation["cartLinesAdd"]> {
  try {
    const { data } = await client.mutate<
      CartLinesAddMutation,
      CartLinesAddMutationVariables
    >({
      mutation: CartLinesAddDocument,
      variables: {
        cartId,
        lines,
      },
    });

    return data?.cartLinesAdd ?? null;
  } catch (error) {
    console.error("Error adding items to cart:", error);
    throw error;
  }
}
