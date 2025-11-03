import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createShopifyApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT,
      headers: {
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createShopifyApolloClient;
