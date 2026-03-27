"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UtensilsCrossed, Coffee, Wine } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Restaurant() {
  const t = useTranslations("restaurant");
  const sectionRef = useRef<HTMLElement>(null);

  const highlights = [
    { icon: UtensilsCrossed, label: t("dinner") },
    { icon: Coffee, label: t("breakfast") },
    { icon: Wine, label: t("cafe") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: image left reveal
      gsap.from(".rest-img-1", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".rest-row-1", start: "top 75%" },
      });

      gsap.from(".rest-text-1", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rest-text-1", start: "top 80%" },
      });

      // Row 2: image right reveal
      gsap.from(".rest-img-2", {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".rest-row-2", start: "top 75%" },
      });

      gsap.from(".rest-text-2", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rest-text-2", start: "top 80%" },
      });

      // Highlights
      gsap.from(".rest-highlight", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".rest-highlights", start: "top 85%" },
      });

      // Parallax on images
      [".rest-img-1 img", ".rest-img-2 img"].forEach((sel) => {
        gsap.to(sel, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="restaurant"
      className="bg-day relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Row 1: cream left + full-bleed photo right */}
        <div className="rest-row-1 flex flex-col lg:flex-row rtl:lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-24">
          {/* Text */}
          <div className="rest-text-1 w-full lg:w-1/2">
            <p className="eyebrow mb-4">{t("subtitle")}</p>
            <h2 className="heading-section mb-6" style={{ color: "var(--color-text-primary)" }}>
              {t("title")}
            </h2>
            <div className="gold-line w-16 mb-8" />
            <p className="text-base md:text-[17px] leading-[1.8] mb-10" style={{ color: "var(--color-text-muted)" }}>
              {t("text")}
            </p>

            <div className="rest-highlights flex flex-wrap gap-8">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="rest-highlight flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                    <Icon className="text-gold" size={20} strokeWidth={1.3} />
                  </div>
                  <span className="text-sm md:text-base font-medium" style={{ color: "var(--color-text-primary)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image — dome restaurant interior */}
          <div className="w-full lg:w-1/2">
            <div
              className="rest-img-1 relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Restaurant interior"
                className="h-[120%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Row 2: full-bleed photo left + text right */}
        <div className="rest-row-2 flex flex-col-reverse lg:flex-row rtl:lg:flex-row-reverse items-center gap-12 lg:gap-20">
          {/* Image — breakfast */}
          <div className="w-full lg:w-1/2">
            <div
              className="rest-img-2 relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0 0 0%)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80"
                alt="Breakfast buffet"
                className="h-[120%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="rest-text-2 w-full lg:w-1/2">
            <p className="pull-quote mb-8" style={{ color: "var(--color-text-primary)" }}>
              &ldquo;Savourez un voyage culinaire au cœur de la gastronomie algérienne&rdquo;
            </p>
            <div className="gold-line w-16 mb-8" />
            <p className="text-base md:text-[17px] leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>
              {t("text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
