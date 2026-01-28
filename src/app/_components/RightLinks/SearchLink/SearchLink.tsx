"use client";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchLinkProps {
  variant?: "desktop" | "mobile";
}

export const SearchLink = ({ variant = "desktop" }: SearchLinkProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (variant === "mobile" && isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, variant]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      <button
        className="p-1 cursor-pointer"
        onClick={() => setIsSearchOpen(true)}
      >
        <HiOutlineSearch className="text-2xl" />
      </button>
      {isSearchOpen && variant === "desktop" && (
        <form
          onSubmit={handleSearchSubmit}
          className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white"
        >
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="box-border border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-gray-300"
          />
          <button
            type="button"
            onClick={handleClose}
            className="p-1 cursor-pointer"
          >
            <HiX className="text-xl" />
          </button>
        </form>
      )}
      {isSearchOpen && variant === "mobile" && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-medium">Search</span>
            <button
              type="button"
              onClick={handleClose}
              className="p-1 cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className="p-4">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="flex-1 box-border border border-gray-200 px-4 py-3 text-base focus:outline-none focus:border-gray-300 rounded"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-black text-white rounded cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
