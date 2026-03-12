import "dotenv/config";
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
    "./src/generated/shopifyAdminSchemaTypes.ts": {
      plugins: ["typescript", "typescript-operations", "typed-document-node"],
      documents: "src/integrations/shopify-admin/**/*.admin.shopify.graphql",
      schema: {
        [process.env.SHOPIFY_ADMIN_GRAPHQL_ENDPOINT]: {
          headers: {
            "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
        },
      },
    },
  },
};

export default config;
