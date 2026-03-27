"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-eyebrow", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-content", start: "top 80%" },
      });

      gsap.from(".about-quote", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-quote", start: "top 80%" },
      });

      gsap.from(".about-img-wrap", {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-img-wrap", start: "top 75%" },
      });

      gsap.to(".about-img-wrap img", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".about-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 85%" },
      });

      gsap.from(".about-stat", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-day relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="about-content flex flex-col lg:flex-row items-stretch gap-16 lg:gap-0">
          {/* Left — quote + text */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center pr-0 lg:pr-16">
            <p className="about-eyebrow eyebrow mb-8">{t("title")}</p>

            <blockquote
              className="about-quote pull-quote text-day mb-10"
              style={{ clipPath: "inset(0 0% 0 0)", color: "var(--color-text-primary)" }}
            >
              &ldquo;Au cœur du désert, nous avons trouvé le paradis&rdquo;
            </blockquote>

            <div className="gold-line w-16 mb-8" />

            <p className="about-text text-day-muted text-base md:text-[17px] leading-[1.8]" style={{ color: "var(--color-text-muted)" }}>
              {t("text")}
            </p>
          </div>

          {/* Right — image bleeding off edge */}
          <div className="w-full lg:w-[55%] relative">
            <div
              className="about-img-wrap relative aspect-[4/5] lg:aspect-auto lg:h-[600px] overflow-hidden rounded-2xl lg:rounded-l-2xl lg:rounded-r-none lg:-mr-12"
              style={{ clipPath: "inset(0 0 0 0%)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80"
                alt="Palm Garden oasis"
                className="h-[120%] w-full object-cover parallax-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats mt-20 flex flex-wrap justify-center gap-12 md:gap-20">
          {[
            { value: "6", label: t("stat1") },
            { value: "1", label: t("stat2") },
            { value: "∞", label: t("stat3") },
          ].map((stat) => (
            <div key={stat.label} className="about-stat text-center">
              <span className="block font-[family-name:var(--font-heading)] text-5xl md:text-6xl text-gold font-light mb-2">
                {stat.value}
              </span>
              <span className="text-sm uppercase tracking-[0.15em]" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
