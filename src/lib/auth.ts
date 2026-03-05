import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { shopifyAuthPlugin } from "@/lib/shopify-auth-plugin";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [nextCookies(), shopifyAuthPlugin()],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
