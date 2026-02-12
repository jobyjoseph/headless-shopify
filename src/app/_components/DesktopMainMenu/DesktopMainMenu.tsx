import Link from "next/link";
import { normalizeMenuUrl } from "@/utils/normalizeMenuUrl";

interface MenuItem {
  id: string;
  title: string;
  url: string;
}

interface DesktopMainMenuProps {
  menuItems: MenuItem[];
}

export const DesktopMainMenu = ({ menuItems }: DesktopMainMenuProps) => {
  return (
    <ul className="hidden lg:flex justify-self-start gap-8 text-lg">
      {menuItems.map((item) => (
        <li key={item.id}>
          <Link href={normalizeMenuUrl(item.url)}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};
