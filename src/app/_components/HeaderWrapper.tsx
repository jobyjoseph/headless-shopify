import { getMenu } from "@/integrations/shopify/services/menuService";
import { getCart } from "@/integrations/shopify/services/cartService";
import HeaderClient from "./HeaderClient";
import { cookies } from "next/headers";

export default async function HeaderWrapper() {
  let menu = null;
  let cartItemCount = 0;

  try {
    // Fetch main menu - adjust handle as needed for your Shopify store
    menu = await getMenu("main-menu");
  } catch (error) {
    console.error("Error fetching menu:", error);
  }

  // Get cart item count from cookie if available
  const cartId = cookies().get("shopify_cart_id")?.value;
  if (cartId) {
    try {
      const cart = await getCart(cartId);
      cartItemCount = cart.lines.edges.reduce((sum, { node }) => sum + node.quantity, 0);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  return <HeaderClient menu={menu} initialCartCount={cartItemCount} />;
}