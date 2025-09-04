import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi";
import React from "react";
import AccountLink from "./account-link/account-link";

const RightLinks = () => {
  return (
    <ul className="flex justify-self-end lg:col-4 gap-2 lg:gap-8">
      <li className="hidden lg:block">
        <button className="p-1">
          <HiOutlineSearch className="text-2xl" />
        </button>
      </li>
      <li>
        <button className="p-1">
          <HiOutlineHeart className="text-2xl" />
        </button>
      </li>
      <li>
        <button className="p-1">
          <HiOutlineShoppingBag className="text-2xl" />
        </button>
      </li>
      <li className="flex justify-center items-center">
        <AccountLink />
      </li>
    </ul>
  );
};

export default RightLinks;
