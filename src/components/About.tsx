"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => setDisplayed(Math.round(obj.val)),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{displayed}</span>;
}

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

      gsap.from(".about-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-title", start: "top 85%" },
      });

      gsap.from(".about-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-text", start: "top 85%" },
      });

      gsap.from(".about-img-wrap", {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-img-wrap", start: "top 75%" },
      });

      gsap.to(".about-img-wrap img", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-img-wrap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".about-stat", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-stats", start: "top 88%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="about-content flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left — text */}
          <div className="w-full lg:w-[45%]">
            <p className="about-eyebrow eyebrow mb-6">{t("title")}</p>

            <h2
              className="about-title font-[family-name:var(--font-heading)] italic font-light leading-[1.15] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "#1A1208" }}
            >
              Au c&oelig;ur du d&eacute;sert,{" "}
              <span style={{ color: "#C8973A" }}>nous avons trouv&eacute; le paradis</span>
            </h2>

            <div className="gold-line w-16 mb-8" />

            <p className="about-text" style={{ color: "#6B5C42", fontSize: "17px", lineHeight: 1.8 }}>
              {t("text")}
            </p>
          </div>

          {/* Right — image */}
          <div className="w-full lg:w-[55%]">
            <div
              className="about-img-wrap relative aspect-[4/3] overflow-hidden rounded-2xl"
              style={{ clipPath: "inset(0 0 0 0%)" }}
            >
              <img
                src="/images/about-palm-garden.webp"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1200&q=80";
                }}
                alt="Palm Garden oasis panorama"
                className="h-[115%] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats mt-20 flex flex-wrap justify-center gap-12 md:gap-20">
          {[
            { value: 6, label: t("stat1") },
            { value: 2, label: t("stat2") },
            { value: 0, label: t("stat3"), icon: "☕" },
            { value: 0, label: t("stat4"), icon: "🍽" },
          ].map((stat) => (
            <div key={stat.label} className="about-stat text-center">
              <span
                className="block font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-light mb-2"
                style={{ color: "#C8973A" }}
              >
                {"icon" in stat && stat.icon ? stat.icon : <CountUp target={stat.value} />}
              </span>
              <span className="text-sm uppercase tracking-[0.15em]" style={{ color: "#6B5C42" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
