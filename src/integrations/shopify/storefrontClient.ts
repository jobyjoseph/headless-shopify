const SHOPIFY_GRAPHQL_ENDPOINT: string =
  process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_ENDPOINT!;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(SHOPIFY_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(
      "Shopify Storefront API errors:",
      JSON.stringify(json.errors, null, 2)
    );
    throw new Error("Shopify Storefront API Error");
  }

  return json.data;
}
