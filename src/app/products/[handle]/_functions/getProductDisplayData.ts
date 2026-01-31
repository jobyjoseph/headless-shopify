import type { ProductQuery } from "@/generated/shopifySchemaTypes";

interface ProductImage {
  src: string;
  alt: string;
}

interface ColorOption {
  name: string;
  value: string;
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface ProductDisplayData {
  title: string;
  formattedPrice: string;
  images: ProductImage[];
  description: string;
  colors: ColorOption[];
  sizes: string[];
  variants: ProductVariant[];
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

export function getProductDisplayData(data: ProductQuery): ProductDisplayData {
  const title = data.product.title;
  const price = data.product.priceRange?.minVariantPrice;

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currencyCode,
      }).format(parseFloat(price.amount))
    : "$0.00";

  const images: ProductImage[] =
    data.product.images?.edges?.map((edge) => ({
      src: edge.node.url,
      alt: edge.node.altText || title,
    })) || [];

  const description = data.product.description || "";

  // Extract colors from options
  const colors: ColorOption[] = [];
  const sizes: string[] = [];

  if (data.product?.options) {
    data.product.options.forEach((option) => {
      const optionName = option.name.toLowerCase();

      if (optionName === "color" || optionName === "colour") {
        // Extract color option values
        option.optionValues.forEach((optionValue) => {
          const colorHex = getColorHex(
            optionValue.name,
            optionValue.swatch?.color,
          );
          colors.push({
            name: optionValue.name,
            value: colorHex,
          });
        });
      } else if (optionName === "size") {
        // Extract size option values
        option.optionValues.forEach((optionValue) => {
          sizes.push(optionValue.name);
        });
      }
    });
  }

  // Extract variants
  const variants: ProductVariant[] =
    data.product.variants?.edges?.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions.map((opt) => ({
        name: opt.name,
        value: opt.value,
      })),
    })) || [];

  return {
    title,
    formattedPrice,
    images,
    description,
    colors,
    sizes,
    variants,
  };
}
