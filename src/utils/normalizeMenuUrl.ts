export function normalizeMenuUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname; // keep only "/pages/about"
  } catch {
    return url; // already a relative URL
  }
}
