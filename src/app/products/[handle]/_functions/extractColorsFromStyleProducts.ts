import type { ProductsByTagQuery } from "@/generated/shopifySchemaTypes";

interface ColorOption {
  name: string;
  value: string;
  handle: string; // Handle of the product with this color
}

// Color name to hex mapping for common colors
const COLOR_MAP: Record<string, string> = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  blue: "#0000FF",
  navy: "#001F3F",
  green: "#008000",
  yellow: "#FFFF00",
  pink: "#FFC0CB",
  purple: "#800080",
  orange: "#FFA500",
  brown: "#A52A2A",
  gray: "#808080",
  grey: "#808080",
  beige: "#F5F5DC",
  cream: "#FFFDD0",
  burgundy: "#800020",
  olive: "#556B2F",
  maroon: "#800000",
  teal: "#008080",
  turquoise: "#40E0D0",
  lavender: "#E6E6FA",
  coral: "#FF7F50",
  peach: "#FFE5B4",
  mint: "#98FF98",
  sage: "#9DC183",
  charcoal: "#36454F",
  taupe: "#483C32",
  khaki: "#C3B091",
  tan: "#D2B48C",
  sand: "#C2B280",
  ivory: "#FFFFF0",
  silver: "#C0C0C0",
  gold: "#FFD700",
};

function getColorHex(colorName: string, swatchColor?: string | null): string {
  // If swatch color is provided, use it
  if (swatchColor) {
    return swatchColor;
  }

  // Try to find a match in the color map (case-insensitive)
  const normalizedName = colorName.toLowerCase();

  // Check for exact match
  if (COLOR_MAP[normalizedName]) {
    return COLOR_MAP[normalizedName];
  }

  // Check if the color name contains a known color
  for (const [key, value] of Object.entries(COLOR_MAP)) {
    if (normalizedName.includes(key)) {
      return value;
    }
  }

  // Default to a neutral gray if no match found
  return "#A0A0A0";
}

/**
 * Extracts all unique colors from products with the same style ID
 * Returns colors with their hex values and product handles
 */
export function extractColorsFromStyleProducts(
  data: ProductsByTagQuery | null,
): ColorOption[] {
  if (!data?.products?.edges) return [];

  const colorMap = new Map<string, ColorOption>();

  for (const edge of data.products.edges) {
    const product = edge.node;

    // Find the color option
    const colorOption = product.options.find(
      (option) =>
        option.name.toLowerCase() === "color" ||
        option.name.toLowerCase() === "colour",
    );

    if (colorOption?.optionValues) {
      // Get the first color value for this product
      const firstColor = colorOption.optionValues[0];
      if (firstColor) {
        const colorName = firstColor.name;
        const colorHex = getColorHex(colorName, firstColor.swatch?.color);

        // Only add if we haven't seen this color yet
        if (!colorMap.has(colorName)) {
          colorMap.set(colorName, {
            name: colorName,
            value: colorHex,
            handle: product.handle,
          });
        }
      }
    }
  }

  return Array.from(colorMap.values());
}
