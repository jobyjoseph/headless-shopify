import React from "react";
import Link from "next/link";
import { Logo } from "../Logo/Logo";

export const Footer = () => {
  return (
    <footer className="border-box border-t border-gray-200 px-5 py-4 lg:px-10">
      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-gray-500 lg:absolute lg:left-1/2 lg:-translate-x-1/2 order-last lg:order-none">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
};
