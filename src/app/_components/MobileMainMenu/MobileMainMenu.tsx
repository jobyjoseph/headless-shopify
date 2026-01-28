"use client";
import { HiMenu, HiX } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export const MobileMainMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        className="p-1 cursor-pointer"
        onClick={() => setIsMenuOpen(true)}
      >
        <HiMenu className="text-2xl" />
      </button>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className="text-lg font-medium">Menu</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-1 cursor-pointer"
            >
              <HiX className="text-2xl" />
            </button>
          </div>
          <nav className="flex-1 p-4">
            <ul className="flex flex-col gap-4 text-lg">
              <li>
                <Link
                  href="/collections/women"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/men"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/kids"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/accessories"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
