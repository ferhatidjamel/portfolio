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
      // Image clip-path reveal
      gsap.from(".restaurant-img", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: ".restaurant-img",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Image parallax
      gsap.to(".restaurant-img img", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ".restaurant-img",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Subtitle tag
      gsap.from(".restaurant-tag", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".restaurant-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Title
      gsap.from(".restaurant-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".restaurant-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Description
      gsap.from(".restaurant-desc", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".restaurant-text",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Highlights stagger
      gsap.from(".restaurant-highlight", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".restaurant-highlights",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Decorative line
      gsap.from(".restaurant-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".restaurant-line",
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
      id="restaurant"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0D0A06 0%, #131008 30%, #131008 70%, #0D0A06 100%)",
      }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial split layout */}
        <div className="flex flex-col lg:flex-row rtl:lg:flex-row-reverse items-center gap-16 lg:gap-24">
          {/* Image side — 50% */}
          <div className="w-full lg:w-1/2">
            <div
              className="restaurant-img relative aspect-[4/5] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt=""
                className="h-[120%] w-full object-cover parallax-img"
              />
              {/* Gold overlay on bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#131008]/80 to-transparent" />
            </div>
          </div>

          {/* Text side — 50% */}
          <div className="restaurant-text w-full lg:w-1/2">
            <p className="restaurant-tag text-gold uppercase tracking-[0.25em] text-xs md:text-sm mb-4">
              {t("subtitle")}
            </p>

            <div className="restaurant-line section-divider w-16 mb-8 origin-left" />

            <h2 className="restaurant-title font-[family-name:var(--font-heading)] text-cream text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
              {t("title")}
            </h2>

            <p className="restaurant-desc text-cream/60 text-base md:text-lg leading-relaxed mb-12">
              {t("text")}
            </p>

            <div className="restaurant-highlights flex flex-wrap gap-10">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="restaurant-highlight flex items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Icon
                      className="text-gold"
                      size={22}
                      strokeWidth={1.3}
                    />
                  </div>
                  <span className="text-cream/80 text-sm md:text-base font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
