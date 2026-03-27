"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80",
  "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=600&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d36de3cee?w=600&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
];

// Grid layout: define span behavior per image index
const gridSpans: Record<number, string> = {
  0: "md:col-span-2",          // Row 1: span 2 cols
  4: "md:row-span-2",          // Row 2: span 2 rows
  11: "md:col-span-2",         // Row 3: span 2 cols (last row)
};

const gridAspects: Record<number, string> = {
  0: "aspect-[16/9]",
  4: "aspect-[9/16] md:aspect-auto md:h-full",
  11: "aspect-[16/9]",
};

export default function Gallery() {
  const t = useTranslations("gallery");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightboxImageRef = useRef<HTMLImageElement>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // GSAP lightbox open animation
  useEffect(() => {
    if (lightboxIndex !== null && lightboxImageRef.current) {
      gsap.fromTo(
        lightboxImageRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [lightboxIndex]);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Image reveal animations
      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="galerie"
      ref={sectionRef}
      className="bg-[#131008] py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-gold mb-4">
            GALERIE
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl text-cream font-[family-name:var(--font-heading)]">
            {t("title")}
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gold/60" />
        </div>

        {/* Structured CSS Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">
          {images.map((src, index) => {
            const spanClass = gridSpans[index] || "";
            const aspectClass = gridAspects[index] || "aspect-square md:aspect-auto";

            return (
              <div
                key={index}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className={`
                  relative overflow-hidden rounded-lg cursor-pointer group
                  ${spanClass}
                  ${index === 4 ? "" : ""}
                `}
                style={{ clipPath: "inset(100% 0 0 0)" }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gold gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-700/0 via-transparent to-transparent opacity-0 group-hover:from-amber-700/30 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-cream/70 hover:text-gold transition-colors duration-300 z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={32} strokeWidth={1.5} />
          </button>

          {/* Previous arrow */}
          <button
            className="absolute left-6 md:left-12 text-cream/50 hover:text-gold transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>

          {/* Image */}
          <img
            ref={lightboxImageRef}
            key={lightboxIndex}
            src={images[lightboxIndex].replace("w=600", "w=1200")}
            alt=""
            className="max-h-[85vh] max-w-5xl w-[90vw] object-contain rounded-lg select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow */}
          <button
            className="absolute right-6 md:right-12 text-cream/50 hover:text-gold transition-colors duration-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/40 text-sm tracking-widest">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
