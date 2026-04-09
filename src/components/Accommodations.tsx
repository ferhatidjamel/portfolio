"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BedDouble, UtensilsCrossed, Snowflake, Wifi, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const chaletViews = [
  {
    key: "exterior",
    image: "/images/chalets-exterior.jpg",
    fallback: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=80",
  },
  {
    key: "interior",
    image: "/images/chalets-interior.jpg",
    fallback: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1400&q=80",
  },
  {
    key: "services",
    image: "/images/chalets-services.jpg",
    fallback: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80",
  },
];

const amenityIcons = [
  { icon: BedDouble, labelKey: "amenities.beds" },
  { icon: UtensilsCrossed, labelKey: "amenities.roomService" },
  { icon: Snowflake, labelKey: "amenities.ac" },
  { icon: Wifi, labelKey: "amenities.wifi" },
  { icon: Waves, labelKey: "amenities.pool" },
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
      className="relative overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Full pinned viewport — header + cards share the screen */}
      <div className="lg:h-screen lg:flex lg:flex-col">
        {/* Header */}
        <div className="pt-24 lg:pt-12 pb-8 lg:pb-4 px-6 md:px-12 max-w-7xl mx-auto w-full flex-shrink-0">
          <p className="acc-header eyebrow mb-3">{t("subtitle")}</p>
          <h2 className="acc-header heading-section" style={{ color: "#1A1208" }}>
            {t("title")}
          </h2>
          <p
            className="acc-header mt-4 max-w-2xl"
            style={{ color: "#6B5C42", fontSize: "16px", lineHeight: 1.7 }}
          >
            {t("intro")}
          </p>
        </div>

        {/* Horizontal scroll track — fills remaining height */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-6 px-6 lg:px-6 pb-24 lg:pb-6 lg:flex-1 lg:min-h-0"
        >
          {chaletViews.map((view) => (
            <div
              key={view.key}
              className="acc-card flex-shrink-0 w-full lg:w-[70vw] relative overflow-hidden group rounded-2xl lg:h-full"
            >
              <div className="relative h-[60vh] lg:h-full overflow-hidden rounded-2xl">
                <img
                  src={view.image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = view.fallback;
                  }}
                  alt={t(`views.${view.key}.alt`)}
                  className="acc-img h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-10 lg:p-12">
                <p
                  className="uppercase text-xs tracking-[0.2em] font-medium mb-2"
                  style={{ color: "#E8B86D" }}
                >
                  {t(`views.${view.key}.label`)}
                </p>
                <h3
                  className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl lg:text-4xl mb-2"
                  style={{ color: "#FAF7F2", fontWeight: 400 }}
                >
                  {t(`views.${view.key}.title`)}
                </h3>
                <p
                  style={{
                    color: "rgba(250,247,242,0.75)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                  }}
                  className="max-w-lg"
                >
                  {t(`views.${view.key}.description`)}
                </p>
              </div>
            </div>
          ))}

          {/* Final card: amenities + pricing */}
          <div
            className="acc-card flex-shrink-0 w-full lg:w-[50vw] relative overflow-hidden rounded-2xl lg:h-full flex flex-col justify-center"
            style={{ backgroundColor: "#1A1208" }}
          >
            <div className="p-8 md:p-12 lg:p-16">
              <p
                className="uppercase text-xs tracking-[0.2em] font-medium mb-4"
                style={{ color: "#C8973A" }}
              >
                {t("amenitiesTitle")}
              </p>
              <h3
                className="font-[family-name:var(--font-heading)] italic text-3xl md:text-4xl font-light mb-10"
                style={{ color: "#FAF7F2" }}
              >
                {t("amenitiesSubtitle")}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                {amenityIcons.map(({ icon: Icon, labelKey }) => (
                  <div key={labelKey} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(200,151,58,0.15)" }}
                    >
                      <Icon size={18} style={{ color: "#C8973A" }} strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(250,247,242,0.8)" }}
                    >
                      {t(labelKey)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div
                className="inline-block px-8 py-5 rounded-2xl"
                style={{
                  border: "1px solid rgba(200,151,58,0.3)",
                  backgroundColor: "rgba(200,151,58,0.08)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.15em] mb-1"
                  style={{ color: "#9C8B72" }}
                >
                  {t("priceLabel")}
                </p>
                <p
                  className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl"
                  style={{ color: "#C8973A" }}
                >
                  {t("price")}
                </p>
              </div>

              {/* Room service badge */}
              <div
                className="mt-8 flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(200,151,58,0.1)" }}
              >
                <UtensilsCrossed size={18} style={{ color: "#C8973A" }} strokeWidth={1.5} />
                <span className="text-sm" style={{ color: "rgba(250,247,242,0.85)" }}>
                  {t("roomServiceNote")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
