import React from "react";

interface ProductFitProps {
  fit: string;
}

export const ProductFit = ({ fit }: ProductFitProps) => {
  return (
    <div className="mt-6">
      <span className="font-light text-gray-900">Fit: </span>
      <span className="font-light text-gray-900">{fit}</span>
    </div>
  );
};
