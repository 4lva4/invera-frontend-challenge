import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCompanyLogoUrl = (companyName: string): string => {
  const name = companyName.toLowerCase().trim();

  if (name === 'example inc.' || name === 'adobe'|| name === 'bmw' || name === 'pemex') {
    return 'https://unavatar.io/duckduckgo/example.com?fallback=https://api.dicebear.com/7.x/initials/svg?seed=E';
  }

  const query = name.replace(/\s+/g, '');
  
  return `https://unavatar.io/duckduckgo/${query}.com`;
};