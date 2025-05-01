"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCartId } from "@/utils/cart";
import { getCart } from "@/integrations/shopify/services/cartService";

type CartLineItem = {
  id: string;
  title: string;
  quantity: number;
  price: string;
  imageUrl: string;
};

interface CartContextType {
  items: CartLineItem[];
  itemCount: number;
  checkoutUrl: string;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  checkoutUrl: "",
  refreshCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const refreshCart = async () => {
    const cartId = getCartId();
    if (!cartId) return;

    try {
      const cart = await getCart(cartId);
      const mapped = cart.lines.edges.map(({ node }) => ({
        id: node.id,
        title: node.merchandise.product.title,
        quantity: node.quantity,
        price: `${node.merchandise.price.amount} ${node.merchandise.price.currencyCode}`,
        imageUrl: node.merchandise.image?.url || "",
      }));
      setItems(mapped);
      setItemCount(mapped.reduce((sum, item) => sum + item.quantity, 0));
      setCheckoutUrl(cart.checkoutUrl);
    } catch (err) {
      console.error("Failed to refresh cart", err);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ items, itemCount, checkoutUrl, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
