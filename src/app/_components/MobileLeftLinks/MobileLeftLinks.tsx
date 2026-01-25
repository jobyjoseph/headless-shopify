import { HiOutlineSearch, HiMenu } from "react-icons/hi";
import React from "react";

export const MobileLeftLinks = () => {
  return (
    <ul className="flex lg:hidden">
      <li>
        <button className="p-1">
          <HiMenu className="text-2xl" />
        </button>
      </li>
      <li>
        <button className="p-1 ml-2">
          <HiOutlineSearch className="text-2xl" />
        </button>
      </li>
    </ul>
  );
};
