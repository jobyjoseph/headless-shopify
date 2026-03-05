import Multipassify from "multipassify";

export const SHOPIFY_MULTIPASS_SECRET = process.env.SHOPIFY_MULTIPASS_SECRET;

export function generateMultipassToken(email: string): string {
  if (!SHOPIFY_MULTIPASS_SECRET) {
    throw new Error("SHOPIFY_MULTIPASS_SECRET is not configured.");
  }

  const multipassify = new Multipassify(SHOPIFY_MULTIPASS_SECRET);

  return multipassify.encode({ email });
}
