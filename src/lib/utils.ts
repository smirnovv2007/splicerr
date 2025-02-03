import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatKey = (key: string) => {
	const upper = key.toUpperCase()
	return upper + (key != upper ? " min" : "")
}