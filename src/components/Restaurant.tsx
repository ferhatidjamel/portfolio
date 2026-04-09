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
      gsap.from(".rest-img-1", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".rest-row-1", start: "top 75%" },
      });

      gsap.from(".rest-text-1", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-text-1", start: "top 80%" },
      });

      gsap.from(".rest-img-2", {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".rest-row-2", start: "top 75%" },
      });

      gsap.from(".rest-text-2", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-text-2", start: "top 80%" },
      });

      gsap.from(".rest-highlight", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-highlights", start: "top 85%" },
      });

      [".rest-img-1 img", ".rest-img-2 img"].forEach((sel) => {
        gsap.to(sel, {
          yPercent: -8,
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
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Thin top divider */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ backgroundColor: "#F0E5D0" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Row 1 — text left, image right */}
        <div className="rest-row-1 flex flex-col lg:flex-row rtl:lg:flex-row-reverse items-center gap-12 lg:gap-20 mb-24">
          <div className="rest-text-1 w-full lg:w-1/2">
            <p className="eyebrow mb-4">{t("subtitle")}</p>
            <h2 className="heading-section mb-6" style={{ color: "#1A1208" }}>
              {t("title")}
            </h2>
            <div className="gold-line w-16 mb-8" />
            <p className="mb-10" style={{ color: "#6B5C42", fontSize: "17px", lineHeight: 1.8 }}>
              {t("text")}
            </p>

            <div className="rest-highlights flex flex-wrap gap-8 mb-10">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="rest-highlight flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#F0E5D0" }}
                  >
                    <Icon style={{ color: "#C8973A" }} size={18} strokeWidth={1.3} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "#1A1208" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#reservation"
              className="inline-block px-8 py-3 rounded-full text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-300"
              style={{ backgroundColor: "#C8973A", color: "#1A1208" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8B86D")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
            >
              {t("reserveCta")}
            </a>
            <p className="mt-3 text-xs uppercase tracking-[0.1em]" style={{ color: "#9C8B72" }}>
              {t("openToAll")}
            </p>
          </div>

          <div className="w-full lg:w-1/2">
            <div
              className="rest-img-1 relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0% 0 0)" }}
            >
              <img
                src="/images/cafeteria.jpg"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80";
                }}
                alt="Palm Garden cafeteria"
                className="h-[115%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Row 2 — image left, quote right */}
        <div className="rest-row-2 flex flex-col-reverse lg:flex-row rtl:lg:flex-row-reverse items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2">
            <div
              className="rest-img-2 relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0 0 0%)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80"
                alt="Breakfast spread"
                className="h-[115%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rest-text-2 w-full lg:w-1/2">
            <blockquote className="pull-quote mb-8">
              &ldquo;Savourez un voyage culinaire au c&oelig;ur de la gastronomie alg&eacute;rienne&rdquo;
            </blockquote>
            <div className="gold-line w-16 mb-8" />
            <p style={{ color: "#6B5C42", fontSize: "17px", lineHeight: 1.8 }}>
              {t("text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
