import { createAuthClient } from "better-auth/react";
import { shopifyAuthClientPlugin } from "@/lib/shopify-auth-client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  plugins: [shopifyAuthClientPlugin()],
});
