import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to handle HTML in translation strings
export const renderGreenHtml = (htmlString: string) => {
  return htmlString.replace(
    /<green>(.*?)<\/green>/g,
    '<span class="text-primary-green">$1</span>'
  );
};

export const renderBoldHtml = (htmlString: string) => {
  return htmlString.replace(
    /<bold>(.*?)<\/bold>/g,
    '<span class="font-bold  text-primary-green font-sans">$1</span>'
  );
};
