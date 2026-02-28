"use client";

import React, { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const result = await authClient.shopifyForgotPassword({ email });

      const shopifyError = (result as { error?: { message?: string } })?.error
        ?.message;
      if (shopifyError) {
        setError(shopifyError || "Unable to send password reset email.");
        return;
      }

      const shopifyData = (result as { data?: { ok?: boolean } })?.data;
      if (!shopifyData?.ok) {
        setError("Unable to send password reset email.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Unable to send password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-center mb-8 font-light">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            <p className="text-sm">
              If an account exists with this email, you will receive a password
              reset link shortly.
            </p>
          </div>
        ) : (
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

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-6 flex flex-col items-center gap-4">
          <Link
            href="/account/login"
            className="text-gray-600 hover:text-gray-900 font-light"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
