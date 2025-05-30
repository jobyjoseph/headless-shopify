"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/integrations/shopify/services/cartService";
import { getCartId, setCartId } from "@/utils/cart";

interface Variant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  image?: {
    url: string;
    altText?: string | null;
  } | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

interface ProductVariantSelectorProps {
  variants: Variant[];
  options: ProductOption[];
}

export default function ProductVariantSelector({
  variants,
  options,
}: ProductVariantSelectorProps) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const defaultOptions: Record<string, string> = {};
      options.forEach((option) => {
        defaultOptions[option.name] = option.values[0];
      });
      return defaultOptions;
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Find the selected variant based on selected options
  const selectedVariant = useMemo(() => {
    return variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      )
    );
  }, [selectedOptions, variants]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    setIsAddingToCart(true);
    try {
      const cartId = getCartId();
      const result = await addToCart(selectedVariant.id, quantity, cartId);
      
      if (!cartId && result.cartId) {
        setCartId(result.cartId);
      }

      // Refresh the page to update cart count
      router.refresh();
      
      // Optional: Show success message or redirect to cart
      // router.push('/cart');
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Variant Options */}
      {options.map((option) => (
        <div key={option.id}>
          <h3 className="text-sm font-medium mb-2">{option.name}</h3>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = variants.some(
                (variant) =>
                  variant.availableForSale &&
                  variant.selectedOptions.some(
                    (opt) => opt.name === option.name && opt.value === value
                  )
              );

              return (
                <button
                  key={value}
                  onClick={() => handleOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 rounded-md border transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : isAvailable
                      ? "border-gray-300 hover:border-gray-400"
                      : "border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-medium mb-2">Quantity</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-md border border-gray-300 hover:border-gray-400 transition"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 h-10 text-center border border-gray-300 rounded-md"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 rounded-md border border-gray-300 hover:border-gray-400 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Display */}
      {selectedVariant && (
        <div className="flex items-baseline gap-3">
          {selectedVariant.compareAtPrice && (
            <span className="text-xl text-gray-500 line-through">
              {selectedVariant.compareAtPrice.currencyCode}{" "}
              {selectedVariant.compareAtPrice.amount}
            </span>
          )}
          <span className="text-2xl font-bold">
            {selectedVariant.price.currencyCode} {selectedVariant.price.amount}
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={
          !selectedVariant ||
          !selectedVariant.availableForSale ||
          isAddingToCart
        }
        className={`w-full py-3 px-6 rounded-md font-semibold transition ${
          selectedVariant && selectedVariant.availableForSale
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isAddingToCart
          ? "Adding..."
          : !selectedVariant
          ? "Select Options"
          : !selectedVariant.availableForSale
          ? "Out of Stock"
          : "Add to Cart"}
      </button>

      {/* Stock Status */}
      {selectedVariant && selectedVariant.quantityAvailable > 0 && (
        <p className="text-sm text-gray-600">
          {selectedVariant.quantityAvailable} in stock
        </p>
      )}
    </div>
  );
}