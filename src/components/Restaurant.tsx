"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { UtensilsCrossed, Coffee, Wine } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Restaurant() {
  const t = useTranslations("restaurant");

  const highlights = [
    { icon: UtensilsCrossed, label: t("dinner") },
    { icon: Coffee, label: t("breakfast") },
    { icon: Wine, label: t("cafe") },
  ];

  return (
    <section id="restaurant" className="bg-desert-night py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex flex-col-reverse lg:flex-row rtl:lg:flex-row-reverse items-center gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <p className="text-gold uppercase tracking-widest text-sm mb-2">
              {t("subtitle")}
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-gold text-3xl md:text-4xl lg:text-5xl mb-6">
              {t("title")}
            </h2>

            <p className="text-cream text-base md:text-lg leading-relaxed mb-10">
              {t("text")}
            </p>

            <div className="flex flex-wrap gap-8">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="text-gold" size={28} strokeWidth={1.5} />
                  <span className="text-cream text-sm md:text-base">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
