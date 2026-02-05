import createShopifyApolloClient from "../shopify-apollo-client";
import {
  CartLinesRemoveDocument,
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
} from "@/generated/shopifySchemaTypes";

const client = createShopifyApolloClient();

/**
 * Remove cart lines
 */
export async function cartLinesRemove(
  cartId: string,
  lineIds: CartLinesRemoveMutationVariables["lineIds"],
): Promise<CartLinesRemoveMutation["cartLinesRemove"]> {
  try {
    const { data } = await client.mutate<
      CartLinesRemoveMutation,
      CartLinesRemoveMutationVariables
    >({
      mutation: CartLinesRemoveDocument,
      variables: {
        cartId,
        lineIds,
      },
    });

    return data?.cartLinesRemove ?? null;
  } catch (error) {
    console.error("Error removing cart lines:", error);
    throw error;
  }
}
