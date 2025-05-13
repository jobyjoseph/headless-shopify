import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: {
    "https://snow-ski-poc.myshopify.com/api/2025-04/graphql.json": {
      headers: {
        "X-Shopify-Storefront-Access-Token": "4e113b8b80348887bca630d0b19f2ab3",
        "Content-Type": "application/json",
      },
    },
  },
  generates: {
    "./src/generated/shopifySchemaTypes.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
