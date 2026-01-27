import React from "react";

interface ProductSizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export const ProductSizeSelector = ({
  sizes,
  selectedSize,
  onSizeChange,
}: ProductSizeSelectorProps) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <span className=" font-light text-gray-900">Size</span>
        <button className="font-light text-gray-600 underline hover:text-gray-900 cursor-pointer">
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`text-sm py-2 border transition-all cursor-pointer ${
              selectedSize === size
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-900 hover:border-gray-900"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
