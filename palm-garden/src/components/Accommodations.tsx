"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const cards = [
  {
    key: "chalets" as const,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
  },
  {
    key: "domes" as const,
    image:
      "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=600&q=80",
  },
  {
    key: "salon" as const,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d36de3cee?w=600&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Accommodations() {
  const t = useTranslations("accommodation");

  return (
    <section id="hebergement" className="bg-desert-night py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gold font-serif text-4xl md:text-5xl mb-4">
            {t("title")}
          </h2>
          <p className="text-cream text-lg md:text-xl">{t("subtitle")}</p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((card) => {
            const tags = t(`${card.key}.tags`)
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);

            return (
              <motion.div
                key={card.key}
                variants={cardVariants}
                className="group rounded-2xl overflow-hidden border border-gold/20 bg-desert-night hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={card.image}
                    alt={t(`${card.key}.name`)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-gold font-serif text-2xl">
                    {t(`${card.key}.name`)}
                  </h3>

                  <p className="text-cream text-sm leading-relaxed">
                    {t(`${card.key}.description`)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gold border border-gold/40 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="mt-2 w-full border border-gold text-gold bg-transparent rounded-lg py-2.5 text-sm font-medium hover:bg-gold/10 transition-colors duration-300">
                    {t("learnMore")}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
