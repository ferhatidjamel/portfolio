export type EventCategory = "kids" | "cultural" | "gastronomy" | "music" | "sports" | "other";

export type PalmEvent = {
  id: string;
  title_fr: string;
  title_ar: string;
  title_en: string;
  description_fr: string;
  description_ar: string;
  description_en: string;
  category: EventCategory;
  date: string; // ISO date string YYYY-MM-DD
  time: string; // e.g. "15:00 - 18:00"
  image_url: string;
  max_capacity: number; // 0 = unlimited
  current_registrations: number;
  is_active: boolean;
  created_at: string;
};

export type EventRegistration = {
  id: string;
  event_id: string;
  event_title: string;
  registrant_name: string;
  phone: string;
  adults: number;
  children: number;
  notes: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};
