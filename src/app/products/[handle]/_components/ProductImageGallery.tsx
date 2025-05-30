"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImage {
  id: string;
  url: string;
  altText: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].altText}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square relative overflow-hidden rounded-md ${
                selectedImage === index
                  ? "ring-2 ring-blue-600"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}