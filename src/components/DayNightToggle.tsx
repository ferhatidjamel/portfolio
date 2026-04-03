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
      window.dispatchEvent(new Event("theme-change"));
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-24 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-600"
      aria-label="Toggle day/night mode"
      style={{
        cursor: "none",
        backgroundColor: isNight ? "rgba(26,18,8,0.9)" : "rgba(250,247,242,0.9)",
        border: isNight ? "1px solid #C8973A" : "1px solid rgba(200,151,58,0.3)",
      }}
    >
      {isNight ? (
        <Sun className="w-4 h-4" style={{ color: "#C8973A" }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: "#1A1208" }} />
      )}
    </button>
  );
}
