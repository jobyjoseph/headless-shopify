import ThemeProvider from "@/context/theme-provider";
import * as React from "react";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/header/header";
import "./global.scss";
import AuthModal from "./_components/auth-modal/auth-modal";
import { SessionProvider } from "next-auth/react";

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
          <AuthModal />
        </SessionProvider>
      </body>
    </html>
  );
}
