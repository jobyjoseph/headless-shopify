import { shopifyStorefrontClient } from "@/lib/shopify/client/storefront-client";
import { getSession } from "next-auth/react";

const GET_CUSTOMER_QUERY = `
query GetCustomer($customerAccessToken: String!) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    firstName
    lastName
    email
  }
}
`;

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    console.log(session?.user.accessToken);

    if (!session?.user.accessToken) {
      throw new Error("No customer access token found");
    }

    const response = await shopifyStorefrontClient.query(GET_CUSTOMER_QUERY, {
      customerAccessToken: session?.user.accessToken,
    });

    return response.customer;
  } catch (error) {
    console.log("Error fetching current user:", error);
  }
};
