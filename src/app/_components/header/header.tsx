import React from "react";

import { Logo } from "../Logo/Logo";
import { DesktopMainMenu } from "../DesktopMainMenu/DesktopMainMenu";
import { MobileLeftLinks } from "../MobileLeftLinks/MobileLeftLinks";
import { RightLinks } from "../RightLinks/RightLinks";

export const Header = () => {
  return (
    <header className="border-box border-b border-gray-200 px-5 py-4 lg:px-10  grid grid-cols-[1fr_auto_1fr] lg:grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <MobileLeftLinks />
      <Logo />
      <DesktopMainMenu />
      <RightLinks />
    </header>
  );
};
