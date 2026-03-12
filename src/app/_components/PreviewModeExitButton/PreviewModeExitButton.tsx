"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./PreviewModeExitButton.module.scss";

export function PreviewModeExitButton() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const disableUrl = useMemo(() => {
    const query = searchParams.toString();
    const currentPath = query ? `${pathname}?${query}` : pathname;
    return `/api/draft/disable?path=${encodeURIComponent(currentPath)}`;
  }, [pathname, searchParams]);

  return (
    <a
      href={disableUrl}
      className={`fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors ${styles.animatedBorder}`}
    >
      Exit Preview
    </a>
  );
}
