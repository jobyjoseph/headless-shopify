import { Menu } from "@/generated/shopifySchemaTypes";
import { shopifyFetch } from "../storefrontClient";
import menuQuery from "./graphql/menu.graphql";
import { print } from "graphql";

export async function getMenu(handle: string): Promise<Menu> {
  const data = await shopifyFetch<{ menu: Menu }>(print(menuQuery), { handle });

  return data.menu;
}
