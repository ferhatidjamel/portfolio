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
      // Dispatch event so Hero and other components can react
      window.dispatchEvent(new Event("theme-change"));
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-24 right-4 z-50 w-10 h-10 rounded-full border flex items-center justify-center shadow-lg transition-all duration-600"
      aria-label="Toggle day/night mode"
      style={{
        cursor: "none",
        backgroundColor: isNight ? "#1A1208" : "#FFFFFF",
        borderColor: isNight ? "rgba(200, 151, 58, 0.4)" : "rgba(200, 151, 58, 0.3)",
      }}
    >
      {isNight ? (
        <Sun className="w-4 h-4 text-gold" />
      ) : (
        <Moon className="w-4 h-4" style={{ color: "#6B5C42" }} />
      )}
    </button>
  );
}
