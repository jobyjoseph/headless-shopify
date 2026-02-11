import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import * as z from "zod";

import { customerAccessTokenCreate } from "@/integrations/shopify/customer-access-token-create";
import { customerCreate } from "@/integrations/shopify/customer-create";

export type ShopifySignInInput = {
  email: string;
  password: string;
};

export type ShopifySignUpInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
  autoSignIn?: boolean;
};

const SHOPIFY_CUSTOMER_TOKEN_COOKIE = "shopifyCustomerAccessToken";

const signInSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
});

const signUpSchema = z.object({
  email: z.email().min(1),
  password: z.string().min(1),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  acceptsMarketing: z.boolean().optional(),
  autoSignIn: z.boolean().optional(),
});

export const shopifyAuthPlugin = () => {
  return {
    id: "shopify-auth",
    endpoints: {
      signIn: createAuthEndpoint(
        "/shopify-auth/sign-in",
        {
          method: "POST",
          body: signInSchema,
        },
        async (ctx) => {
          const { email, password } = ctx.body;

          const result = await customerAccessTokenCreate({ email, password });

          if (!result) {
            throw new APIError("BAD_REQUEST", {
              message: "Shopify sign-in failed.",
            });
          }

          const payload = result.customerAccessTokenCreate;
          const userErrors = payload?.customerUserErrors ?? [];
          const token = payload?.customerAccessToken?.accessToken;
          const expiresAt = payload?.customerAccessToken?.expiresAt;

          if (userErrors.length || !token) {
            throw new APIError("UNAUTHORIZED", {
              message: userErrors[0]?.message || "Invalid email or password.",
            });
          }

          ctx.setCookie(SHOPIFY_CUSTOMER_TOKEN_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: expiresAt ? new Date(expiresAt) : undefined,
          });

          return ctx.json({ ok: true });
        },
      ),
      signUp: createAuthEndpoint(
        "/shopify-auth/sign-up",
        {
          method: "POST",
          body: signUpSchema,
        },
        async (ctx) => {
          const {
            email,
            password,
            firstName,
            lastName,
            acceptsMarketing,
            autoSignIn,
          } = ctx.body;

          const result = await customerCreate({
            email,
            password,
            firstName,
            lastName,
            acceptsMarketing,
          });

          if (!result) {
            throw new APIError("BAD_REQUEST", {
              message: "Shopify sign-up failed.",
            });
          }

          const payload = result.customerCreate;
          const userErrors = payload?.customerUserErrors ?? [];
          const customer = payload?.customer;

          if (userErrors.length || !customer) {
            throw new APIError("BAD_REQUEST", {
              message: userErrors[0]?.message || "Unable to create customer.",
            });
          }

          if (autoSignIn) {
            const signInResult = await customerAccessTokenCreate({
              email,
              password,
            });

            if (!signInResult) {
              throw new APIError("UNAUTHORIZED", {
                message: "Unable to sign in after signup.",
              });
            }

            const signInPayload = signInResult.customerAccessTokenCreate;
            const signInErrors = signInPayload?.customerUserErrors ?? [];
            const token = signInPayload?.customerAccessToken?.accessToken;
            const expiresAt = signInPayload?.customerAccessToken?.expiresAt;

            if (signInErrors.length || !token) {
              throw new APIError("UNAUTHORIZED", {
                message:
                  signInErrors[0]?.message || "Unable to sign in after signup.",
              });
            }

            ctx.setCookie(SHOPIFY_CUSTOMER_TOKEN_COOKIE, token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
              expires: expiresAt ? new Date(expiresAt) : undefined,
            });

            return ctx.json({
              customer,
              ok: true,
            });
          }

          return ctx.json({ customer });
        },
      ),
    },
  } satisfies BetterAuthPlugin;
};
