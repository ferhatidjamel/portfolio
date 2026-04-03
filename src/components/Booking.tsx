"use client";
import { useState } from "react";
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
} from "lucide-react";
import "react-day-picker/style.css";
import blockedDatesData from "@/data/blockedDates.json";

type BookingData = {
  type: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  date: Date | undefined;
  time: string;
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
  time: "",
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
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<BookingData>(initialBookingData);
  const [submitted, setSubmitted] = useState(false);

  const blockedDates = blockedDatesData.blockedDates.map(
    (d: string) => new Date(d)
  );

  const steps = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];

  const update = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, 5)); };
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const canProceed = () => {
    switch (step) {
      case 1: return data.type !== "";
      case 2:
        if (data.type === "chalet") return !!data.checkIn && !!data.checkOut;
        return !!data.date;
      case 3: return true;
      case 4:
        return data.fullName.trim() !== "" && data.phone.trim() !== "" && data.email.trim() !== "";
      default: return true;
    }
  };

  const handleSubmit = () => setSubmitted(true);
  const resetBooking = () => { setData(initialBookingData); setStep(1); setDirection(1); setSubmitted(false); };

  const buildWhatsAppText = () => {
    let text = `Booking Request:\nType: ${data.type}\n`;
    if (data.type === "chalet") {
      if (data.checkIn) text += `Check-in: ${format(data.checkIn, "PPP")}\n`;
      if (data.checkOut) text += `Check-out: ${format(data.checkOut, "PPP")}\n`;
    } else {
      if (data.date) text += `Date: ${format(data.date, "PPP")}\n`;
      if (data.time) text += `Time: ${data.time}\n`;
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

  const renderStep1 = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {BOOKING_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => update({ type })}
          className="booking-card flex flex-col items-center justify-center gap-3 p-6 transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "#FAF7F2",
            borderRadius: "12px",
            border: data.type === type ? "1.5px solid #C8973A" : "1.5px solid #F0E5D0",
            background: data.type === type ? "rgba(200,151,58,0.08)" : "#FAF7F2",
            boxShadow: data.type === type ? "var(--shadow-card-hover)" : "var(--shadow-card)",
          }}
        >
          <span className="text-4xl">{typeIconMap[type]}</span>
          <span style={{ color: "#1A1208", fontWeight: 500, fontSize: "14px" }}>{t(`types.${type}`)}</span>
        </button>
      ))}
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
        <div className="flex flex-wrap gap-2 justify-center">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => update({ time: slot.trim() })}
              className="px-4 py-2 rounded-lg border transition-all cursor-pointer"
              style={{
                borderColor: data.time === slot.trim() ? "#C8973A" : "rgba(156,139,114,0.3)",
                backgroundColor: data.time === slot.trim() ? "rgba(200,151,58,0.1)" : "transparent",
                color: data.time === slot.trim() ? "#C8973A" : "#6B5C42",
              }}
            >
              {slot.trim()}
            </button>
          ))}
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
            {data.type === "chalet" ? (<>{data.checkIn && format(data.checkIn, "PPP")}{data.checkOut && ` — ${format(data.checkOut, "PPP")}`}</>) : (<>{data.date && format(data.date, "PPP")}{data.time && ` @ ${data.time}`}</>)}
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

  const stepContent: Record<number, () => React.ReactNode> = { 1: renderStep1, 2: renderStep2, 3: renderStep3, 4: renderStep4, 5: renderStep5 };

  return (
    <section id="reservation" className="relative py-32 md:py-40" style={{ backgroundColor: "#FAF7F2" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="eyebrow mb-4">{t("subtitle")}</p>
          <h2 className="heading-section" style={{ color: "#1A1208" }}>{t("title")}</h2>
        </div>

        {submitted ? renderSuccess() : (
          <>
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-12">
              {steps.map((label, i) => {
                const stepNum = i + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;
                return (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                        style={{
                          backgroundColor: isCompleted ? "#2D5016" : isActive ? "#C8973A" : "transparent",
                          color: isCompleted || isActive ? "#FFFFFF" : "#9C8B72",
                          border: isCompleted || isActive ? "none" : "1.5px solid #9C8B72",
                        }}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                      </div>
                      <span
                        className="text-xs mt-1 hidden md:block max-w-[80px] text-center"
                        style={{ color: isActive || isCompleted ? "#C8973A" : "#9C8B72" }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className="w-8 md:w-16 h-[2px] mx-1 md:mx-2 transition-colors"
                        style={{ backgroundColor: step > stepNum ? "#C8973A" : "#F0E5D0" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step Content Card */}
            <div
              className="booking-card relative min-h-[400px] rounded-2xl p-8 md:p-12"
              style={{ backgroundColor: "#FAF7F2", boxShadow: "var(--shadow-card)" }}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={step} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>
                  {stepContent[step]()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={goPrev}
                  className="rounded-full flex items-center gap-2 transition-colors duration-300 cursor-pointer"
                  style={{ border: "1.5px solid #C8973A", color: "#C8973A", padding: "12px 28px", fontSize: "12px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(200,151,58,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <ChevronLeft className="w-5 h-5" /> {t("prev")}
                </button>
              ) : <div />}
              {step < 5 && (
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: "#C8973A",
                    color: "#1A1208",
                    padding: "14px 32px",
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
                  {t("next")} <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
