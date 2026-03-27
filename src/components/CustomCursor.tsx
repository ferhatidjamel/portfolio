"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Check for coarse pointer (touch device)
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a, button, [role='button'], input, select, textarea, label")
      ) {
        dot.classList.add("hovering");
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest("a, button, [role='button'], input, select, textarea, label")
      ) {
        dot.classList.remove("hovering");
      }
    };

    let animId: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.15);
      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}
