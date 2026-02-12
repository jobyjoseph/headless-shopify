import {
  CartBuyerIdentityUpdateDocument,
  CartBuyerIdentityUpdateMutation,
  CartBuyerIdentityUpdateMutationVariables,
  CartBuyerIdentityInput,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const cartBuyerIdentityUpdate = async (
  cartId: string,
  buyerIdentity: CartBuyerIdentityInput
): Promise<CartBuyerIdentityUpdateMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CartBuyerIdentityUpdateMutation,
      CartBuyerIdentityUpdateMutationVariables
    >({
      mutation: CartBuyerIdentityUpdateDocument,
      variables: { cartId, buyerIdentity },
    });

    if (!data) {
      throw new Error("No data returned from cartBuyerIdentityUpdate mutation");
    }

    return data;
  } catch (error) {
    console.error("Error updating cart buyer identity:", error);
  }
};
