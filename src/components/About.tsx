"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Waves, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Home, label: t("stat1") },
    { icon: Waves, label: t("stat2") },
    { icon: Sparkles, label: t("stat3") },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image clip-path reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { y: -80 },
          {
            y: 80,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Heading — split into words, animate each
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        const words = text.split(" ");
        headingRef.current.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="about-word inline-block">${word}</span></span>`
          )
          .join(
            '<span class="inline-block overflow-hidden"><span class="about-word inline-block">&nbsp;</span></span>'
          );

        gsap.fromTo(
          headingRef.current.querySelectorAll(".about-word"),
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // Gold line scaleX
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // Paragraph fade in + slide up
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 70%",
            },
          }
        );
      }

      // Stats stagger fade in from bottom
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll(".about-stat");
        gsap.fromTo(
          items,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 70%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-gradient-to-b from-[#1A150D] to-[#0D0A06] py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">
          {/* Left — Image (55%) */}
          <div className="w-full lg:w-[55%]">
            <div
              ref={imageWrapperRef}
              className="aspect-[3/4] rounded-xl overflow-hidden"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80"
                alt=""
                className="h-[120%] w-full object-cover will-change-transform"
              />
            </div>
          </div>

          {/* Right — Text content (45%) */}
          <div className="w-full lg:w-[45%] lg:pl-16 xl:pl-24 flex flex-col justify-center">
            {/* Decorative label */}
            <span className="uppercase text-xs tracking-[0.3em] text-[#C8A45A] mb-6 block">
              NOTRE HISTOIRE
            </span>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl text-cream mb-8"
            >
              {t("title")}
            </h2>

            {/* Gold line */}
            <div
              ref={lineRef}
              className="w-[60px] h-px bg-[#C8A45A] mb-8"
            />

            {/* Paragraph */}
            <p
              ref={paragraphRef}
              className="text-cream/70 text-lg leading-relaxed mb-12"
            >
              {t("text")}
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center gap-0">
              {stats.map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center">
                  {i > 0 && (
                    <div className="w-px h-10 bg-[#C8A45A]/40 mx-6" />
                  )}
                  <div className="about-stat flex items-center gap-3">
                    <Icon
                      className="text-[#C8A45A] shrink-0"
                      size={24}
                      strokeWidth={1.5}
                    />
                    <span className="text-[#C8A45A] text-sm md:text-base font-medium">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
