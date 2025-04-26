import { getMenu } from "@/integrations/shopify/services/menuService";
import { normalizeMenuUrl } from "@/utils/normalizeMenuUrl";
import Link from "next/link";

export default async function Header() {
  const menu = await getMenu("main-menu");
  return (
    <header className="w-full border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black-900">
          Headless
        </Link>

        {/* Menu */}
        <nav className="flex space-x-6">
          {menu.items.map((item) => (
            <Link
              key={item.title}
              href={normalizeMenuUrl(item.url)}
              className="text-gray-600 hover:text-gray-900 hover:underline transition-all duration-200"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
