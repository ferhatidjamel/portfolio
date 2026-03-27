"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function DayNightToggle() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("palm-garden-theme");
    if (saved === "night") {
      setIsNight(true);
      document.documentElement.classList.add("night-mode");
    }
  }, []);

  const toggle = () => {
    setIsNight((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("night-mode");
        localStorage.setItem("palm-garden-theme", "night");
      } else {
        document.documentElement.classList.remove("night-mode");
        localStorage.setItem("palm-garden-theme", "day");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-24 right-4 z-50 w-10 h-10 rounded-full bg-bg-card border border-gold/30 flex items-center justify-center shadow-lg hover:border-gold/60 transition-all duration-300"
      aria-label="Toggle day/night mode"
      style={{ cursor: "none" }}
    >
      {isNight ? (
        <Sun className="w-4 h-4 text-gold" />
      ) : (
        <Moon className="w-4 h-4 text-text-muted" />
      )}
    </button>
  );
}
