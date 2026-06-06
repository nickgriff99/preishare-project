const SKYLINE_PHOTO = "photo-1486406146926-c627a92ad1ab";

export function getSkylinePhotoUrl(width = 1920, height = 1080, quality = 60) {
  const params = new URLSearchParams({
    w: String(width),
    h: String(height),
    q: String(quality),
    auto: "format",
    fit: "crop",
  });
  return `https://images.unsplash.com/${SKYLINE_PHOTO}?${params}`;
}
