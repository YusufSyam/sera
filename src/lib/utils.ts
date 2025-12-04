import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const limitToTwoSentences = (text: string) => {
  const sentences = text.split("");
  const firstTwo = sentences.slice(0, 16).join("").trim();
  return firstTwo.endsWith(".") ? firstTwo : firstTwo + ".";
};
