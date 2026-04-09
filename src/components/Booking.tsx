"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Send,
  X,
} from "lucide-react";
import "react-day-picker/style.css";
import blockedDatesData from "@/data/blockedDates.json";

type BookingData = {
  type: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  date: Date | undefined;
  timeFrom: string;
  timeTo: string;
  guests: number;
  breakfast: boolean;
  catering: boolean;
  cateringType: string;
  poolAccess: boolean;
  poolDuration: string;
  waitstaff: boolean;
  waitstaffCount: number;
  kidsActivities: boolean;
  kidsCount: number;
  decoration: boolean;
  avEquipment: boolean;
  shootingZones: string[];
  fullName: string;
  phone: string;
  email: string;
  whatsapp: string;
  message: string;
  langPref: string;
};

const initialBookingData: BookingData = {
  type: "",
  checkIn: undefined,
  checkOut: undefined,
  date: undefined,
  timeFrom: "",
  timeTo: "",
  guests: 1,
  breakfast: false,
  catering: false,
  cateringType: "buffet",
  poolAccess: false,
  poolDuration: "halfDay",
  waitstaff: false,
  waitstaffCount: 1,
  kidsActivities: false,
  kidsCount: 1,
  decoration: false,
  avEquipment: false,
  shootingZones: [],
  fullName: "",
  phone: "",
  email: "",
  whatsapp: "",
  message: "",
  langPref: "Français",
};

const BOOKING_TYPES = [
  "chalet",
  "wedding",
  "venue",
  "conference",
  "family",
  "photoshoot",
] as const;

const ZONE_KEYS = ["garden", "domes", "salon", "pool"] as const;

export default function Booking() {
  const t = useTranslations("booking");
  const [step, setStep] = useState(2);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<BookingData>(initialBookingData);
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const blockedDates = blockedDatesData.blockedDates.map(
    (d: string) => new Date(d)
  );

  const steps = [t("step2"), t("step3"), t("step4"), t("step5")];

  const update = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, 5)); };
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 2)); };

  const openModal = (type: string) => {
    update({ type });
    setStep(2);
    setDirection(1);
    setSubmitted(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setData(initialBookingData);
    setStep(2);
    setSubmitted(false);
  };

  // Lock body scroll + stop Lenis when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [modalOpen]);

  const canProceed = () => {
    switch (step) {
      case 2:
        if (data.type === "chalet") return !!data.checkIn && !!data.checkOut;
        return !!data.date && !!data.timeFrom && !!data.timeTo;
      case 3: return true;
      case 4:
        return data.fullName.trim() !== "" && data.phone.trim() !== "" && data.email.trim() !== "";
      default: return true;
    }
  };

  const handleSubmit = () => setSubmitted(true);
  const resetBooking = () => { setData(initialBookingData); setStep(2); setDirection(1); setSubmitted(false); setModalOpen(false); };

  const buildWhatsAppText = () => {
    let text = `Booking Request:\nType: ${data.type}\n`;
    if (data.type === "chalet") {
      if (data.checkIn) text += `Check-in: ${format(data.checkIn, "PPP")}\n`;
      if (data.checkOut) text += `Check-out: ${format(data.checkOut, "PPP")}\n`;
    } else {
      if (data.date) text += `Date: ${format(data.date, "PPP")}\n`;
      if (data.timeFrom && data.timeTo) text += `Time: ${data.timeFrom} — ${data.timeTo}\n`;
    }
    text += `Guests: ${data.guests}\n`;
    if (data.breakfast) text += `Breakfast: Yes\n`;
    if (data.catering) text += `Catering: ${data.cateringType}\n`;
    if (data.poolAccess) text += `Pool Access: ${data.poolDuration}\n`;
    if (data.waitstaff) text += `Waitstaff: ${data.waitstaffCount} person(s)\n`;
    if (data.kidsActivities) text += `Kids Activities: ${data.kidsCount} kid(s)\n`;
    if (data.decoration) text += `Decoration: Yes\n`;
    if (data.avEquipment) text += `AV Equipment: Yes\n`;
    if (data.shootingZones.length > 0) text += `Shooting Zones: ${data.shootingZones.join(", ")}\n`;
    text += `\nName: ${data.fullName}\nPhone: ${data.phone}\nEmail: ${data.email}`;
    if (data.whatsapp) text += `\nWhatsApp: ${data.whatsapp}`;
    if (data.message) text += `\nMessage: ${data.message}`;
    return encodeURIComponent(text);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const typeIconMap: Record<string, string> = {
    chalet: "\u{1F319}", wedding: "\u{1F48D}", venue: "\u{1F3E2}",
    conference: "\u{1F393}", family: "\u{1F389}", photoshoot: "\u{1F4F8}",
  };
  const timeSlots = t("timeSlots").split(",");

  const inputClasses =
    "booking-input w-full bg-transparent border-b-[1.5px] px-0 py-3 outline-none transition-colors";

  const renderCheckbox = (label: string, checked: boolean, onChange: (v: boolean) => void) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        className="w-5 h-5 rounded flex items-center justify-center transition-all"
        style={{
          backgroundColor: checked ? "#C8973A" : "transparent",
          border: checked ? "2px solid #C8973A" : "2px solid rgba(156,139,114,0.5)",
        }}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span style={{ color: "#1A1208" }}>{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
    </label>
  );

  const renderNumberInput = (label: string, value: number, onChange: (v: number) => void, min = 1) => (
    <div className="flex items-center gap-3">
      <span className="text-sm" style={{ color: "#6B5C42" }}>{label}</span>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || min))}
        className="booking-input w-20 bg-transparent border-b-[1.5px] px-3 py-2 text-center outline-none transition-colors"
        style={{ borderColor: "#F0E5D0", color: "#1A1208" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#C8973A")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#F0E5D0")}
      />
    </div>
  );

  const renderRadio = (name: string, options: { value: string; label: string }[], selected: string, onChange: (v: string) => void) => (
    <div className="flex gap-4 ml-8">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ border: `2px solid ${selected === opt.value ? "#C8973A" : "rgba(156,139,114,0.5)"}` }}
          >
            {selected === opt.value && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#C8973A" }} />}
          </div>
          <span className="text-sm" style={{ color: "#6B5C42" }}>{opt.label}</span>
          <input type="radio" name={name} value={opt.value} checked={selected === opt.value} onChange={() => onChange(opt.value)} className="sr-only" />
        </label>
      ))}
    </div>
  );

  const renderCateringSelector = () => (
    <div className="ml-8 flex gap-2 flex-wrap">
      {(["buffet", "plated", "drinksOnly"] as const).map((ct) => (
        <button
          key={ct}
          onClick={() => update({ cateringType: ct })}
          className="px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer"
          style={{
            borderColor: data.cateringType === ct ? "#C8973A" : "rgba(156,139,114,0.3)",
            backgroundColor: data.cateringType === ct ? "rgba(200,151,58,0.1)" : "transparent",
            color: data.cateringType === ct ? "#C8973A" : "#6B5C42",
          }}
        >
          {t(ct)}
        </button>
      ))}
    </div>
  );

  const typeImageMap: Record<string, string> = {
    chalet: "/images/chalets-interior.jpg",
    wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    venue: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    conference: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    family: "https://images.unsplash.com/photo-1529543544282-ea57407bc2e3?w=800&q=80",
    photoshoot: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
  };

  const renderStep1 = () => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {BOOKING_TYPES.map((type) => {
        const isSelected = data.type === type;
        return (
          <button
            key={type}
            onClick={() => openModal(type)}
            className="group relative overflow-hidden cursor-pointer"
            style={{
              borderRadius: "16px",
              border: isSelected ? "2px solid #C8973A" : "2px solid transparent",
              aspectRatio: "3/4",
            }}
          >
            {/* Background image */}
            <img
              src={typeImageMap[type]}
              alt={t(`types.${type}`)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Default gradient at bottom for text */}
            <div
              className="absolute bottom-0 inset-x-0 h-1/2 transition-opacity duration-500 group-hover:opacity-0"
              style={{
                background: "linear-gradient(to top, rgba(26,18,8,0.85), transparent)",
              }}
            />

            {/* Blur curtain — drops from top on hover */}
            <div
              className="absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                height: "0%",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                background: "rgba(26,18,8,0.4)",
              }}
              ref={(el) => {
                if (!el) return;
                const parent = el.parentElement;
                if (!parent) return;
                const show = () => { el.style.height = "100%"; };
                const hide = () => { el.style.height = "0%"; };
                parent.addEventListener("mouseenter", show);
                parent.addEventListener("mouseleave", hide);
              }}
            />

            {/* Type name — always visible at bottom */}
            <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 z-10">
              <p
                className="uppercase text-[10px] tracking-[0.2em] mb-1 transition-opacity duration-500"
                style={{ color: "#C8973A" }}
              >
                {typeIconMap[type]}
              </p>
              <h3
                className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-light"
                style={{ color: "#FAF7F2" }}
              >
                {t(`types.${type}`)}
              </h3>
            </div>

            {/* Book button — revealed on hover */}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              <span
                className="px-8 py-3 rounded-full text-xs uppercase tracking-[0.12em] font-medium"
                style={{
                  backgroundColor: "#C8973A",
                  color: "#1A1208",
                }}
              >
                {t("step1Select")}
              </span>
            </div>

            {/* Selected indicator */}
            {isSelected && (
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
                style={{ backgroundColor: "#C8973A" }}
              >
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderStep2 = () => {
    if (data.type === "chalet") {
      return (
        <div className="flex flex-col items-center gap-6">
          <div className="booking-card rounded-2xl p-4" style={{ backgroundColor: "#FAF7F2", boxShadow: "var(--shadow-card)" }}>
            <DayPicker
              mode="range"
              selected={data.checkIn ? { from: data.checkIn, to: data.checkOut } : undefined}
              onSelect={(range) => update({ checkIn: range?.from ?? undefined, checkOut: range?.to ?? undefined })}
              disabled={blockedDates}
            />
          </div>
          {data.checkIn && (
            <div className="flex items-center gap-2" style={{ color: "#6B5C42" }}>
              <Calendar className="w-4 h-4" style={{ color: "#C8973A" }} />
              <span>{format(data.checkIn, "PPP")}{data.checkOut && ` — ${format(data.checkOut, "PPP")}`}</span>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="booking-card rounded-2xl p-4" style={{ backgroundColor: "#FAF7F2", boxShadow: "var(--shadow-card)" }}>
          <DayPicker mode="single" selected={data.date} onSelect={(day) => update({ date: day ?? undefined })} disabled={blockedDates} />
        </div>
        {data.date && (
          <div className="flex items-center gap-2" style={{ color: "#6B5C42" }}>
            <Calendar className="w-4 h-4" style={{ color: "#C8973A" }} />
            <span>{format(data.date, "PPP")}</span>
          </div>
        )}

        {/* Time range: From — To */}
        <div className="w-full max-w-md">
          <p className="text-xs uppercase tracking-[0.1em] font-medium mb-3 text-center" style={{ color: "#9C8B72" }}>
            {t("selectTime")}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-[0.1em] font-medium mb-1" style={{ color: "#9C8B72" }}>{t("timeFrom")}</label>
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={`from-${slot}`}
                    onClick={() => update({ timeFrom: slot.trim() })}
                    className="px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer"
                    style={{
                      borderColor: data.timeFrom === slot.trim() ? "#C8973A" : "rgba(156,139,114,0.2)",
                      backgroundColor: data.timeFrom === slot.trim() ? "rgba(200,151,58,0.12)" : "transparent",
                      color: data.timeFrom === slot.trim() ? "#C8973A" : "#6B5C42",
                    }}
                  >
                    {slot.trim()}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-lg mt-5" style={{ color: "#9C8B72" }}>—</span>
            <div className="flex-1">
              <label className="block text-[10px] uppercase tracking-[0.1em] font-medium mb-1" style={{ color: "#9C8B72" }}>{t("timeTo")}</label>
              <div className="flex flex-wrap gap-1.5">
                {timeSlots.map((slot) => (
                  <button
                    key={`to-${slot}`}
                    onClick={() => update({ timeTo: slot.trim() })}
                    className="px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer"
                    style={{
                      borderColor: data.timeTo === slot.trim() ? "#C8973A" : "rgba(156,139,114,0.2)",
                      backgroundColor: data.timeTo === slot.trim() ? "rgba(200,151,58,0.12)" : "transparent",
                      color: data.timeTo === slot.trim() ? "#C8973A" : "#6B5C42",
                    }}
                  >
                    {slot.trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const typ = data.type;
    return (
      <div className="space-y-5">
        {renderNumberInput(t("guests"), data.guests, (v) => update({ guests: v }))}
        {typ === "chalet" && (
          <>
            {renderCheckbox(t("breakfast"), data.breakfast, (v) => update({ breakfast: v }))}
            {renderCheckbox(t("poolAccess"), data.poolAccess, (v) => update({ poolAccess: v }))}
            {data.poolAccess && renderRadio("poolDuration", [{ value: "halfDay", label: t("halfDay") }, { value: "fullDay", label: t("fullDay") }], data.poolDuration, (v) => update({ poolDuration: v }))}
          </>
        )}
        {typ === "wedding" && (
          <>
            {renderCheckbox(t("catering"), data.catering, (v) => update({ catering: v }))}
            {data.catering && renderCateringSelector()}
            {renderCheckbox(t("decoration"), data.decoration, (v) => update({ decoration: v }))}
            {renderCheckbox(t("waitstaff"), data.waitstaff, (v) => update({ waitstaff: v }))}
            {data.waitstaff && <div className="ml-8">{renderNumberInput(t("waitstaffCount"), data.waitstaffCount, (v) => update({ waitstaffCount: v }))}</div>}
            {renderCheckbox(t("poolAccess"), data.poolAccess, (v) => update({ poolAccess: v }))}
            {data.poolAccess && renderRadio("poolDuration", [{ value: "halfDay", label: t("halfDay") }, { value: "fullDay", label: t("fullDay") }], data.poolDuration, (v) => update({ poolDuration: v }))}
            {renderCheckbox(t("kidsActivities"), data.kidsActivities, (v) => update({ kidsActivities: v }))}
            {data.kidsActivities && <div className="ml-8">{renderNumberInput(t("kidsCount"), data.kidsCount, (v) => update({ kidsCount: v }))}</div>}
          </>
        )}
        {typ === "venue" && (
          <>
            {renderCheckbox(t("catering"), data.catering, (v) => update({ catering: v }))}
            {data.catering && renderCateringSelector()}
            {renderCheckbox(t("waitstaff"), data.waitstaff, (v) => update({ waitstaff: v }))}
            {data.waitstaff && <div className="ml-8">{renderNumberInput(t("waitstaffCount"), data.waitstaffCount, (v) => update({ waitstaffCount: v }))}</div>}
            {renderCheckbox(t("avEquipment"), data.avEquipment, (v) => update({ avEquipment: v }))}
            {renderCheckbox(t("poolAccess"), data.poolAccess, (v) => update({ poolAccess: v }))}
            {data.poolAccess && renderRadio("poolDuration", [{ value: "halfDay", label: t("halfDay") }, { value: "fullDay", label: t("fullDay") }], data.poolDuration, (v) => update({ poolDuration: v }))}
          </>
        )}
        {typ === "conference" && (
          <>
            {renderCheckbox(t("catering"), data.catering, (v) => update({ catering: v }))}
            {data.catering && renderCateringSelector()}
            {renderCheckbox(t("avEquipment"), data.avEquipment, (v) => update({ avEquipment: v }))}
            {renderCheckbox(t("waitstaff"), data.waitstaff, (v) => update({ waitstaff: v }))}
            {data.waitstaff && <div className="ml-8">{renderNumberInput(t("waitstaffCount"), data.waitstaffCount, (v) => update({ waitstaffCount: v }))}</div>}
          </>
        )}
        {typ === "family" && (
          <>
            {renderCheckbox(t("catering"), data.catering, (v) => update({ catering: v }))}
            {data.catering && renderCateringSelector()}
            {renderCheckbox(t("decoration"), data.decoration, (v) => update({ decoration: v }))}
            {renderCheckbox(t("poolAccess"), data.poolAccess, (v) => update({ poolAccess: v }))}
            {data.poolAccess && renderRadio("poolDuration", [{ value: "halfDay", label: t("halfDay") }, { value: "fullDay", label: t("fullDay") }], data.poolDuration, (v) => update({ poolDuration: v }))}
            {renderCheckbox(t("kidsActivities"), data.kidsActivities, (v) => update({ kidsActivities: v }))}
            {data.kidsActivities && <div className="ml-8">{renderNumberInput(t("kidsCount"), data.kidsCount, (v) => update({ kidsCount: v }))}</div>}
            {renderCheckbox(t("waitstaff"), data.waitstaff, (v) => update({ waitstaff: v }))}
            {data.waitstaff && <div className="ml-8">{renderNumberInput(t("waitstaffCount"), data.waitstaffCount, (v) => update({ waitstaffCount: v }))}</div>}
          </>
        )}
        {typ === "photoshoot" && (
          <div className="space-y-3">
            <span className="font-medium" style={{ color: "#1A1208" }}>{t("shootingZones")}</span>
            <div className="grid grid-cols-2 gap-3">
              {ZONE_KEYS.map((zone) => (
                <label key={zone} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: data.shootingZones.includes(zone) ? "#C8973A" : "transparent",
                      border: data.shootingZones.includes(zone) ? "2px solid #C8973A" : "2px solid rgba(156,139,114,0.5)",
                    }}
                  >
                    {data.shootingZones.includes(zone) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span style={{ color: "#1A1208" }}>{t(`zones.${zone}`)}</span>
                  <input type="checkbox" checked={data.shootingZones.includes(zone)} onChange={(e) => {
                    if (e.target.checked) update({ shootingZones: [...data.shootingZones, zone] });
                    else update({ shootingZones: data.shootingZones.filter((z) => z !== zone) });
                  }} className="sr-only" />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="space-y-6">
      {[
        { key: "fullName", type: "text", value: data.fullName, required: true },
        { key: "phone", type: "tel", value: data.phone, required: true },
        { key: "email", type: "email", value: data.email, required: true },
        { key: "whatsapp", type: "tel", value: data.whatsapp, required: false },
      ].map(({ key, type, value, required }) => (
        <div key={key}>
          <label
            className="block mb-1"
            style={{ fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9C8B72" }}
          >
            {t(key)} {required ? "*" : ""}
          </label>
          <input
            type={type}
            value={value}
            onChange={(e) => update({ [key]: e.target.value })}
            className={inputClasses}
            style={{ borderColor: "#F0E5D0", color: "#1A1208" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#C8973A")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#F0E5D0")}
          />
        </div>
      ))}
      <div>
        <label
          className="block mb-1"
          style={{ fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9C8B72" }}
        >
          {t("message")}
        </label>
        <textarea
          value={data.message}
          onChange={(e) => update({ message: e.target.value })}
          rows={4}
          className={inputClasses}
          style={{ borderColor: "#F0E5D0", color: "#1A1208" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C8973A")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#F0E5D0")}
        />
      </div>
      <div>
        <label
          className="block mb-1"
          style={{ fontWeight: 500, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9C8B72" }}
        >
          {t("langPref")}
        </label>
        <select
          value={data.langPref}
          onChange={(e) => update({ langPref: e.target.value })}
          className={inputClasses}
          style={{ borderColor: "#F0E5D0", color: "#1A1208" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#C8973A")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#F0E5D0")}
        >
          <option value="Français">Français</option>
          <option value="العربية">العربية</option>
          <option value="English">English</option>
        </select>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-[family-name:var(--font-heading)]" style={{ color: "#C8973A" }}>{t("summary")}</h3>
      <div className="booking-card space-y-3 rounded-2xl p-6" style={{ backgroundColor: "#FAF7F2", boxShadow: "var(--shadow-card)" }}>
        <div className="flex justify-between pb-2" style={{ borderBottom: "1px solid #F0E5D0" }}>
          <span style={{ color: "#6B5C42" }}>{t("step1")}</span>
          <span style={{ color: "#1A1208" }}>{t(`types.${data.type}`)}</span>
        </div>
        <div className="flex justify-between pb-2" style={{ borderBottom: "1px solid #F0E5D0" }}>
          <span style={{ color: "#6B5C42" }}>{t("step2")}</span>
          <span style={{ color: "#1A1208" }}>
            {data.type === "chalet" ? (<>{data.checkIn && format(data.checkIn, "PPP")}{data.checkOut && ` — ${format(data.checkOut, "PPP")}`}</>) : (<>{data.date && format(data.date, "PPP")}{data.timeFrom && data.timeTo && ` · ${data.timeFrom} — ${data.timeTo}`}</>)}
          </span>
        </div>
        <div className="pb-2" style={{ borderBottom: "1px solid #F0E5D0" }}>
          <span className="block mb-1" style={{ color: "#6B5C42" }}>{t("step3")}</span>
          <ul className="space-y-1 text-sm" style={{ color: "#1A1208" }}>
            <li>{t("guests")}: {data.guests}</li>
            {data.breakfast && <li>{t("breakfast")}</li>}
            {data.catering && <li>{t("catering")}: {t(data.cateringType)}</li>}
            {data.poolAccess && <li>{t("poolAccess")}: {t(data.poolDuration)}</li>}
            {data.waitstaff && <li>{t("waitstaff")}: {data.waitstaffCount}</li>}
            {data.kidsActivities && <li>{t("kidsActivities")}: {data.kidsCount}</li>}
            {data.decoration && <li>{t("decoration")}</li>}
            {data.avEquipment && <li>{t("avEquipment")}</li>}
            {data.shootingZones.length > 0 && <li>{t("shootingZones")}: {data.shootingZones.map((z) => t(`zones.${z}`)).join(", ")}</li>}
          </ul>
        </div>
        <div className="space-y-1">
          <span className="block mb-1" style={{ color: "#6B5C42" }}>{t("step4")}</span>
          <p className="text-sm" style={{ color: "#1A1208" }}>{data.fullName}</p>
          <p className="text-sm" style={{ color: "#1A1208" }}>{data.phone}</p>
          <p className="text-sm" style={{ color: "#1A1208" }}>{data.email}</p>
          {data.whatsapp && <p className="text-sm" style={{ color: "#1A1208" }}>WhatsApp: {data.whatsapp}</p>}
          {data.message && <p className="text-sm italic" style={{ color: "#6B5C42" }}>{data.message}</p>}
          <p className="text-sm" style={{ color: "#1A1208" }}>{data.langPref}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="rounded-full flex items-center gap-2 transition-colors duration-300 cursor-pointer"
          style={{ backgroundColor: "#C8973A", color: "#1A1208", padding: "14px 32px", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#E8B86D")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
        >
          <Send className="w-5 h-5" /> {t("submit")}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(200,151,58,0.2)" }}>
        <Check className="w-10 h-10" style={{ color: "#C8973A" }} />
      </div>
      <h3 className="text-2xl font-[family-name:var(--font-heading)]" style={{ color: "#C8973A" }}>{t("success")}</h3>
      <p className="max-w-md" style={{ color: "#6B5C42" }}>{t("successMsg")}</p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href={`https://wa.me/213XXXXXXXXX?text=${buildWhatsAppText()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full transition-colors duration-300"
          style={{ backgroundColor: "#C8973A", color: "#1A1208", padding: "14px 32px", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          {t("whatsappLink")}
        </a>
        <button
          onClick={resetBooking}
          className="rounded-full transition-colors duration-300 cursor-pointer"
          style={{ border: "1.5px solid #C8973A", color: "#C8973A", padding: "12px 28px", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "transparent" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(200,151,58,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          {t("newBooking")}
        </button>
      </div>
    </motion.div>
  );

  const stepContent: Record<number, () => React.ReactNode> = { 2: renderStep2, 3: renderStep3, 4: renderStep4, 5: renderStep5 };

  return (
    <>
      <section id="reservation" className="relative py-24 md:py-32" style={{ backgroundColor: "#FAF7F2" }}>
        {/* Header */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-12">
          <p className="eyebrow mb-4">{t("subtitle")}</p>
          <h2 className="heading-section" style={{ color: "#1A1208" }}>{t("title")}</h2>
        </div>

        {/* Full-width image card grid — always visible */}
        <div className="px-4 md:px-6 lg:px-8">
          {renderStep1()}
        </div>
      </section>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dimmed backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(26,18,8,0.75)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Modal card — flex column with scrollable content area */}
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] mx-4 rounded-2xl flex flex-col"
              style={{
                backgroundColor: "#FAF7F2",
                boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed header */}
              <div className="flex-shrink-0 px-8 md:px-12 pt-8 pb-4 relative" style={{ borderBottom: "1px solid #F0E5D0" }}>
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  style={{ backgroundColor: "rgba(240,229,208,0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F0E5D0")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(240,229,208,0.8)")}
                >
                  <X size={18} style={{ color: "#1A1208" }} />
                </button>

                <p className="eyebrow mb-2">{t(`types.${data.type}`)}</p>
                <h3
                  className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl mb-4"
                  style={{ color: "#1A1208" }}
                >
                  {t("title")}
                </h3>

                {/* Step indicator — horizontal, consistent alignment */}
                {!submitted && (
                  <div className="flex items-center justify-center gap-0">
                    {steps.map((label, i) => {
                      const stepNum = i + 2;
                      const isActive = step === stepNum;
                      const isCompleted = step > stepNum;
                      return (
                        <div key={i} className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0"
                              style={{
                                backgroundColor: isCompleted ? "#2D5016" : isActive ? "#C8973A" : "transparent",
                                color: isCompleted || isActive ? "#FFFFFF" : "#9C8B72",
                                border: isCompleted || isActive ? "none" : "1.5px solid #9C8B72",
                              }}
                            >
                              {isCompleted ? <Check className="w-3.5 h-3.5" /> : i + 1}
                            </div>
                            <span
                              className="text-[11px] hidden md:inline whitespace-nowrap"
                              style={{ color: isActive || isCompleted ? "#C8973A" : "#9C8B72" }}
                            >
                              {label}
                            </span>
                          </div>
                          {i < steps.length - 1 && (
                            <div
                              className="w-6 md:w-10 h-[1.5px] mx-2 transition-colors flex-shrink-0"
                              style={{ backgroundColor: step > stepNum ? "#C8973A" : "#F0E5D0" }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Scrollable content area */}
              <div
                className="flex-1 overflow-y-auto px-8 md:px-12 py-6"
                style={{ overscrollBehavior: "contain" }}
              >
                {submitted ? (
                  renderSuccess()
                ) : (
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>
                      {stepContent[step]?.()}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Fixed footer navigation */}
              {!submitted && (
                <div className="flex-shrink-0 flex justify-between px-8 md:px-12 py-5" style={{ borderTop: "1px solid #F0E5D0" }}>
                  <button
                    onClick={step === 2 ? closeModal : goPrev}
                    className="rounded-full flex items-center gap-2 transition-colors duration-300 cursor-pointer"
                    style={{ border: "1.5px solid #C8973A", color: "#C8973A", padding: "10px 24px", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "transparent" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(200,151,58,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <ChevronLeft className="w-4 h-4" /> {step === 2 ? t("step1") : t("prev")}
                  </button>
                  {step < 5 && (
                    <button
                      onClick={goNext}
                      disabled={!canProceed()}
                      className="rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: "#C8973A",
                        color: "#1A1208",
                        padding: "10px 28px",
                        fontSize: "12px",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        opacity: canProceed() ? 1 : 0.4,
                        cursor: canProceed() ? "pointer" : "not-allowed",
                      }}
                      onMouseEnter={(e) => { if (canProceed()) e.currentTarget.style.backgroundColor = "#E8B86D"; }}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C8973A")}
                    >
                      {t("next")} <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
