import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { shopifyAuthPlugin } from "@/lib/shopify-auth-plugin";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies(), shopifyAuthPlugin()],
});
