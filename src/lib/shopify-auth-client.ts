import type { BetterAuthClientPlugin } from "better-auth/client";
import type { BetterFetchOption } from "@better-fetch/fetch";

import type {
  shopifyAuthPlugin,
  ShopifySignInInput,
  ShopifySignUpInput,
  ShopifyForgotPasswordInput,
  ShopifyResetPasswordInput,
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
        shopifyForgotPassword: async (
          data: ShopifyForgotPasswordInput,
          fetchOptions?: BetterFetchOption,
        ) => {
          return $fetch("/shopify-auth/forgot-password", {
            method: "POST",
            body: data,
            ...fetchOptions,
          });
        },
        shopifyResetPassword: async (
          data: ShopifyResetPasswordInput,
          fetchOptions?: BetterFetchOption,
        ) => {
          return $fetch("/shopify-auth/reset-password", {
            method: "POST",
            body: data,
            ...fetchOptions,
          });
        },
      };
    },
  } satisfies BetterAuthClientPlugin;
};
