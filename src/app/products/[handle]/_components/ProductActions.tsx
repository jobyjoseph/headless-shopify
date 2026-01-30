"use client";

import { useState } from "react";
import { ProductColorSelector } from "./ProductColorSelector";
import { ProductFit } from "./ProductFit";
import { ProductSizeSelector } from "./ProductSizeSelector";
import { AddToCartButton } from "./AddToCartButton";

interface ColorOption {
  name: string;
  value: string;
}

interface ProductActionsProps {
  colors: ColorOption[];
  sizes: string[];
  fit: string;
}

export const ProductActions = ({ colors, sizes, fit }: ProductActionsProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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
      <AddToCartButton disabled={!selectedSize} />
    </>
  );
};
