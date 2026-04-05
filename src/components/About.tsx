"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
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

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background image
      gsap.to(".about-bg-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Eyebrow — appears first
      gsap.from(".about-eyebrow", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-eyebrow", start: "top 88%" },
      });

      // Big quote — dramatic clipPath wipe from center
      gsap.from(".about-big-quote", {
        clipPath: "inset(0 50% 0 50%)",
        opacity: 0,
        duration: 1.6,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-big-quote", start: "top 82%" },
      });

      // Description text — fade up
      gsap.from(".about-description", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-description", start: "top 85%" },
      });

      // Gold line
      gsap.from(".about-gold-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-gold-line", start: "top 88%" },
      });

      // Stats bar — slide up with frosted glass
      gsap.from(".about-stats-bar", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-stats-bar", start: "top 95%" },
      });

      // Each stat staggers in
      gsap.from(".about-stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".about-stats-bar", start: "top 90%" },
      });

      // Progressive overlay darken on scroll
      gsap.to(".about-overlay-gradient", {
        opacity: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Full-bleed background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/about-palm-garden.jpg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1600&q=80";
          }}
          alt="Palm Garden resort panorama"
          className="about-bg-img absolute w-full h-[130%] object-cover object-center"
          style={{ top: "-15%" }}
          loading="lazy"
        />
      </div>

      {/* Progressive gradient overlay */}
      <div
        className="about-overlay-gradient absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(26,18,8,0.15) 0%, rgba(26,18,8,0.4) 40%, rgba(26,18,8,0.75) 70%, rgba(26,18,8,0.92) 100%)",
          opacity: 0.5,
        }}
      />

      {/* Subtle top vignette for nav readability */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(26,18,8,0.4), transparent)",
        }}
      />

      {/* Content layers */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen px-6 md:px-12 lg:px-20 pb-0">
        {/* Text content — positioned in lower portion */}
        <div className="max-w-5xl mb-12">
          {/* Eyebrow */}
          <p
            className="about-eyebrow uppercase text-xs tracking-[0.25em] font-medium mb-6"
            style={{ color: "#C8973A" }}
          >
            {t("title")}
          </p>

          {/* Big immersive quote */}
          <h2
            className="about-big-quote font-[family-name:var(--font-heading)] italic font-light leading-[1.1] mb-8"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              color: "#FAF7F2",
              clipPath: "inset(0 0% 0 0%)",
            }}
          >
            Au c&oelig;ur du d&eacute;sert,
            <br />
            <span style={{ color: "#C8973A" }}>nous avons trouv&eacute; le paradis</span>
          </h2>

          {/* Gold accent line */}
          <div
            className="about-gold-line w-20 h-[2px] mb-8 origin-left"
            style={{ backgroundColor: "#C8973A" }}
          />

          {/* Description */}
          <p
            className="about-description max-w-2xl"
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

        {/* Stats bar with frosted glass */}
        <div
          className="about-stats-bar -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 py-8"
          style={{
            background: "rgba(26,18,8,0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(200,151,58,0.2)",
          }}
        >
          <div className="max-w-5xl mx-auto flex flex-wrap justify-between gap-8 md:gap-4">
            {[
              { value: 6, suffix: "", label: t("stat1") },
              { value: 2, suffix: "", label: t("stat2") },
              { value: 0, suffix: "", label: t("stat3"), icon: "☕" },
              { value: 0, suffix: "", label: t("stat4"), icon: "🍽" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="about-stat-item flex items-center gap-4 min-w-[140px]"
              >
                <span
                  className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-light"
                  style={{ color: "#C8973A" }}
                >
                  {"icon" in stat && stat.icon ? (
                    stat.icon
                  ) : (
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  )}
                </span>
                <span
                  className="text-xs uppercase tracking-[0.12em] leading-tight"
                  style={{ color: "rgba(250,247,242,0.7)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
