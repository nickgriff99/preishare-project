import { ASSET_CLASS_LABELS } from "@/lib/listing-constants";
import type { AssetClass } from "@/types/database";

type PhotoSet = {
  primary: string;
  fallback: string;
};

/** Curated Unsplash photo IDs — primary + fallback per asset class. */
const UNSPLASH_PHOTOS: Record<AssetClass, PhotoSet> = {
  multifamily: {
    primary: "photo-1545324418-cc1a3fa10c00",
    fallback: "photo-1560448204-e02f11c3d0e2",
  },
  industrial: {
    primary: "photo-1758789667762-56175fe4601c",
    fallback: "photo-1776090188315-c481a5753867",
  },
  medical_office: {
    primary: "photo-1519494026892-80bbd2d6fd0d",
    fallback: "photo-1600607687939-ce8a6c25118c",
  },
  retail: {
    primary: "photo-1441986300917-64674bd600d8",
    fallback: "photo-1600566752355-35792bedcfea",
  },
  data_center: {
    primary: "photo-1558494949-ef010cbdcc31",
    fallback: "photo-1600585152915-d208bec867a1",
  },
  self_storage: {
    primary: "photo-1600566753086-00f18fb6b3ea",
    fallback: "photo-1776090188315-c481a5753867",
  },
  office: {
    primary: "photo-1486406146926-c627a92ad1ab",
    fallback: "photo-1503387762-592deb58ef4e",
  },
  hospitality: {
    primary: "photo-1566073771259-6a8506099945",
    fallback: "photo-1570129477492-45c003edd2be",
  },
  other: {
    primary: "photo-1486406146926-c627a92ad1ab",
    fallback: "photo-1523217582562-09d0def993a6",
  },
};

/** Last-resort remote photo — verified 200 on Unsplash CDN. */
const ULTIMATE_REMOTE_PHOTO = "photo-1545324418-cc1a3fa10c00";

export const LISTING_IMAGE_LOCAL_FALLBACK = "/listings/fallback.svg";

type ListingImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

export function buildListingImageUrl(
  photoId: string,
  { width = 640, height = 400, quality = 75 }: ListingImageOptions = {},
) {
  const params = new URLSearchParams({
    w: String(width),
    h: String(height),
    q: String(quality),
    auto: "format",
    fit: "crop",
  });
  return `https://images.unsplash.com/${photoId}?${params}`;
}

export function getListingImageUrl(
  assetClass: AssetClass,
  options: ListingImageOptions = {},
) {
  return buildListingImageUrl(UNSPLASH_PHOTOS[assetClass].primary, options);
}

export function getListingImageFallbackUrl(
  assetClass: AssetClass,
  options: ListingImageOptions = {},
) {
  return buildListingImageUrl(UNSPLASH_PHOTOS[assetClass].fallback, options);
}

/** Ordered sources: primary → asset fallback → generic remote → local SVG. */
export function getListingImageSources(
  assetClass: AssetClass,
  options: ListingImageOptions = {},
): string[] {
  const { primary, fallback } = UNSPLASH_PHOTOS[assetClass];
  return [
    ...new Set([
      buildListingImageUrl(primary, options),
      buildListingImageUrl(fallback, options),
      buildListingImageUrl(ULTIMATE_REMOTE_PHOTO, options),
      LISTING_IMAGE_LOCAL_FALLBACK,
    ]),
  ];
}

export function getListingImageAlt(assetClass: AssetClass, title: string) {
  return `${title} — ${ASSET_CLASS_LABELS[assetClass]} property`;
}
