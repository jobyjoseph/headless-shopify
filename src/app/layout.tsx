import * as React from "react";
import type { Metadata, Viewport } from "next";
import { Josefin_Sans } from "next/font/google";
import ThemeProvider from "@/providers/theme-provider";
import { CartProvider } from "@/providers/cart-provider";
import "./global.scss";
import { Header } from "./_components/Header/Header";
import { Footer } from "./_components/Footer/Footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Headless Shopify Store",
  description: "A modern headless Shopify storefront",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <div className="mx-auto w-full max-w-[1590px] flex-1">
            <ThemeProvider>{children}</ThemeProvider>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
