import type { BetterAuthClientPlugin } from "better-auth/client";
import type { BetterFetchOption } from "@better-fetch/fetch";

import type {
  shopifyAuthPlugin,
  ShopifySignInInput,
  ShopifySignUpInput,
} from "@/lib/shopify-auth-plugin";

export const shopifyAuthClientPlugin = () => {
  return {
    id: "shopify-auth",
    $InferServerPlugin: {} as ReturnType<typeof shopifyAuthPlugin>,
    getActions: ($fetch) => {
      return {
        shopifySignIn: async (
          data: ShopifySignInInput,
          fetchOptions?: BetterFetchOption,
        ) => {
          return $fetch("/shopify-auth/sign-in", {
            method: "POST",
            body: data,
            ...fetchOptions,
          });
        },
        shopifySignUp: async (
          data: ShopifySignUpInput,
          fetchOptions?: BetterFetchOption,
        ) => {
          return $fetch("/shopify-auth/sign-up", {
            method: "POST",
            body: data,
            ...fetchOptions,
          });
        },
      };
    },
  } satisfies BetterAuthClientPlugin;
};
