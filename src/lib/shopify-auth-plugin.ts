import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint } from "better-auth/api";
import * as z from "zod";

import { customerAccessTokenCreate } from "@/integrations/shopify/customer-access-token-create";
import { customerCreate } from "@/integrations/shopify/customer-create";
import { customerRecover } from "@/integrations/shopify/customer-recover";
import { customerResetByUrl } from "@/integrations/shopify/customer-reset-by-url";

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

export type ShopifyForgotPasswordInput = {
  email: string;
};

export type ShopifyResetPasswordInput = {
  password: string;
  resetUrl: string;
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

const forgotPasswordSchema = z.object({
  email: z.email().min(1),
});

const resetPasswordSchema = z.object({
  password: z.string().min(5),
  resetUrl: z.string().min(1),
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
      forgotPassword: createAuthEndpoint(
        "/shopify-auth/forgot-password",
        {
          method: "POST",
          body: forgotPasswordSchema,
        },
        async (ctx) => {
          const { email } = ctx.body;

          const result = await customerRecover(email);

          if (!result) {
            throw new APIError("BAD_REQUEST", {
              message: "Unable to send password reset email.",
            });
          }

          const payload = result.customerRecover;
          const userErrors = payload?.customerUserErrors ?? [];

          if (userErrors.length) {
            throw new APIError("BAD_REQUEST", {
              message:
                userErrors[0]?.message ||
                "Unable to send password reset email.",
            });
          }

          return ctx.json({ ok: true });
        },
      ),
      resetPassword: createAuthEndpoint(
        "/shopify-auth/reset-password",
        {
          method: "POST",
          body: resetPasswordSchema,
        },
        async (ctx) => {
          const { password, resetUrl } = ctx.body;

          const result = await customerResetByUrl(password, resetUrl);

          if (!result) {
            throw new APIError("BAD_REQUEST", {
              message: "Unable to reset password.",
            });
          }

          const payload = result.customerResetByUrl;
          const userErrors = payload?.customerUserErrors ?? [];
          const token = payload?.customerAccessToken?.accessToken;
          const expiresAt = payload?.customerAccessToken?.expiresAt;

          if (userErrors.length || !token) {
            throw new APIError("BAD_REQUEST", {
              message: userErrors[0]?.message || "Unable to reset password.",
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
    },
  } satisfies BetterAuthPlugin;
};
