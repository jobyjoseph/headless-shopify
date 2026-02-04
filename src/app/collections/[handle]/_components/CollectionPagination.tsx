"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@/components/Pagination/Pagination";

interface CollectionPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const CollectionPagination = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
}: CollectionPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Pagination
      currentPage={currentPage}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
};
