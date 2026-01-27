"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
  className?: string;
  wrapperClassName?: string;
  fallbackSrc?: string;
}

const CustomImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "https://placehold.co/600x400/052e16/white?text=KajLagbe",
  ...props
}: CustomImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState(src);

  // Synchronize state when src prop changes (derived state pattern)
  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        props.fill && "h-full w-full",
        wrapperClassName,
      )}
    >
      <Image
        src={imgSrc}
        alt={alt || "Image"}
        unoptimized={true}
        className={cn("transition-opacity duration-300", className)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        {...props}
      />
    </div>
  );
};

export default CustomImage;
