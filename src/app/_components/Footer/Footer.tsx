import React from "react";
import Link from "next/link";
import { Logo } from "../Logo/Logo";

export const Footer = () => {
  return (
    <footer className="border-box border-t border-gray-200 px-5 py-4 lg:px-10 flex flex-col items-center gap-4">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        <Logo />
        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Terms
          </Link>
        </nav>
      </div>
      <p className="text-sm text-gray-500 text-center w-full">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
};
