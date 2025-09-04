import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { shopifyFetch, MUTATION_LOGIN } from "@/lib/shopify";
import { ZodError } from "zod";
import { signInSchema } from "./zod";

type ShopifyToken = {
  accessToken: string;
  expiresAt: string;
};

const config: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * Handles the custom login logic and determines whether the credentials provided are valid.
       * @param {object} creds - The credentials object containing user input values
       * @returns {Promise<object|null>} A user object if credentials are valid, null if login fails
       */
      async authorize(creds) {
        try {
          const { email, password } = await signInSchema.parseAsync(creds);

          const { data } = await shopifyFetch<{
            customerAccessTokenCreate: {
              customerAccessToken: ShopifyToken | null;
              userErrors: { message: string }[];
            };
          }>(MUTATION_LOGIN, {
            input: {
              email,
              password,
            },
          });

          const payload = data?.customerAccessTokenCreate;
          const token = payload.customerAccessToken;
          const err = payload.userErrors?.[0]?.message;

          if (!token) {
            return null;
          }

          return {
            accessToken: token.accessToken,
            email,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      session.user.accessToken = token.accessToken
        ? String(token.accessToken)
        : "";
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
export default config;
