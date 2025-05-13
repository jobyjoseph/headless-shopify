// components/Header.tsx (React with TailwindCSS)
"use client";
import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">MyStore</div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 text-sm font-medium">
            <li className="group relative">
              <button className="hover:text-blue-600">Men</button>
              <ul className="absolute left-0 mt-2 bg-white shadow rounded p-2 w-40 hidden group-hover:block">
                <li className="p-2 hover:bg-gray-100">T-Shirts</li>
                <li className="p-2 hover:bg-gray-100">Jackets</li>
              </ul>
            </li>
            <li className="group relative">
              <button className="hover:text-blue-600">Women</button>
              <ul className="absolute left-0 mt-2 bg-white shadow rounded p-2 w-40 hidden group-hover:block">
                <li className="p-2 hover:bg-gray-100">Dresses</li>
                <li className="p-2 hover:bg-gray-100">Shoes</li>
              </ul>
            </li>
            <li className="hover:text-blue-600">Sale</li>
          </ul>
        </nav>

        {/* Search */}
        <div className="hidden lg:block flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products"
            className="w-full px-4 py-2 border rounded text-sm focus:outline-none"
          />
        </div>

        {/* Account & Cart */}
        <div className="flex items-center gap-4">
          <a
            href="/account"
            className="hidden lg:flex items-center gap-1 text-sm hover:text-blue-600"
          >
            <User size={18} />
            My Account
          </a>
          <a href="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              2
            </span>
          </a>
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border rounded text-sm focus:outline-none"
          />
          <ul className="space-y-2 text-sm font-medium">
            <li className="border-b pb-2">Men</li>
            <li className="border-b pb-2">Women</li>
            <li className="border-b pb-2">Sale</li>
            <li className="border-b pb-2">My Account</li>
          </ul>
        </div>
      )}
    </header>
  );
}
