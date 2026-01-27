import React from "react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="border-box px-5 py-8 lg:px-10 min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
          Create Account
        </h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-gray-900">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="John"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-gray-900">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="border border-gray-200 px-4 py-2 text-gray-900 focus:outline-none focus:border-gray-400"
              placeholder="Doe"
              required
            />
          </div>
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
          <button
            type="submit"
            className="mt-4 bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors cursor-pointer uppercase"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-gray-500 font-light">
            Already have an account?{" "}
            <Link
              href="/account/login"
              className="text-gray-600 hover:text-gray-900 font-light"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
