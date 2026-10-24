"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  /** Rendered over the main image, e.g. a sold overlay. */
  overlay?: ReactNode;
}

const ProductGallery = ({ images, alt, overlay }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
        {activeImage && (
          <Image
            src={activeImage}
            alt={alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        {overlay}
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1} of ${images.length}`}
                aria-current={index === activeIndex}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-md border-2 bg-muted",
                  index === activeIndex ? "border-primary" : "border-transparent",
                )}
              >
                <Image src={image} alt="" fill sizes="20vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductGallery;
