import type { PalmEvent } from "@/types/events";

function getNextFriday(): string {
  const now = new Date();
  const day = now.getDay();
  const daysUntilFriday = day <= 5 ? 5 - day : 7 - day + 5;
  const friday = new Date(now);
  friday.setDate(now.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
  return friday.toISOString().split("T")[0];
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export const seedEvents: PalmEvent[] = [
  {
    id: "evt-001",
    title_fr: "Spectacle de Clown pour Enfants",
    title_ar: "عرض المهرج للأطفال",
    title_en: "Children's Clown Show",
    description_fr: "Un après-midi magique pour vos enfants avec notre clown professionnel, jeux et surprises garanties !",
    description_ar: "بعد ظهيرة سحرية لأطفالكم مع مهرجنا المحترف، ألعاب ومفاجآت مضمونة!",
    description_en: "A magical afternoon for your children with our professional clown, guaranteed games and surprises!",
    category: "kids",
    date: addDays(1),
    time: "15:00 - 18:00",
    image_url: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&q=80",
    max_capacity: 50,
    current_registrations: 12,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "evt-002",
    title_fr: "Soirée Musicale Andalouse",
    title_ar: "سهرة موسيقية أندلسية",
    title_en: "Andalusian Music Evening",
    description_fr: "Une soirée inoubliable au cœur du désert avec des musiciens andalous traditionnels.",
    description_ar: "سهرة لا تُنسى في قلب الصحراء مع موسيقيين أندلسيين تقليديين.",
    description_en: "An unforgettable evening in the heart of the desert with traditional Andalusian musicians.",
    category: "cultural",
    date: addDays(3),
    time: "20:00 - 23:00",
    image_url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80",
    max_capacity: 80,
    current_registrations: 34,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "evt-003",
    title_fr: "Brunch Familial du Vendredi",
    title_ar: "برانش عائلي يوم الجمعة",
    title_en: "Friday Family Brunch",
    description_fr: "Buffet généreux de spécialités algériennes et internationales dans notre jardin sous les palmiers.",
    description_ar: "بوفيه سخي من الأطباق الجزائرية والعالمية في حديقتنا تحت أشجار النخيل.",
    description_en: "A generous buffet of Algerian and international specialties in our garden under the palm trees.",
    category: "gastronomy",
    date: getNextFriday(),
    time: "10:00 - 14:00",
    image_url: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=600&q=80",
    max_capacity: 0,
    current_registrations: 22,
    is_active: true,
    created_at: new Date().toISOString(),
  },
];
