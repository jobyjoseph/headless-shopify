"use client";

import { useState } from "react";
import { ProductColorSelector } from "./ProductColorSelector";
import { ProductFit } from "./ProductFit";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { AddToCartButton } from "./AddToCartButton";
import { useCart } from "@/providers/cart-provider";

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

interface ProductActionsProps {
  colors: ColorOption[];
  sizes: string[];
  fit: string;
  variants: ProductVariant[];
}

export const ProductActions = ({
  colors,
  sizes,
  fit,
  variants,
}: ProductActionsProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const findMatchingVariant = () => {
    if (!selectedSize) return null;

    return variants.find((variant) => {
      const matchesSize = variant.selectedOptions.some(
        (opt) =>
          opt.name.toLowerCase() === "size" && opt.value === selectedSize,
      );

      if (!selectedColor) return matchesSize;

      const matchesColor = variant.selectedOptions.some(
        (opt) =>
          (opt.name.toLowerCase() === "color" ||
            opt.name.toLowerCase() === "colour") &&
          opt.value === selectedColor,
      );

      return matchesSize && matchesColor;
    });
  };

  const handleAddToCart = async () => {
    const variant = findMatchingVariant();

    if (!variant) {
      alert("Please select a size");
      return;
    }

    if (!variant.availableForSale) {
      alert("This variant is not available for sale");
      return;
    }

    try {
      setIsAdding(true);
      await addToCart([
        {
          merchandiseId: variant.id,
          quantity: 1,
        },
      ]);
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <ProductColorSelector
        colors={colors}
        selectedColor={selectedColor || ""}
        onColorChange={setSelectedColor}
      />
      <ProductFit fit={fit} />
      <ProductSizeSelector
        sizes={sizes}
        selectedSize={selectedSize || ""}
        onSizeChange={setSelectedSize}
      />
      <AddToCartButton
        disabled={!selectedSize || isAdding}
        onClick={handleAddToCart}
      />
    </>
  );
};
