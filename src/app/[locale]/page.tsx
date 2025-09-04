"use client";

import { useThemeConfig } from "@/context/theme-provider";

export default function Page() {
  const config = useThemeConfig();
  return <h1>Home page {config}</h1>;
}
