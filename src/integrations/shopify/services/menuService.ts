import { shopifyFetch } from "../storefrontClient";

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
  console.log("menu");
  const query = `
    query getMenu($handle: String!) {
      menu(handle: $handle) {
        id
        title
        items {
          title
          url
        }
      }
    }
  `;

  const data = await shopifyFetch<{ menu: Menu }>(query, { handle });

  return data.menu;
}
