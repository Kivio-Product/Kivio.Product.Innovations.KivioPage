"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/ThemeProvider";

export function ThemeToggle({ light, dark }: { light: string; dark: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg transition hover:border-accent hover:text-accent"
      aria-label={theme === "dark" ? light : dark}
      title={theme === "dark" ? light : dark}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
