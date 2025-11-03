import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/generated/shopifySchemaTypes.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      documents: "src/integrations/shopify/**/*.shopify.graphql",
      schema: {
        [process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT]: {
          headers: {
            "X-Shopify-Storefront-Access-Token":
              process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
        },
      },
    },
  },
};

export default config;
