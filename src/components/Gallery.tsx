"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80", alt: "Desert palms" },
  { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", alt: "White domes" },
  { src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", alt: "Garden view" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Resort pool" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d0e0a2a5e?w=800&q=80", alt: "Interior" },
  { src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80", alt: "Desert sunset" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Outdoor dining" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Luxury tent" },
];

const heights = ["h-[300px]", "h-[400px]", "h-[350px]", "h-[280px]", "h-[380px]", "h-[320px]", "h-[360px]", "h-[300px]"];

export default function Gallery() {
  const t = useTranslations("gallery");
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".gallery-header", start: "top 85%" },
      });

      gsap.from(".gallery-item", {
        clipPath: "inset(0 100% 0 0)",
        scale: 1.05,
        duration: 1,
        stagger: 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".gallery-grid", start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const goNext = () => setLightbox((p) => (p !== null ? (p + 1) % images.length : null));
  const goPrev = () => setLightbox((p) => (p !== null ? (p - 1 + images.length) % images.length : null));

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="film-grain relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="gallery-header text-center mb-16">
          <p className="eyebrow mb-4">{t("subtitle")}</p>
          <h2 className="heading-section" style={{ color: "var(--color-text-primary)" }}>
            {t("title")}
          </h2>
        </div>

        <div className="gallery-grid columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid ${heights[i]}`}
              onClick={() => openLightbox(i)}
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="gallery-overlay absolute inset-0 bg-gold/20 mix-blend-multiply flex items-center justify-center">
                <span className="text-white text-sm uppercase tracking-[0.2em]">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 text-white/60 hover:text-white transition-colors"
          >
            <ChevronRight size={40} />
          </button>
          <img
            src={images[lightbox].src.replace("w=800", "w=1600")}
            alt={images[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
