"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Hand, Flame, Waves, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const services = [
  { key: "massage", icon: Hand },
  { key: "hammam", icon: Flame },
  { key: "pool", icon: Waves },
  { key: "beauty", icon: Sparkles },
];

export default function Spa() {
  const t = useTranslations("spa");

  return (
    <section id="spa" className="bg-desert-night py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
        >
          <h2 className="font-[family-name:var(--font-heading)] text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
            {t("title")}
          </h2>
          <p className="text-cream/70 text-lg md:text-xl mb-6">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map(({ key, icon: Icon }) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="group rounded-2xl bg-[#1a1510] border border-transparent hover:border-gold/60 transition-colors duration-300 p-8 text-center"
            >
              <div className="flex items-center justify-center mb-5">
                <Icon
                  className="text-gold group-hover:scale-110 transition-transform duration-300"
                  size={36}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-cream text-lg md:text-xl mb-3">
                {t(`${key}.name`)}
              </h3>
              <p className="text-cream/70 text-sm md:text-base leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
        >
          <a
            href="#reservation"
            className="inline-block rounded-full bg-gold px-8 py-3 text-desert-night font-semibold text-base md:text-lg hover:bg-gold/90 transition-colors duration-300"
          >
            {t("cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
