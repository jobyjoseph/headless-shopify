"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Cookies from "js-cookie";

export default function LoginPage() {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [processedSocialEmail, setProcessedSocialEmail] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const updateCartBuyerIdentity = useCallback(async () => {
    const cartId = Cookies.get("cart_id");
    if (!cartId) {
      return;
    }

    await fetch("/api/shopify/cart-buyer-identity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId }),
    });
  }, []);

  useEffect(() => {
    const socialEmail = session?.user?.email;

    if (!socialEmail || socialEmail === processedSocialEmail) {
      return;
    }

    let cancelled = false;

    async function authenticateSocialUserWithMultipass() {
      setGoogleLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/shopify/multipass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: socialEmail }),
        });

        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        if (!response.ok) {
          throw new Error(payload.error || "Unable to sign in with Google.");
        }

        if (cancelled) {
          return;
        }

        setProcessedSocialEmail(socialEmail);
        await updateCartBuyerIdentity();
        window.location.href = "/";
      } catch (err) {
        if (cancelled) {
          return;
        }

        setError(
          err instanceof Error ? err.message : "Unable to sign in with Google.",
        );
      } finally {
        if (!cancelled) {
          setGoogleLoading(false);
        }
      }
    }

    authenticateSocialUserWithMultipass();

    return () => {
      cancelled = true;
    };
  }, [processedSocialEmail, session?.user?.email, updateCartBuyerIdentity]);

  async function onGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);

    try {
      const socialSignInResult = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/account/login",
      });

      const socialSignInError = (
        socialSignInResult as { error?: { message?: string } }
      )?.error?.message;

      if (socialSignInError) {
        setError(socialSignInError || "Unable to start Google sign in.");
      }
    } catch {
      setError("Unable to start Google sign in.");
    } finally {
      setGoogleLoading(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const shopifyAuth = await authClient.shopifySignIn({
        email,
        password,
      });

      const shopifyError = (shopifyAuth as { error?: { message?: string } })
        ?.error?.message;
      if (shopifyError) {
        setError(shopifyError || "Invalid email or password.");
        return;
      }

      const shopifyData = (shopifyAuth as { data?: { ok?: boolean } })?.data;
      if (!shopifyData?.ok) {
        setError("Invalid email or password.");
        return;
      }

      await updateCartBuyerIdentity();

      window.location.href = "/";
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8 ">
          Login
        </h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={loading || googleLoading}
            className="border border-gray-900 text-gray-900 py-3 px-4 hover:bg-gray-100 transition-colors cursor-pointer uppercase disabled:opacity-60"
          >
            {googleLoading
              ? "Signing In With Google..."
              : "Sign In with Google"}
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-4">
          <Link
            href="/account/forgot-password"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Forgot your password?
          </Link>
          <p className="text-gray-500 font-light">
            Don&apos;t have an account?{" "}
            <Link
              href="/account/register"
              className="text-gray-600 hover:text-gray-900 font-light"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
