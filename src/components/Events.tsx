"use client";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock } from "lucide-react";
import { seedEvents } from "@/data/events";
import type { PalmEvent } from "@/types/events";
import EventRegistrationModal from "./EventRegistrationModal";

gsap.registerPlugin(ScrollTrigger);

function isWithin48Hours(dateStr: string): boolean {
  const eventDate = new Date(dateStr);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();
  return diff > 0 && diff < 48 * 60 * 60 * 1000;
}

function formatDateBadge(dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase();
  return { day, month };
}

export default function Events() {
  const t = useTranslations("events");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<PalmEvent | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".events-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".events-header", start: "top 85%" },
      });

      gsap.from(".event-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".events-grid", start: "top 85%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events = seedEvents.filter((e) => e.is_active);

  return (
    <>
      <section
        ref={sectionRef}
        id="events"
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="events-header text-center mb-16">
            <p className="eyebrow mb-4">{t("eyebrow")}</p>
            <h2
              className="font-[family-name:var(--font-heading)] italic font-light leading-[1.1]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#1A1208" }}
            >
              {t("title")}
            </h2>
            <div className="gold-line w-20 mx-auto mt-6" />
          </div>

          {/* Responsive card grid */}
          <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {events.map((event) => {
              const title =
                locale === "ar"
                  ? event.title_ar
                  : locale === "en"
                    ? event.title_en
                    : event.title_fr;
              const desc =
                locale === "ar"
                  ? event.description_ar
                  : locale === "en"
                    ? event.description_en
                    : event.description_fr;
              const { day, month } = formatDateBadge(event.date);
              const isLive = isWithin48Hours(event.date);

              return (
                <article
                  key={event.id}
                  className="event-card rounded-2xl overflow-hidden flex flex-col transition-shadow duration-500 hover:shadow-lg"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #F0E5D0",
                    boxShadow: "0 1px 3px rgba(26,18,8,0.04)",
                  }}
                >
                  {/* Image area */}
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* Category badge */}
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider font-medium"
                      style={{
                        backgroundColor: "rgba(45,80,22,0.85)",
                        color: "#FAF7F2",
                      }}
                    >
                      {t(`categories.${event.category}`)}
                    </span>

                    {/* Date badge */}
                    <div
                      className="absolute top-3 right-3 w-12 h-14 rounded-lg flex flex-col items-center justify-center shadow-md"
                      style={{ backgroundColor: "#C8973A" }}
                    >
                      <span className="text-lg font-bold leading-none" style={{ color: "#FAF7F2" }}>
                        {day}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(250,247,242,0.8)" }}>
                        {month}
                      </span>
                    </div>

                    {/* Live pulse */}
                    {isLive && (
                      <div className="absolute top-5 right-[68px] flex items-center gap-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                        </span>
                        <span className="text-[10px] text-white font-medium uppercase tracking-wider">
                          {t("live")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className="font-[family-name:var(--font-heading)] text-xl mb-2 line-clamp-1"
                      style={{ color: "#1A1208", fontWeight: 400 }}
                    >
                      {title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4 line-clamp-2 flex-1"
                      style={{ color: "#6B5C42" }}
                    >
                      {desc}
                    </p>

                    <div className="flex items-center gap-1.5 mb-4">
                      <MapPin size={12} style={{ color: "#C8973A" }} />
                      <span className="text-[11px]" style={{ color: "#C8973A" }}>
                        {t("location")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} style={{ color: "#6B5C42" }} />
                        <span className="text-xs" style={{ color: "#6B5C42" }}>
                          {event.time}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedEvent(event)}
                        className="rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: "#C8973A",
                          color: "#1A1208",
                          padding: "8px 20px",
                          fontSize: "11px",
                          fontWeight: 500,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8B86D")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
                      >
                        {t("register")}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
