"use client";

import React, { useState } from "react";

type Color = { name: string; color: string };
type Size = { id: string; label: string; disabled?: boolean };

const coreColors = [
  { name: "Espresso", color: "#513b2c" },
  { name: "Black", color: "#000000" },
  { name: "White", color: "#ffffff" },
  { name: "Gravel", color: "#ceb18f" },
  { name: "Anthracite", color: "#5c5855" },
];

const limitedColors = [
  { name: "Pink Wild Rose", color: "#cc8a98" },
  { name: "Lunar Grey", color: "#9ba1a1" },
  { name: "Green Olive", color: "#546243" },
  { name: "Taupe", color: "#BDA599" },
  { name: "Steel Grey", color: "#828a92" },
  { name: "Macadamia", color: "#f4e4cf" },
  { name: "Navy", color: "#01305c" },
  { name: "Eclipse Blue", color: "#015075" },
  { name: "Burgundy Truffle", color: "#a86471" },
  { name: "Limestone", color: "#B6B5A1" },
  { name: "Ballet Pink", color: "#ecc9cd" },
  { name: "Sweet Pink", color: "#fed3e0" },
];

const SIZES: Size[] = [
  { id: "xxs", label: "XXS" },
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL", disabled: true }, // example disabled
];

const SectionAddToCart = () => {
  const [color, setColor] = useState<Color | null>(coreColors[0]);
  const [size, setSize] = useState<Size | null>(null);

  const canAdd = Boolean(color && size);

  return (
    <>
      <div className="mt-8">
        <div className="font-regular">Core</div>
        <div className="mt-2 flex items-center gap-3">
          {coreColors.map((c) => (
            <label key={c.name} className="relative">
              <input
                type="radio"
                name="color"
                className="peer sr-only"
                aria-label={c.name}
                checked={color?.name === c.name}
                onChange={() => setColor(c)}
              />
              <span
                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 shadow-sm peer-checked:ring-2 peer-checked:ring-black/100"
                style={{ background: c.color }}
                title={c.name}
              />
            </label>
          ))}
        </div>
        <div className="font-regular">Limited</div>
        <div className="mt-2 flex items-center gap-3 flex-wrap">
          {limitedColors.map((c) => (
            <label key={c.name} className="relative">
              <input
                type="radio"
                name="color"
                className="peer sr-only"
                aria-label={c.name}
                checked={color?.name === c.name}
                onChange={() => setColor(c)}
              />
              <span
                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 shadow-sm peer-checked:ring-2 peer-checked:ring-black/100"
                style={{ background: c.color }}
                title={c.name}
              />
            </label>
          ))}
        </div>
        {color && <p className="mt-2 font-semibold">Selected: {color.name}</p>}
      </div>
      <div className="mt-8">
        <div>Size</div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              disabled={s.disabled}
              onClick={() => !s.disabled && setSize(s)}
              className={[
                "h-10 rounded-md border text-sm font-medium",
                "transition-colors",
                s.disabled
                  ? "cursor-not-allowed border-neutral-200 text-neutral-300"
                  : "hover:border-black/60",
                size?.id === s.id
                  ? "border-black bg-black text-white"
                  : "border-neutral-300 bg-white text-neutral-900",
              ].join(" ")}
              aria-pressed={size?.id === s.id}
            >
              {s.label}
            </button>
          ))}
        </div>
        {size && <p className="mt-2">Selected: {size.label}</p>}
      </div>
      <div className="mt-8">
        <button
          type="button"
          disabled={!canAdd}
          className={[
            "w-full h-12 rounded-md text-white font-semibold",
            "transition-opacity",
            canAdd
              ? "bg-black hover:opacity-90"
              : "bg-black/60 cursor-not-allowed",
          ].join(" ")}
          onClick={() => {
            alert(`Add to cart → color=${color?.name}, size=${size?.label}`);
          }}
        >
          Add to Bag
        </button>
      </div>
    </>
  );
};

export default SectionAddToCart;
