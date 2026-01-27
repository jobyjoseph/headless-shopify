import Link from "next/link";

export const DesktopMainMenu = () => {
  return (
    <ul className="hidden lg:flex justify-self-start gap-8 text-lg">
      <li>
        <Link href="/collections/women">Women</Link>
      </li>
      <li>
        <Link href="/collections/men">Men</Link>
      </li>
      <li>
        <Link href="/collections/kids">Kids</Link>
      </li>
      <li>
        <Link href="/collections/accessories">Accessories</Link>
      </li>
    </ul>
  );
};
