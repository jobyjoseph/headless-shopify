import React from "react";
import { AccountLink } from "./AccountLink/AccountLink";
import { SearchLink } from "./SearchLink/SearchLink";
import { CartLink } from "./CartLink/CartLink";

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
        <CartLink />
      </li>
    </ul>
  );
};
