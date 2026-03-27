"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Image Ken Burns — slow subtle zoom
      gsap.to(".hero-img", {
        scale: 1.08,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      // Tagline
      tl.from(".hero-tagline", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Headline
      tl.from(
        ".hero-headline",
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Gold line animates width
      tl.from(
        ".hero-gold-line",
        {
          scaleX: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6"
      );

      // Subtitle
      tl.from(
        ".hero-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // CTA button
      tl.from(
        ".hero-cta",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Scroll indicator
      tl.from(
        ".hero-scroll",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Parallax on scroll
      gsap.to(".hero-img", {
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
      {/* Full-bleed image — NO dark overlay, let it breathe */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-palm-garden.jpg"
          alt="Palm Garden — white domes, palm trees, green gardens"
          className="hero-img h-full w-full object-cover scale-100"
        />
        {/* Very subtle gradient at bottom only for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="particle particle-1" style={{ top: "20%", left: "15%" }} />
      <div className="particle particle-2" style={{ top: "35%", right: "20%" }} />
      <div className="particle particle-3" style={{ top: "60%", left: "70%" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="hero-tagline eyebrow text-white/90 mb-6">
          {t("tagline")}
        </p>

        <h1 className="hero-headline heading-hero text-white mb-8">
          Palm Garden
        </h1>

        <div className="hero-gold-line gold-line w-20 mx-auto mb-8 origin-center" />

        <p className="hero-subtitle text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto mb-10">
          {t("subtitle")}
        </p>

        <a
          href="#reservation"
          className="hero-cta inline-block rounded-full border border-white/50 px-10 py-4 text-white text-sm uppercase tracking-[0.2em] font-light hover:bg-white/10 transition-all duration-500"
        >
          {t("cta")}
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="scroll-indicator-line" />
      </div>

      {/* WhatsApp floating button — gold, not green */}
      <a
        href="https://wa.me/213XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}
