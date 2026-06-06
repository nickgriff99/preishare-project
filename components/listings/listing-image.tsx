"use client";

import {
  getListingImageAlt,
  getListingImageSources,
  LISTING_IMAGE_LOCAL_FALLBACK,
} from "@/lib/listing-images";
import type { AssetClass } from "@/types/database";
import Image from "next/image";
import { useMemo, useState } from "react";

type ListingImageProps = {
  assetClass: AssetClass;
  title: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function ListingImage({
  assetClass,
  title,
  width,
  height,
  sizes,
  className,
  priority = false,
}: ListingImageProps) {
  const sources = useMemo(
    () => getListingImageSources(assetClass, { width, height }),
    [assetClass, width, height],
  );
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex] ?? LISTING_IMAGE_LOCAL_FALLBACK;
  const isLocalFallback = src === LISTING_IMAGE_LOCAL_FALLBACK;

  return (
    <Image
      src={src}
      alt={getListingImageAlt(assetClass, title)}
      fill
      sizes={sizes}
      className={className}
      priority={priority}
      unoptimized={isLocalFallback}
      onError={() => {
        setSourceIndex((current) =>
          current < sources.length - 1 ? current + 1 : current,
        );
      }}
    />
  );
}
