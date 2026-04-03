"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsNight(document.documentElement.classList.contains("night-mode"));
    };
    check();
    window.addEventListener("theme-change", check);
    return () => window.removeEventListener("theme-change", check);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      gsap.to(".hero-img-day, .hero-img-night", {
        scale: 1.08,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      tl.from(".hero-tagline", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".hero-headline",
        { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" },
        "-=0.5"
      );

      tl.from(
        ".hero-gold-line",
        { scaleX: 0, duration: 1, ease: "power2.inOut" },
        "-=0.6"
      );

      tl.from(
        ".hero-subtitle",
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.from(
        ".hero-cta",
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

      tl.from(
        ".hero-scroll",
        { opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      gsap.to(".hero-images-wrap", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Two image layers for day/night crossfade */}
      <div className="hero-images-wrap absolute inset-0">
        <img
          src="/images/hero-palm-garden.jpg"
          alt="Palm Garden — white domes, palm trees, green gardens"
          className="hero-img-day absolute inset-0 h-full w-full object-cover scale-100 transition-opacity duration-800 ease-in-out"
          style={{ opacity: isNight ? 0 : 1 }}
        />
        <img
          src="/images/hero-palm-garden-night.webp"
          alt="Palm Garden at night — warm amber lighting, glowing domes"
          className="hero-img-night absolute inset-0 h-full w-full object-cover scale-100 transition-opacity duration-800 ease-in-out"
          style={{ opacity: isNight ? 1 : 0 }}
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] transition-opacity duration-800"
        style={{
          background: isNight
            ? "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.30) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {/* Floating particles */}
      <div className="particle particle-1" style={{ top: "20%", left: "15%" }} />
      <div className="particle particle-2" style={{ top: "35%", right: "20%" }} />
      <div className="particle particle-3" style={{ top: "60%", left: "70%" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-[10vh]">
        {/* Eyebrow */}
        <p
          className="hero-tagline mb-6"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#C8973A",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          {t("tagline")}
        </p>

        {/* Headline */}
        <h1
          className="hero-headline heading-hero mb-8"
          style={{
            color: "#FAF7F2",
            textShadow: "0 2px 40px rgba(0,0,0,0.4)",
          }}
        >
          Palm Garden
        </h1>

        {/* Gold line */}
        <div className="hero-gold-line gold-line w-20 mx-auto mb-8 origin-center" />

        {/* Subtitle */}
        <p
          className="hero-subtitle max-w-2xl mx-auto mb-10"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "16px",
            letterSpacing: "0.08em",
            color: "rgba(250,247,242,0.85)",
            textShadow: "0 1px 12px rgba(0,0,0,0.5)",
          }}
        >
          {t("subtitle")}
        </p>

        {/* CTA — ghost white border */}
        <a
          href="#reservation"
          className="hero-cta inline-block rounded-full transition-all duration-300"
          style={{
            border: "1.5px solid #FAF7F2",
            color: "#FAF7F2",
            padding: "14px 32px",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(250,247,242,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {t("cta")}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <span style={{ color: "rgba(250,247,242,0.7)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em" }}>Scroll</span>
        <div className="scroll-indicator-line" />
      </div>

      {/* WhatsApp floating button — gold */}
      <a
        href="https://wa.me/213XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: "#C8973A",
          boxShadow: "0 4px 20px rgba(200,151,58,0.4)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8B86D")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}
