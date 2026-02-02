import type { ProductQuery } from "@/generated/shopifySchemaTypes";

/**
 * Extracts the style ID from product tags
 * Tags are in the format "style:<styleid>"
 */
export function extractStyleId(tags?: string[]): string | null {
  if (!tags) return null;

  const styleTag = tags.find((tag) => tag.startsWith("style:"));
  if (!styleTag) return null;

  return styleTag.replace("style:", "");
}

/**
 * Extracts the current product's color from its options
 */
export function extractCurrentProductColor(
  product: ProductQuery["product"],
): string | null {
  if (!product?.options) return null;

  const colorOption = product.options.find(
    (option) =>
      option.name.toLowerCase() === "color" ||
      option.name.toLowerCase() === "colour",
  );

  // Return the first color value if exists
  return colorOption?.optionValues?.[0]?.name || null;
}
