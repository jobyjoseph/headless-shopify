"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { getCartId } from "@/utils/cart";
import { getCart } from "@/integrations/shopify/services/cartService";
import { normalizeMenuUrl } from "@/utils/normalizeMenuUrl";

interface MenuItem {
  id: string;
  title: string;
  url?: string | null;
  items: MenuItem[];
}

interface HeaderClientProps {
  menu?: {
    items: MenuItem[];
  } | null;
  initialCartCount?: number;
}

export default function HeaderClient({ menu, initialCartCount = 0 }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(initialCartCount);

  useEffect(() => {
    // Update cart count when cart changes
    const updateCartCount = async () => {
      const cartId = getCartId();
      if (cartId) {
        try {
          const cart = await getCart(cartId);
          const count = cart.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0);
          setCartCount(count);
        } catch (error) {
          console.error("Error fetching cart count:", error);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    
    // Listen for cart updates
    const interval = setInterval(updateCartCount, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.items && item.items.length > 0;
    const url = item.url ? normalizeMenuUrl(item.url) : "#";

    if (hasChildren) {
      return (
        <li key={item.id} className="group relative">
          <button className="hover:text-blue-600">{item.title}</button>
          <ul className="absolute left-0 mt-2 bg-white shadow rounded p-2 w-48 hidden group-hover:block z-50">
            {item.items.map((child) => (
              <li key={child.id} className="p-2 hover:bg-gray-100">
                <Link href={child.url ? normalizeMenuUrl(child.url) : "#"}>
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.id}>
        <Link href={url} className="hover:text-blue-600">
          {item.title}
        </Link>
      </li>
    );
  };

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
            {menu ? (
              menu.items.map(renderMenuItem)
            ) : (
              // Fallback navigation if menu fetch fails
              <>
                <li>
                  <Link href="/collections/all" className="hover:text-blue-600">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/collections/sale" className="hover:text-blue-600">
                    Sale
                  </Link>
                </li>
              </>
            )}
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
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
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
            {menu ? (
              menu.items.map((item) => (
                <li key={item.id} className="border-b pb-2">
                  <Link href={item.url ? normalizeMenuUrl(item.url) : "#"}>
                    {item.title}
                  </Link>
                </li>
              ))
            ) : (
              <>
                <li className="border-b pb-2">
                  <Link href="/collections/all">All Products</Link>
                </li>
                <li className="border-b pb-2">
                  <Link href="/collections/sale">Sale</Link>
                </li>
              </>
            )}
            <li className="border-b pb-2">
              <Link href="/account">My Account</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}