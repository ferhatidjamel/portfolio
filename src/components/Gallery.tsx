"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: "/images/about-palm-garden.webp", alt: "Palm Garden dome panorama" },
  { src: "/images/chalets-exterior.jpg", alt: "Pyramid chalets exterior" },
  { src: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80", alt: "Desert palms at sunset" },
  { src: "/images/chalets-interior.jpg", alt: "Chalet interior" },
  { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", alt: "White domes architecture" },
  { src: "/images/chalets-services.jpg", alt: "Room service breakfast" },
  { src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", alt: "Garden greenery" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining setup" },
  { src: "/images/hero-palm-garden.jpg", alt: "Palm Garden main entrance" },
  { src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80", alt: "Breakfast spread" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Evening ambiance" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Pool area" },
];

export default function Gallery() {
  const t = useTranslations("gallery");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const filmTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".gallery-header", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Single auto-scrolling filmstrip
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate children for seamless loop
    track.innerHTML += track.innerHTML;
    const totalWidth = track.scrollWidth / 2;

    filmTween.current = gsap.to(track, {
      x: -totalWidth,
      duration: 70,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      filmTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (isPaused) filmTween.current?.pause();
    else filmTween.current?.resume();
  }, [isPaused]);

  const openLightbox = (i: number) => {
    setLightbox(i);
    window.__lenis?.stop();
  };
  const closeLightbox = () => {
    setLightbox(null);
    window.__lenis?.start();
  };
  const goNext = () => setLightbox((p) => (p !== null ? (p + 1) % galleryImages.length : null));
  const goPrev = () => setLightbox((p) => (p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : null));

  useEffect(() => {
    if (lightbox === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Header */}
      <div className="gallery-header text-center mb-12 md:mb-16 px-6">
        <p className="eyebrow mb-4">{t("subtitle")}</p>
        <h2
          className="font-[family-name:var(--font-heading)] italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#1A1208" }}
        >
          {t("title")}
        </h2>
      </div>

      {/* Single filmstrip */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-4 md:gap-6 will-change-transform">
          {galleryImages.map((img, i) => (
            <div
              key={`g-${i}`}
              className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer group"
              style={{ width: "auto", height: "300px" }}
              onClick={() => openLightbox(i)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-auto max-w-none object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: "rgba(26,18,8,0.25)" }}
              >
                <span
                  className="px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium"
                  style={{ backgroundColor: "rgba(250,247,242,0.95)", color: "#1A1208" }}
                >
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-6 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-6 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight size={40} />
          </button>
          <img
            src={galleryImages[lightbox].src.replace("w=800", "w=1600")}
            alt={galleryImages[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(250,247,242,0.5)" }}
          >
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
