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
    localStorage.setItem("theme", "system")
  } else {
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }

  // Update meta theme color
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (metaTheme) {
    metaTheme.setAttribute(
      "content",
      theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "#09090B"
        : "#ffffff"
    )
  }
}

// Initialize theme
export function initializeTheme() {
  if (typeof window === "undefined") return

  const root = window.document.documentElement
  const theme = getTheme()

  // Add system theme listener
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  const handleChange = (e: MediaQueryListEvent) => {
    if (getTheme() === "system") {
      root.classList.remove("light", "dark")
      root.classList.add(e.matches ? "dark" : "light")
    }
  }

  mediaQuery.addEventListener("change", handleChange)
  setTheme(theme)

  return () => mediaQuery.removeEventListener("change", handleChange)
}