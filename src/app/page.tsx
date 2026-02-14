import React from "react";
import Link from "next/link";
import {
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiOutlineChatAlt2,
} from "react-icons/hi";
import Image from "next/image";
import { getFeaturedProducts } from "@/integrations/shopify/featured-products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(8);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-10" />
        <div className="absolute inset-0 bg-[url('https://plus.unsplash.com/premium_photo-1675186049222-0b5018db6ce9?w=1920&q=80&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-20 text-center text-white px-5 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Our Latest Collection
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Curated styles for the modern lifestyle. Quality craftsmanship meets
            timeless design.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-white text-gray-900 px-8 pt-[14px] pb-[10px] text-sm font-medium uppercase tracking-wide hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 px-5 lg:px-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "New Arrivals",
              href: "/collections",
              bg: "bg-stone-200",
              accent: "bg-rose-50",
            },
            {
              title: "Best Sellers",
              href: "/collections",
              bg: "bg-stone-300",
              accent: "bg-amber-50",
            },
            {
              title: "Sale",
              href: "/collections",
              bg: "bg-stone-200",
              accent: "bg-stone-100",
            },
          ].map((collection) => (
            <Link
              key={collection.title}
              href={collection.href}
              className="group relative h-80 overflow-hidden"
            >
              <div
                className={`absolute inset-0 ${collection.bg} group-hover:scale-105 transition-transform duration-700`}
              />
              <div
                className={`absolute inset-0 ${collection.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-stone-700 text-lg font-medium uppercase tracking-widest group-hover:text-stone-900 transition-colors duration-300">
                  {collection.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-5 lg:px-10 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-gray-200 mb-3 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-block border border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-gray-900 hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 px-5 lg:px-10 bg-gray-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-semibold mb-4">
            Subscribe & Save 10%
          </h2>
          <p className="text-gray-300 mb-8">
            Join our newsletter for exclusive offers, new arrivals, and styling
            tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-gray-900 font-medium uppercase text-sm tracking-wide hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-5 lg:px-10 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
          {[
            {
              icon: HiOutlineTruck,
              title: "Free Shipping",
              desc: "On orders over $50",
            },
            {
              icon: HiOutlineRefresh,
              title: "Easy Returns",
              desc: "30-day return policy",
            },
            {
              icon: HiOutlineShieldCheck,
              title: "Secure Payment",
              desc: "100% secure checkout",
            },
            {
              icon: HiOutlineChatAlt2,
              title: "24/7 Support",
              desc: "Dedicated support",
            },
          ].map((badge) => (
            <div key={badge.title}>
              <div className="flex justify-center mb-2">
                <badge.icon className="w-8 h-8 text-stone-600" />
              </div>
              <h3 className="font-medium text-gray-900">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
