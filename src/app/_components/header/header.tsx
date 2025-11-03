import React from "react";

import Logo from "../logo/logo";
import DesktopMainMenu from "../desktop-main-menu/desktop-main-menu";
import MobileLeftLinks from "../mobile-left-links/mobile-left-links";
import RightLinks from "../right-links/right-links";

const Header = () => {
  return (
    <header className="border-box border-b border-gray-200 px-5 py-4 lg:px-10  grid grid-cols-[1fr_auto_1fr] lg:grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <MobileLeftLinks />
      <Logo />
      <DesktopMainMenu />
      <RightLinks />
    </header>
  );
};

export default Header;
