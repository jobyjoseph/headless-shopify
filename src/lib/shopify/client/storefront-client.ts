interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

class ShopifyStorefrontClient {
  private endpoint: string;
  private headers: Record<string, string>;

  constructor() {
    this.endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/${process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;
    this.headers = {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    };
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    console.log(variables);
    try {
      console.log(this.endpoint);
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Shopify API Error: ${response.status} ${response.statusText}`
        );
      }

      const result: ShopifyResponse<T> = await response.json();

      if (result.errors && result.errors.length > 0) {
        throw new Error(`GraphQL Error: ${result.errors[0].message}`);
      }

      return result.data;
    } catch (error) {
      console.error("Shopify storefront API Error", error);
      throw error;
    }
  }
}

export const shopifyStorefrontClient = new ShopifyStorefrontClient();
