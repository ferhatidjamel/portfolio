"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X, Plus, Minus, Check } from "lucide-react";
import type { PalmEvent } from "@/types/events";

type Props = {
  event: PalmEvent;
  onClose: () => void;
};

export default function EventRegistrationModal({ event, onClose }: Props) {
  const t = useTranslations("events");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [notes, setNotes] = useState("");

  const title = locale === "ar" ? event.title_ar : locale === "en" ? event.title_en : event.title_fr;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save registration to localStorage for admin dashboard
    const registration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      event_id: event.id,
      event_title: title,
      registrant_name: fullName,
      phone,
      adults,
      children,
      notes,
      status: "pending" as const,
      created_at: new Date().toISOString(),
    };
    const stored = localStorage.getItem("palm_registrations");
    const regs = stored ? JSON.parse(stored) : [];
    regs.push(registration);
    localStorage.setItem("palm_registrations", JSON.stringify(regs));
    setSubmitted(true);
  };

  const whatsappText = encodeURIComponent(
    `Event Registration:\n${title}\nDate: ${event.date}\nTime: ${event.time}\nName: ${fullName}\nPhone: ${phone}\nAdults: ${adults}\nChildren: ${children}${notes ? `\nNotes: ${notes}` : ""}`
  );

  const Stepper = ({
    value,
    onChange,
    min = 0,
    max = 20,
    label,
  }: {
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
    label: string;
  }) => (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-white transition-all"
          style={{ color: "var(--color-gold)" }}
        >
          <Minus size={16} />
        </button>
        <span className="text-xl font-semibold w-8 text-center" style={{ color: "var(--color-text-primary)" }}>
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-white transition-all"
          style={{ color: "var(--color-gold)" }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#FAF7F2" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
        >
          <X size={16} style={{ color: "var(--color-text-primary)" }} />
        </button>

        {/* Event image strip */}
        <div className="relative h-[100px] overflow-hidden">
          <img src={event.image_url} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="p-8 md:p-10">
          {submitted ? (
            /* Success state */
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-green" />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl mb-4" style={{ color: "var(--color-text-primary)" }}>
                {t("successTitle")}
              </h3>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
                {t("successMsg")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/213XXXXXXXXX?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-gold text-white font-semibold text-center text-sm hover:opacity-90 transition-opacity"
                >
                  {t("whatsappShare")}
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-full border border-gold/40 font-semibold text-sm hover:bg-gold/5 transition-colors"
                  style={{ color: "var(--color-gold)" }}
                >
                  {t("close")}
                </button>
              </div>
            </div>
          ) : (
            /* Registration form */
            <>
              <h3 className="font-[family-name:var(--font-heading)] text-xl mb-1" style={{ color: "var(--color-text-primary)" }}>
                {title}
              </h3>
              <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
                {event.date} · {event.time}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="eyebrow block mb-2">{t("fullName")}</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition-colors"
                    style={{ color: "var(--color-text-primary)" }}
                  />
                </div>

                <div>
                  <label className="eyebrow block mb-2">{t("phone")}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition-colors"
                    style={{ color: "var(--color-text-primary)" }}
                  />
                </div>

                <div className="flex gap-8">
                  <Stepper value={adults} onChange={setAdults} min={1} label={t("adults")} />
                  <Stepper value={children} onChange={setChildren} label={t("children")} />
                </div>

                <div>
                  <label className="eyebrow block mb-2">{t("notes")}</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t("notesPlaceholder")}
                    rows={2}
                    className="w-full bg-transparent border-b border-gold/40 focus:border-gold py-3 outline-none transition-colors resize-none placeholder:text-text-light"
                    style={{ color: "var(--color-text-primary)" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] rounded-full bg-gold text-white font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  {t("confirm")}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
