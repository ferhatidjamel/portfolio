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
    { icon: UtensilsCrossed, label: t("dinner"), desc: t("dinnerDesc") },
    { icon: Coffee, label: t("breakfast"), desc: t("breakfastDesc") },
    { icon: Wine, label: t("cafe"), desc: t("cafeDesc") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to(".rest-hero-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".rest-hero",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero text layers
      gsap.from(".rest-eyebrow", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-eyebrow", start: "top 88%" },
      });

      gsap.from(".rest-title", {
        clipPath: "inset(0 50% 0 50%)",
        opacity: 0,
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".rest-title", start: "top 84%" },
      });

      gsap.from(".rest-desc", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-desc", start: "top 88%" },
      });

      // Progressive overlay
      gsap.to(".rest-hero-overlay", {
        opacity: 0.75,
        ease: "none",
        scrollTrigger: {
          trigger: ".rest-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Feature cards stagger in
      gsap.from(".rest-feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-features", start: "top 80%" },
      });

      // CTA
      gsap.from(".rest-cta", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".rest-cta", start: "top 90%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="restaurant" className="relative overflow-hidden">
      {/* ===== HERO ZONE — Full-bleed cafeteria image ===== */}
      <div className="rest-hero relative overflow-hidden" style={{ minHeight: "90vh" }}>
        {/* Background image with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/cafeteria.jpg"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80";
            }}
            alt="Palm Garden cafeteria interior"
            className="rest-hero-img absolute w-full h-[130%] object-cover object-center"
            style={{ top: "-15%" }}
            loading="lazy"
          />
        </div>

        {/* Progressive gradient overlay */}
        <div
          className="rest-hero-overlay absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,18,8,0.1) 0%, rgba(26,18,8,0.35) 40%, rgba(26,18,8,0.7) 70%, rgba(26,18,8,0.9) 100%)",
            opacity: 0.5,
          }}
        />

        {/* Content — positioned in lower portion */}
        <div className="relative z-10 flex flex-col justify-end min-h-[90vh] px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-4xl">
            <p
              className="rest-eyebrow uppercase text-xs tracking-[0.25em] font-medium mb-5"
              style={{ color: "#C8973A" }}
            >
              {t("subtitle")}
            </p>

            <h2
              className="rest-title font-[family-name:var(--font-heading)] italic font-light leading-[1.1] mb-8"
              style={{
                fontSize: "clamp(36px, 6vw, 80px)",
                color: "#FAF7F2",
                clipPath: "inset(0 0% 0 0%)",
              }}
            >
              {t("title")}
            </h2>

            <div className="w-20 h-[2px] mb-8" style={{ backgroundColor: "#C8973A" }} />

            <p
              className="rest-desc max-w-2xl"
              style={{
                color: "rgba(250,247,242,0.85)",
                fontSize: "17px",
                lineHeight: 1.9,
                fontWeight: 300,
              }}
            >
              {t("text")}
            </p>
          </div>
        </div>
      </div>

      {/* ===== FEATURE STRIP — Dark band with mashrabiya pattern ===== */}
      <div
        className="rest-features mashrabiya-bg relative py-20 md:py-24"
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rest-feature-card rounded-2xl p-8 md:p-10 flex flex-col items-start gap-5"
                style={{
                  backgroundColor: "rgba(250,247,242,0.06)",
                  border: "1px solid rgba(200,151,58,0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(200,151,58,0.15)" }}
                >
                  <Icon size={24} style={{ color: "#E8B86D" }} strokeWidth={1.3} />
                </div>
                <h3
                  className="font-[family-name:var(--font-heading)] text-xl md:text-2xl"
                  style={{ color: "#FAF7F2", fontWeight: 400 }}
                >
                  {label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(250,247,242,0.65)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== CTA ZONE ===== */}
      <div
        className="rest-cta relative py-16 md:py-20"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote
            className="font-[family-name:var(--font-heading)] italic text-2xl md:text-3xl font-light mb-8 leading-relaxed"
            style={{ color: "#C8973A" }}
          >
            &ldquo;Savourez un voyage culinaire au c&oelig;ur de la gastronomie alg&eacute;rienne&rdquo;
          </blockquote>

          <a
            href="#reservation"
            className="inline-block px-10 py-4 rounded-full text-xs uppercase tracking-[0.12em] font-medium transition-colors duration-300"
            style={{ backgroundColor: "#C8973A", color: "#1A1208" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8B86D")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
          >
            {t("reserveCta")}
          </a>
          <p className="mt-4 text-xs uppercase tracking-[0.1em]" style={{ color: "#9C8B72" }}>
            {t("openToAll")}
          </p>
        </div>
      </div>
    </section>
  );
}
