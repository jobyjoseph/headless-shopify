import React from "react";

interface ProductBadgeProps {
  text: string;
}

export const ProductBadge = ({ text }: ProductBadgeProps) => {
  return (
    <span className="text-xs font-light uppercase tracking-wider text-gray-600 mb-2 block">
      {text}
    </span>
  );
};
