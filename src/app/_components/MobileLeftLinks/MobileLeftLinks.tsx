import React from "react";
import { SearchLink } from "../RightLinks/SearchLink/SearchLink";
import { MobileMainMenu } from "../MobileMainMenu/MobileMainMenu";

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface MobileLeftLinksProps {
  menuItems: MenuItem[];
}

export const MobileLeftLinks = ({ menuItems }: MobileLeftLinksProps) => {
  return (
    <ul className="flex lg:hidden">
      <li>
        <MobileMainMenu menuItems={menuItems} />
      </li>
      <li className="relative">
        <SearchLink variant="mobile" />
      </li>
    </ul>
  );
};
