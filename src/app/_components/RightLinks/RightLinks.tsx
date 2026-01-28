import { HiOutlineShoppingBag } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import { AccountLink } from "./AccountLink/AccountLink";
import { SearchLink } from "./SearchLink/SearchLink";

export const RightLinks = () => {
  return (
    <ul className="flex justify-self-end lg:col-4 gap-2 lg:gap-8 items-center">
      <li className="hidden lg:block relative">
        <SearchLink variant="desktop" />
      </li>
      <li className="flex justify-center items-center">
        <AccountLink />
      </li>
      <li className="flex justify-center items-center">
        <Link href="/cart" className="p-1 inline-flex">
          <HiOutlineShoppingBag className="text-2xl" />
        </Link>
      </li>
    </ul>
  );
};
