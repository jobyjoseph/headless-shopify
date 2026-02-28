"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get the full reset URL from query params
    const url = searchParams.get("url");
    if (url) {
      setResetUrl(decodeURIComponent(url));
    } else {
      setError("Invalid or missing reset link.");
    }
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters.");
      setLoading(false);
      return;
    }

    if (!resetUrl) {
      setError("Invalid reset link.");
      setLoading(false);
      return;
    }

    try {
      const result = await authClient.shopifyResetPassword({
        password,
        resetUrl,
      });

      const shopifyError = (result as { error?: { message?: string } })?.error
        ?.message;
      if (shopifyError) {
        setError(shopifyError || "Unable to reset password.");
        return;
      }

      const shopifyData = (result as { data?: { ok?: boolean } })?.data;
      if (!shopifyData?.ok) {
        setError("Unable to reset password.");
        return;
      }

      setSuccess(true);
      // Redirect to home page after successful reset
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch {
      setError("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!resetUrl && !error) {
    return (
      <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Reset Password
        </h1>
        <p className="text-gray-500 text-center mb-8 font-light">
          Enter your new password below.
        </p>

        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            <p className="text-sm">
              Your password has been reset successfully! Redirecting...
            </p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-900">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="••••••••"
                minLength={5}
                required
                disabled={!resetUrl}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-gray-900">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
                placeholder="••••••••"
                minLength={5}
                required
                disabled={!resetUrl}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !resetUrl}
              className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
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
