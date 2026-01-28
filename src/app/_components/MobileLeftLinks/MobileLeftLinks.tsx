import { HiMenu } from "react-icons/hi";
import React from "react";
import { SearchLink } from "../RightLinks/SearchLink/SearchLink";

export const MobileLeftLinks = () => {
  return (
    <ul className="flex lg:hidden">
      <li>
        <button className="p-1">
          <HiMenu className="text-2xl" />
        </button>
      </li>
      <li className="relative">
        <SearchLink variant="mobile" />
      </li>
    </ul>
  );
};
