import { AdminPreviewProduct } from "@/integrations/shopify-admin/get-product-by-handle";

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
  badge?: string;
  currentColor: string | null;
}

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

function getColorHex(colorName: string): string {
  const normalizedName = colorName.toLowerCase();

  if (COLOR_MAP[normalizedName]) {
    return COLOR_MAP[normalizedName];
  }

  for (const [key, value] of Object.entries(COLOR_MAP)) {
    if (normalizedName.includes(key)) {
      return value;
    }
  }

  return "#A0A0A0";
}

export function getAdminProductDisplayData(
  product: AdminPreviewProduct,
): ProductDisplayData {
  const price = product.variants[0]?.price;

  const formattedPrice = price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(price))
    : "$0.00";

  const colorOption = product.options.find(
    (option) =>
      option.name.toLowerCase() === "color" ||
      option.name.toLowerCase() === "colour",
  );

  const sizeOption = product.options.find(
    (option) => option.name.toLowerCase() === "size",
  );

  const colors = (colorOption?.values || []).map((name) => ({
    name,
    value: getColorHex(name),
  }));

  const sizes = sizeOption?.values || [];

  const badgeTag = product.tags.find((tag) => tag.startsWith("badge:"));
  const badge = badgeTag ? badgeTag.replace("badge:", "") : undefined;

  return {
    title: product.title,
    formattedPrice,
    images: product.images,
    description: product.description || "",
    colors,
    sizes,
    variants: product.variants,
    badge,
    currentColor: colors[0]?.name || null,
  };
}
