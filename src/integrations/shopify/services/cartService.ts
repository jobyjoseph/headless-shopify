import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import getCartQuery from "./graphql/cart.graphql";
import addToCartMutation from "./graphql/addToCart.graphql";
import createCartMutation from "./graphql/createCart.graphql";

// Types
interface Cart {
  id: string;
  checkoutUrl: string;
}

interface UserError {
  field: string[];
  message: string;
}

// Shopify GraphQL responses
interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
    userErrors: UserError[];
  };
}

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: UserError[];
  };
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    product: {
      title: string;
    };
    title: string;
    image: {
      url: string;
      altText: string | null;
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

interface CartWithLines {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: { node: CartLine }[];
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export async function getCart(cartId: string): Promise<CartWithLines> {
  const data = await shopifyFetch<{ cart: CartWithLines }>(
    print(getCartQuery),
    { cartId }
  );

  if (!data.cart) throw new Error("Cart not found");
  return data.cart;
}

export async function createCart(variantId: string) {
  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1,
        },
      ],
    },
  };

  const data = await shopifyFetch<CartCreateResponse>(
    print(createCartMutation),
    variables
  );
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string) {
  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity: 1,
      },
    ],
  };

  const data = await shopifyFetch<CartLinesAddResponse>(
    print(addToCartMutation),
    variables
  );
  return data.cartLinesAdd.cart;
}
