import React from "react";
import Image from "next/image";

interface ProductImage {
  src: string;
  alt: string;
}

interface ImageGridProps {
  images: ProductImage[];
}

export const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[3/4] overflow-hidden bg-gray-50"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index < 2}
          />
        </div>
      ))}
    </div>
  );
};
