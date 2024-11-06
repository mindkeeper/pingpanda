import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseColor = (color: string): number => {
  const hex = color.replace(/^#/, '');
  return parseInt(hex, 16);
};
