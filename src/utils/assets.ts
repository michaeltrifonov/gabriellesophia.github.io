// Utility function to handle asset paths with base URL
export function getAssetPath(path: string): string {
  // Use the BASE_URL from Astro's env
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // If path doesn't start with /, add it
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash from base if present
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Return combined path
  return `${cleanBase}${normalizedPath}`;
}