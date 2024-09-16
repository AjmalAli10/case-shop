import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

export function splitArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % size;

    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}
