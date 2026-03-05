import {
  CustomerAccessTokenCreateWithMultipassDocument,
  CustomerAccessTokenCreateWithMultipassMutation,
  CustomerAccessTokenCreateWithMultipassMutationVariables,
} from "@/generated/shopifySchemaTypes";
import createApolloClient from "@/integrations/shopify/shopify-apollo-client";

export const customerAccessTokenCreateWithMultipass = async (
  multipassToken: string,
): Promise<CustomerAccessTokenCreateWithMultipassMutation | undefined> => {
  try {
    const client = createApolloClient();
    const { data } = await client.mutate<
      CustomerAccessTokenCreateWithMultipassMutation,
      CustomerAccessTokenCreateWithMultipassMutationVariables
    >({
      mutation: CustomerAccessTokenCreateWithMultipassDocument,
      variables: { multipassToken },
    });

    if (!data) {
      throw new Error(
        "No data returned from customerAccessTokenCreateWithMultipass mutation",
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Error creating customer access token with multipass:",
      error,
    );
  }
};
