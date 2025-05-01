import { shopifyFetch } from "../storefrontClient";
import menuQuery from "./graphql/menu.graphql";
import { print } from "graphql";

interface MenuItem {
  title: string;
  url: string;
}

interface Menu {
  id: string;
  title: string;
  items: MenuItem[];
}

export async function getMenu(handle: string): Promise<Menu> {
  const data = await shopifyFetch<{ menu: Menu }>(print(menuQuery), { handle });

  return data.menu;
}
