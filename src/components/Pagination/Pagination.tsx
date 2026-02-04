"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        Previous
      </button>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed cursor-pointer"
      >
        Next
      </button>
    </nav>
  );
};
