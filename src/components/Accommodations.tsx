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
      {/* Full pinned viewport — header + cards share the screen */}
      <div className="lg:h-screen lg:flex lg:flex-col">
        {/* Header */}
        <div className="pt-20 lg:pt-10 pb-8 lg:pb-4 px-6 md:px-12 max-w-7xl mx-auto w-full flex-shrink-0">
          <p className="acc-header eyebrow mb-3">{t("subtitle")}</p>
          <h2 className="acc-header heading-section" style={{ color: "#1A1208" }}>
            {t("title")}
          </h2>
        </div>

        {/* Horizontal scroll track — fills remaining height */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-6 px-6 lg:px-6 pb-24 lg:pb-6 lg:flex-1 lg:min-h-0"
        >
          {accommodations.map((acc) => {
            const tags = t(`${acc.key}.tags`).split(",");
            return (
              <div
                key={acc.key}
                className="acc-card flex-shrink-0 w-full lg:w-[70vw] relative overflow-hidden group rounded-2xl lg:h-full"
              >
                <div className="relative h-[60vh] lg:h-full overflow-hidden rounded-2xl">
                  <img
                    src={acc.image}
                    alt={t(`${acc.key}.name`)}
                    className="acc-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 lg:p-12 flex items-end justify-between">
                  <div>
                    <h3
                      className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl mb-2"
                      style={{ color: "#FAF7F2", fontWeight: 400 }}
                    >
                      {t(`${acc.key}.name`)}
                    </h3>
                    <p
                      style={{
                        color: "rgba(250,247,242,0.75)",
                        fontSize: "15px",
                        lineHeight: 1.7,
                      }}
                      className="max-w-lg mb-3"
                    >
                      {t(`${acc.key}.description`)}
                    </p>
                    <p className="text-sm font-medium" style={{ color: "#E8B86D" }}>
                      {t(`${acc.key}.price`)}
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
      </div>
    </section>
  );
}
