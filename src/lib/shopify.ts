export type ShopifyGraphQLError = {
  message: string;
  field?: string[];
};

export const shopifyFetch = async <T>(
  query: string,
  variables?: Record<string, any>
): Promise<{ data: T; errors?: ShopifyGraphQLError[] }> => {
  console.log("inside shopify fetch");
  const res = await fetch(
    `https://${process.env.SHOPIFY_STOREFRONT_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Shopify fetch failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return json;
};

export const MUTATION_LOGIN = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                message
                field
            }
        }
    }
`;
