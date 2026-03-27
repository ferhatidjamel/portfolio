"use client";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const accommodations = [
  {
    key: "chalets" as const,
    number: "01",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    imagePosition: "left" as const,
  },
  {
    key: "domes" as const,
    number: "02",
    image:
      "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=800&q=80",
    imagePosition: "right" as const,
  },
  {
    key: "salon" as const,
    number: "03",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d36de3cee?w=800&q=80",
    imagePosition: "left" as const,
  },
];

export default function Accommodations() {
  const t = useTranslations("accommodation");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const imageWrapper = card.querySelector(".card-image-wrapper");
        const textContent = card.querySelector(".card-text-content");
        const textChildren = textContent?.children;
        const isLeft = accommodations[index].imagePosition === "left";

        // Image clip-path reveal
        if (imageWrapper) {
          gsap.fromTo(
            imageWrapper,
            {
              clipPath: isLeft
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
            },
            {
              clipPath: "inset(0 0% 0 0%)",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Text content fade in and slide up with stagger
        if (textChildren && textChildren.length > 0) {
          gsap.fromTo(
            Array.from(textChildren),
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.12,
              scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hebergement"
      ref={sectionRef}
      className="bg-[#0D0A06] py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="inline-block text-gold uppercase tracking-[0.3em] text-sm mb-6">
            HÉBERGEMENT
          </span>
          <h2 className="font-[family-name:var(--font-heading)] display-text text-cream text-4xl md:text-6xl lg:text-7xl mb-6">
            {t("title")}
          </h2>
          <p className="text-cream/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-0">
          {accommodations.map((item, index) => {
            const tags = t(`${item.key}.tags`)
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);

            const isImageLeft = item.imagePosition === "left";

            return (
              <div key={item.key}>
                <div
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`flex flex-col ${
                    isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  } w-full min-h-[500px]`}
                >
                  {/* Image side */}
                  <div className="w-full lg:w-[55%] overflow-hidden rounded-xl card-image-wrapper">
                    <div className="relative h-[350px] lg:h-full min-h-[500px] overflow-hidden group">
                      <img
                        src={item.image}
                        alt={t(`${item.key}.name`)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-center relative px-6 py-12 lg:px-16 lg:py-16">
                    <div className="card-text-content">
                      {/* Decorative number */}
                      <div className="text-gold/20 text-8xl font-[family-name:var(--font-heading)] absolute top-4 lg:top-8 right-8 lg:right-16 select-none pointer-events-none">
                        {item.number}
                      </div>

                      {/* Name */}
                      <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-heading)] text-cream mb-6 relative z-10">
                        {t(`${item.key}.name`)}
                      </h3>

                      {/* Description */}
                      <p className="text-cream/70 leading-relaxed text-base md:text-lg mb-8 relative z-10">
                        {t(`${item.key}.description`)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-gold/30 text-gold/80 text-xs uppercase px-3 py-1 rounded-full tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Learn more button */}
                      <div className="relative z-10">
                        <button className="group/btn inline-flex items-center gap-2 text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-all duration-300 text-sm uppercase tracking-wider">
                          {t("learnMore")}
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section divider between cards */}
                {index < accommodations.length - 1 && (
                  <div className="section-divider flex justify-center py-16">
                    <div className="w-[60%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
