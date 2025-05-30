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
  documents: "./src/**/*.graphql",
  generates: {
    "./src/generated/shopifySchemaTypes.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        strictScalars: true, // <-- important to avoid `any` types
        avoidOptionals: true, // optional: makes fields non-optional unless explicitly nullable
        maybeValue: "T | null", // optional: prevents `any` from being inferred on nullable types
        scalars: {
          Color: "string",
          DateTime: "string",
          Decimal: "string",
          HTML: "string",
          ISO8601DateTime: "string",
          JSON: "string",
          URL: "string",
          UnsignedInt64: "number",
        },
      },
    },
  },
};

export default config;
