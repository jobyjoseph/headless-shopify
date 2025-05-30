import { shopifyFetch } from "../storefrontClient";
import { print } from "graphql";
import getCartQuery from "./graphql/cart.graphql";
import addToCartMutation from "./graphql/addToCart.graphql";
import createCartMutation from "./graphql/createCart.graphql";
import { cartLinesUpdate as updateCartMutation, cartLinesRemove as removeCartMutation } from "./graphql/updateCart.graphql";
import { CartLinesUpdateMutation, CartLinesRemoveMutation } from "@/generated/shopifySchemaTypes";

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

export async function createCart(variantId: string, quantity: number = 1) {
  const variables = {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity,
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

export async function addToCart(variantId: string, quantity: number = 1, cartId?: string | null): Promise<{ cart: Cart; cartId: string }> {
  // If no cart exists, create one
  if (!cartId) {
    const cart = await createCart(variantId, quantity);
    return { cart, cartId: cart.id };
  }

  // Add to existing cart
  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity,
      },
    ],
  };

  const data = await shopifyFetch<CartLinesAddResponse>(
    print(addToCartMutation),
    variables
  );
  
  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }
  
  return { cart: data.cartLinesAdd.cart, cartId: data.cartLinesAdd.cart.id };
}

export async function updateCartItemQuantity(cartId: string, lineId: string, quantity: number) {
  const variables = {
    cartId,
    lines: [
      {
        id: lineId,
        quantity,
      },
    ],
  };

  const data = await shopifyFetch<CartLinesUpdateMutation>(
    print(updateCartMutation),
    variables
  );
  
  if (data.cartLinesUpdate?.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }
  
  return data.cartLinesUpdate?.cart;
}

export async function removeCartItem(cartId: string, lineId: string) {
  const variables = {
    cartId,
    lineIds: [lineId],
  };

  const data = await shopifyFetch<CartLinesRemoveMutation>(
    print(removeCartMutation),
    variables
  );
  
  if (data.cartLinesRemove?.userErrors && data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }
  
  return data.cartLinesRemove?.cart;
}
