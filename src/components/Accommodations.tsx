"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accommodations = [
  {
    key: "chalets",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80",
  },
  {
    key: "domes",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=80",
  },
  {
    key: "salon",
    image: "https://images.unsplash.com/photo-1590490360182-c33d0e0a2a5e?w=1400&q=80",
  },
];

export default function Accommodations() {
  const t = useTranslations("accommodation");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.from(".acc-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".acc-header", start: "top 85%" },
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          const totalWidth = track.scrollWidth - window.innerWidth;

          gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalWidth}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hebergement"
      className="bg-day-secondary relative overflow-hidden"
      style={{ backgroundColor: "#F0E5D0" }}
    >
      {/* Header */}
      <div className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <p className="acc-header eyebrow mb-4">{t("subtitle")}</p>
        <h2 className="acc-header heading-section" style={{ color: "#1A1208" }}>
          {t("title")}
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-0 px-6 lg:px-0 pb-32 lg:pb-0"
      >
        {accommodations.map((acc) => {
          const tags = t(`${acc.key}.tags`).split(",");
          return (
            <div
              key={acc.key}
              className="acc-card flex-shrink-0 w-full lg:w-[85vw] lg:h-screen relative overflow-hidden group"
            >
              <div className="relative h-[60vh] lg:h-full overflow-hidden">
                <img
                  src={acc.image}
                  alt={t(`${acc.key}.name`)}
                  className="acc-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-8 md:p-12 lg:p-16 flex items-end justify-between">
                <div>
                  <h3
                    className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl mb-3"
                    style={{ color: "#FAF7F2", fontWeight: 400 }}
                  >
                    {t(`${acc.key}.name`)}
                  </h3>
                  <p style={{ color: "rgba(250,247,242,0.7)", fontSize: "15px", lineHeight: 1.7 }} className="max-w-lg">
                    {t(`${acc.key}.description`)}
                  </p>
                </div>
                <div className="hidden md:flex flex-wrap gap-2 max-w-xs justify-end">
                  {tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
