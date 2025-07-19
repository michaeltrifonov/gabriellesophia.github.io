// Utility function to handle asset paths with base URL
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Use the BASE_URL from Astro's env
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Ensure BASE_URL ends with a slash and path doesn't start with one
  return baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
}