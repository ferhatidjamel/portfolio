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
      gsap.from(".spa-eyebrow", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".spa-eyebrow", start: "top 85%" },
      });

      gsap.from(".spa-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".spa-title", start: "top 85%" },
      });

      gsap.from(".spa-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".spa-grid", start: "top 80%" },
      });

      // Atmospheric dark sub-section
      gsap.from(".spa-atmosphere", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".spa-atmosphere", start: "top 75%" },
      });

      gsap.from(".spa-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".spa-cta", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spa"
      className="bg-day relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="spa-eyebrow eyebrow mb-4">{t("subtitle")}</p>
          <h2 className="spa-title heading-section" style={{ color: "var(--color-text-primary)" }}>
            {t("title")}
          </h2>
        </div>

        {/* 2x2 service cards */}
        <div className="spa-grid grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-20 max-w-4xl mx-auto">
          {services.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="spa-card bg-day-card group relative rounded-2xl bg-white border border-sand-dark/30 hover:border-gold/50 transition-all duration-500 p-10 text-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand/30 mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                  <Icon
                    className="text-gold group-hover:scale-110 transition-transform duration-500"
                    size={32}
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl mb-3" style={{ color: "var(--color-text-primary)" }}>
                  {t(`${key}.name`)}
                </h3>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {t(`${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Gold divider lines between card rows */}
        <div className="section-divider max-w-xs mx-auto mb-20" />

        {/* Atmospheric dark sub-section — candlelit spa */}
        <div
          className="spa-atmosphere relative rounded-2xl overflow-hidden mb-20"
          style={{ clipPath: "inset(0 0% 0 0)" }}
        >
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80"
              alt="Spa atmosphere"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="pull-quote text-white text-center max-w-2xl px-6">
                &ldquo;Un sanctuaire de sérénité au cœur du désert&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="spa-cta text-center">
          <a
            href="#reservation"
            className="inline-block rounded-full bg-gold px-10 py-4 text-white font-medium text-sm uppercase tracking-[0.15em] hover:bg-gold-light transition-colors duration-500"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
