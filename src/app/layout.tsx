import * as React from "react";
import { Josefin_Sans } from "next/font/google";
import ThemeProvider from "@/context/theme-provider";
import { SessionProvider } from "next-auth/react";
import "./global.scss";
import { Header } from "./_components/Header/Header";
import { Footer } from "./_components/Footer/Footer";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={josefinSans.className}>
        <SessionProvider>
          <Header />
          <ThemeProvider>{children}</ThemeProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
