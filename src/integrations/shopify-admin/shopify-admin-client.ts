import "server-only";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const createShopifyAdminClient = () => {
  const graphqlEndpoint = process.env.SHOPIFY_ADMIN_GRAPHQL_ENDPOINT;
  const accessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;

  if (!graphqlEndpoint || !accessToken) {
    throw new Error(
      "Missing SHOPIFY_ADMIN_GRAPHQL_ENDPOINT or SHOPIFY_ADMIN_ACCESS_TOKEN.",
    );
  }

  return new ApolloClient({
    link: new HttpLink({
      uri: graphqlEndpoint,
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      fetchOptions: {
        cache: "no-store",
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createShopifyAdminClient;
