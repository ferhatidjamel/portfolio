"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hand, Flame, Waves, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { key: "massage", icon: Hand },
  { key: "hammam", icon: Flame },
  { key: "pool", icon: Waves },
  { key: "beauty", icon: Sparkles },
];

export default function Spa() {
  const t = useTranslations("spa");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(".spa-header", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spa-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Subtitle
      gsap.from(".spa-subtitle", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spa-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Service cards stagger
      gsap.from(".spa-card", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spa-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Decorative line
      gsap.from(".spa-divider", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".spa-divider",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // CTA
      gsap.from(".spa-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spa-cta",
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spa"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0D0A06 0%, #1A150D 30%, #1A150D 70%, #0D0A06 100%)",
      }}
    >
      {/* Noise texture */}
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="spa-header font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-cream mb-5">
            {t("title")}
          </h2>
          <p className="spa-subtitle text-sand-light/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Gold divider */}
        <div className="spa-divider section-divider max-w-xs mx-auto mb-20 origin-left" />

        {/* Service Cards — 2x2 grid */}
        <div className="spa-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-4xl mx-auto">
          {services.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="spa-card group relative rounded-2xl bg-[#1A150D] border border-gold/10 hover:border-gold/50 transition-all duration-500 p-10 text-center"
            >
              {/* Gold glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6 group-hover:bg-gold/20 transition-colors duration-500">
                  <Icon
                    className="text-gold group-hover:scale-110 transition-transform duration-500"
                    size={32}
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-cream text-xl md:text-2xl mb-3">
                  {t(`${key}.name`)}
                </h3>
                <p className="text-cream/50 text-sm md:text-base leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="spa-cta text-center">
          <a
            href="#reservation"
            className="magnetic-btn inline-block rounded-full border border-gold/60 px-10 py-4 text-gold font-semibold text-base md:text-lg hover:bg-gold hover:text-desert-night transition-all duration-500"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
