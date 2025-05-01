import { shopifyFetch } from "../storefrontClient";

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
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 20) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  title
                  image {
                    url
                    altText
                  }
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ cart: CartWithLines }>(query, { cartId });

  if (!data.cart) throw new Error("Cart not found");
  return data.cart;
}

export async function createCart(variantId: string) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

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

  const data = await shopifyFetch<CartCreateResponse>(query, variables);
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, variantId: string) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity: 1,
      },
    ],
  };

  const data = await shopifyFetch<CartLinesAddResponse>(query, variables);
  return data.cartLinesAdd.cart;
}
