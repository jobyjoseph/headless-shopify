import React from "react";

interface ProductPriceProps {
  price: string;
}

export const ProductPrice = ({ price }: ProductPriceProps) => {
  return <p className="text-xl font-normal text-gray-900 mt-2">{price}</p>;
};
