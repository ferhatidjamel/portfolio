"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const topRow = [
  { src: "/images/about-palm-garden.webp", alt: "Palm Garden dome panorama" },
  { src: "/images/chalets-exterior.jpg", alt: "Pyramid chalets exterior" },
  { src: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80", alt: "Desert palms at sunset" },
  { src: "/images/chalets-interior.jpg", alt: "Chalet interior" },
  { src: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80", alt: "White domes architecture" },
  { src: "/images/chalets-services.jpg", alt: "Room service breakfast" },
];

const bottomRow = [
  { src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", alt: "Garden greenery" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Dining setup" },
  { src: "/images/hero-palm-garden.jpg", alt: "Palm Garden main entrance" },
  { src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80", alt: "Breakfast spread" },
  { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80", alt: "Evening ambiance" },
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80", alt: "Pool area" },
];

const allImages = [...topRow, ...bottomRow];

export default function Gallery() {
  const t = useTranslations("gallery");
  const sectionRef = useRef<HTMLElement>(null);
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const topTween = useRef<gsap.core.Tween | null>(null);
  const bottomTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

  // Auto-scrolling filmstrips
  useEffect(() => {
    const topTrack = topTrackRef.current;
    const bottomTrack = bottomTrackRef.current;
    if (!topTrack || !bottomTrack) return;

    // Duplicate children for seamless loop
    topTrack.innerHTML += topTrack.innerHTML;
    bottomTrack.innerHTML += bottomTrack.innerHTML;

    const topWidth = topTrack.scrollWidth / 2;
    const bottomWidth = bottomTrack.scrollWidth / 2;

    // Top row — scrolls left
    topTween.current = gsap.to(topTrack, {
      x: -topWidth,
      duration: 60,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % topWidth),
      },
    });

    // Bottom row — scrolls right (starts offset)
    gsap.set(bottomTrack, { x: -bottomWidth });
    bottomTween.current = gsap.to(bottomTrack, {
      x: 0,
      duration: 70,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x) % bottomWidth;
          return val > 0 ? val - bottomWidth : val;
        }),
      },
    });

    return () => {
      topTween.current?.kill();
      bottomTween.current?.kill();
    };
  }, []);

  // Pause/resume on hover
  useEffect(() => {
    if (isPaused) {
      topTween.current?.pause();
      bottomTween.current?.pause();
    } else {
      topTween.current?.resume();
      bottomTween.current?.resume();
    }
  }, [isPaused]);

  const openLightbox = (i: number) => {
    setLightbox(i);
    window.__lenis?.stop();
  };
  const closeLightbox = () => {
    setLightbox(null);
    window.__lenis?.start();
  };
  const goNext = () => setLightbox((p) => (p !== null ? (p + 1) % allImages.length : null));
  const goPrev = () => setLightbox((p) => (p !== null ? (p - 1 + allImages.length) % allImages.length : null));

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

  const FilmstripImage = ({
    src,
    alt,
    index,
    height,
  }: {
    src: string;
    alt: string;
    index: number;
    height: string;
  }) => (
    <div
      className="flex-shrink-0 relative overflow-hidden rounded-xl cursor-pointer group"
      style={{ width: "auto", height }}
      onClick={() => openLightbox(index)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-auto max-w-none object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ backgroundColor: "rgba(200,151,58,0.2)" }}
      >
        <span
          className="px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.15em] font-medium"
          style={{ backgroundColor: "rgba(250,247,242,0.95)", color: "#1A1208" }}
        >
          View
        </span>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#1A1208" }}
    >
      {/* Header */}
      <div className="gallery-header text-center mb-12 md:mb-16 px-6">
        <p className="eyebrow mb-4" style={{ color: "#E8B86D" }}>
          {t("subtitle")}
        </p>
        <h2
          className="font-[family-name:var(--font-heading)] italic font-light leading-[1.1]"
          style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#FAF7F2" }}
        >
          {t("title")}
        </h2>
      </div>

      {/* Top filmstrip — scrolls left */}
      <div className="mb-4 md:mb-6 overflow-hidden">
        <div ref={topTrackRef} className="flex gap-4 md:gap-6 will-change-transform">
          {topRow.map((img, i) => (
            <FilmstripImage
              key={`top-${i}`}
              src={img.src}
              alt={img.alt}
              index={i}
              height="280px"
            />
          ))}
        </div>
      </div>

      {/* Bottom filmstrip — scrolls right */}
      <div className="overflow-hidden">
        <div ref={bottomTrackRef} className="flex gap-4 md:gap-6 will-change-transform">
          {bottomRow.map((img, i) => (
            <FilmstripImage
              key={`bottom-${i}`}
              src={img.src}
              alt={img.alt}
              index={topRow.length + i}
              height="240px"
            />
          ))}
        </div>
      </div>

      {/* Subtle edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-24 md:w-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, #1A1208, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 md:w-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, #1A1208, transparent)" }}
      />

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
            src={allImages[lightbox].src.replace("w=800", "w=1600")}
            alt={allImages[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {/* Image counter */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.15em] uppercase"
            style={{ color: "rgba(250,247,242,0.5)" }}
          >
            {lightbox + 1} / {allImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
