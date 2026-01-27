import React from "react";

interface AddToCartButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const AddToCartButton = ({
  disabled,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full mt-10 py-4 bg-gray-900 text-white font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
    >
      Add to Cart
    </button>
  );
};
