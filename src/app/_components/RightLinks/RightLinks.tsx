import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import React from "react";
import Link from "next/link";
import { AccountLink } from "./AccountLink/AccountLink";

export const RightLinks = () => {
  return (
    <ul className="flex justify-self-end lg:col-4 gap-2 lg:gap-8">
      <li className="hidden lg:block">
        <button className="p-1">
          <HiOutlineSearch className="text-2xl" />
        </button>
      </li>
      <li className="flex justify-center items-center">
        <AccountLink />
      </li>
      <li>
        <Link href="/cart" className="p-1 block">
          <HiOutlineShoppingBag className="text-2xl" />
        </Link>
      </li>
    </ul>
  );
};
