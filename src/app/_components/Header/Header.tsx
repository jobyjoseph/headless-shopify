import React from "react";

import { Logo } from "../Logo/Logo";
import { DesktopMainMenu } from "../DesktopMainMenu/DesktopMainMenu";
import { MobileLeftLinks } from "../MobileLeftLinks/MobileLeftLinks";
import { RightLinks } from "../RightLinks/RightLinks";
import { getMenu } from "@/integrations/shopify/menu";

export const Header = async () => {
  const menuData = await getMenu({ handle: "main-menu" });
  const menuItems =
    menuData?.menu?.items.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.url,
    })) || [];

  return (
    <header className="border-box border-b border-gray-200 px-5 py-4 lg:px-10  grid grid-cols-[1fr_auto_1fr] lg:grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <MobileLeftLinks menuItems={menuItems} />
      <Logo />
      <DesktopMainMenu menuItems={menuItems} />
      <RightLinks />
    </header>
  );
};
