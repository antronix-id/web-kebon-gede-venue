"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const emptySubscribe = () => () => {};

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: ThemeToggleProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(() => onStoreChange());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    },
    () => document.documentElement.classList.contains("dark"),
    () => false
  );

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {}
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {}
    }
  };

  if (!isMounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-border bg-card/50 flex items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-300 border border-border/80 bg-card/80 text-foreground hover:bg-accent/30 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring ${className}`}
      aria-label={isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
      title={isDark ? "Mode Terang" : "Mode Gelap"}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 transform absolute ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`w-4 h-4 text-emerald-400 transition-all duration-300 transform absolute ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium font-sans">
          {isDark ? "Gelap" : "Terang"}
        </span>
      )}
    </button>
  );
}
