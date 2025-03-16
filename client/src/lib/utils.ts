import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Theme utilities
export function getTheme(): "light" | "dark" | "system" {
  if (typeof window === "undefined") return "system"
  return (localStorage.getItem("theme") as "light" | "dark" | "system") || "system"
}

export function setTheme(theme: "light" | "dark" | "system") {
  const root = window.document.documentElement
  root.classList.remove("light", "dark")

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    root.classList.add(systemTheme)
  } else {
    root.classList.add(theme)
  }

  localStorage.setItem("theme", theme)
}