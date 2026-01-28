import React from "react";
import { SearchLink } from "../RightLinks/SearchLink/SearchLink";
import { MobileMainMenu } from "../MobileMainMenu/MobileMainMenu";

export const MobileLeftLinks = () => {
  return (
    <ul className="flex lg:hidden">
      <li>
        <MobileMainMenu />
      </li>
      <li className="relative">
        <SearchLink variant="mobile" />
      </li>
    </ul>
  );
};
