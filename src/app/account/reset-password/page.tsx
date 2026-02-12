import React from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Reset Password
        </h1>
        <p className="text-gray-500 text-center mb-8 font-light">
          Enter your new password below.
        </p>
        <form className="flex flex-col gap-4">
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
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase"
          >
            Reset Password
          </button>
        </form>
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
