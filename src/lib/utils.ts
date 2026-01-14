import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    // دمج فئات TailwindCSS وحل التعارضات فيما بينها
    return twMerge(clsx(inputs));
}
