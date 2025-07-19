// Utility function to prepend BASE_URL to image paths
export function getImagePath(path: string): string {
  // This will be processed at build time by Astro
  // The actual BASE_URL will be injected during the build process
  return path;
}

// Function to be used in Astro components
export function getAstroImagePath(path: string, baseUrl: string): string {
  return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
}