import { createAuthClient } from "better-auth/react";
import { shopifyAuthClientPlugin } from "@/lib/shopify-auth-client";

export const authClient = createAuthClient({
  plugins: [shopifyAuthClientPlugin()],
});
