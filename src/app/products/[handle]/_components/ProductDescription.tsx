import React from "react";

interface ProductDescriptionProps {
  description: string;
}

export const ProductDescription = ({
  description,
}: ProductDescriptionProps) => {
  return (
    <div className="mt-6">
      <p className="font-light text-lg text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
