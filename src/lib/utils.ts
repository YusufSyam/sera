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

export const getSessionIdPerDay = (prefix: string = "DAILY"): string => {
  const now = new Date();

  // Mengambil komponen tanggal saja
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  // Menggabungkan menjadi string
  return `${prefix}-${year}${month}${day}`;
};
