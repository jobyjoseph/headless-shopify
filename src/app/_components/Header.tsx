"use client";
import { useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          MyStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <Link href="/collections/all" className="hover:text-blue-600">
                All Products
              </Link>
            </li>
            <li className="group relative">
              <button className="hover:text-blue-600">Men</button>
              <ul className="absolute left-0 mt-2 bg-white shadow rounded p-2 w-40 hidden group-hover:block">
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/collections/mens-t-shirts">T-Shirts</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/collections/mens-jackets">Jackets</Link>
                </li>
              </ul>
            </li>
            <li className="group relative">
              <button className="hover:text-blue-600">Women</button>
              <ul className="absolute left-0 mt-2 bg-white shadow rounded p-2 w-40 hidden group-hover:block">
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/collections/womens-dresses">Dresses</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
                  <Link href="/collections/womens-shoes">Shoes</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/collections/sale" className="hover:text-blue-600">
                Sale
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search */}
        <SearchBar className="hidden lg:block flex-1 mx-6 max-w-md" />

        {/* Account & Cart */}
        <div className="flex items-center gap-4">
          <Link
            href="/account"
            className="hidden lg:flex items-center gap-1 text-sm hover:text-blue-600"
          >
            <User size={18} />
            My Account
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              2
            </span>
          </Link>
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
          <SearchBar />
          <ul className="space-y-2 text-sm font-medium">
            <li className="border-b pb-2">
              <Link href="/collections/all">All Products</Link>
            </li>
            <li className="border-b pb-2">Men</li>
            <li className="border-b pb-2">Women</li>
            <li className="border-b pb-2">
              <Link href="/collections/sale">Sale</Link>
            </li>
            <li className="border-b pb-2">
              <Link href="/account">My Account</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}