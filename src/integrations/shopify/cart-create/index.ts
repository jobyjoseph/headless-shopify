import createShopifyApolloClient from "../shopify-apollo-client";
import {
  CreateCartDocument,
  CreateCartMutation,
  CreateCartMutationVariables,
} from "@/generated/shopifySchemaTypes";

const client = createShopifyApolloClient();

/**
 * Create a new cart
 */
export async function createCart(): Promise<CreateCartMutation["cartCreate"]> {
  try {
    const { data } = await client.mutate<
      CreateCartMutation,
      CreateCartMutationVariables
    >({
      mutation: CreateCartDocument,
      variables: {
        input: {},
      },
    });
    
    return data?.cartCreate ?? null;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}
