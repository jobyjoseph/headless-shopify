import React from "react";

interface ColorOption {
  name: string;
  value: string;
}

interface ProductColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export const ProductColorSelector = ({
  colors,
  selectedColor,
  onColorChange,
}: ProductColorSelectorProps) => {
  return (
    <div className="mt-6">
      <div className="mb-3">
        <span className="font-light text-gray-900">Color: </span>
        <span className="font-light text-gray-900">{selectedColor}</span>
      </div>
      <div className="flex gap-2">
        {colors.map((color) => {
          const isWhite = color.name.toLowerCase() === "white";
          return (
            <button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                selectedColor === color.name
                  ? "ring-1 ring-offset-2 ring-gray-900"
                  : "hover:ring-1 hover:ring-offset-2 hover:ring-gray-400"
              } ${isWhite ? "border border-gray-300" : ""}`}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
              title={color.name}
            />
          );
        })}
      </div>
    </div>
  );
};
