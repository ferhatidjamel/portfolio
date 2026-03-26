"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Home, Waves, Sparkles } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { icon: Home, label: t("stat1") },
    { icon: Waves, label: t("stat2") },
    { icon: Sparkles, label: t("stat3") },
  ];

  return (
    <section id="about" className="bg-desert-night py-24">
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
                src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <h2 className="font-[family-name:var(--font-heading)] text-gold text-3xl md:text-4xl lg:text-5xl mb-6">
              {t("title")}
            </h2>

            <p className="text-cream text-base md:text-lg leading-relaxed mb-10">
              {t("text")}
            </p>

            <div className="flex flex-wrap gap-8">
              {stats.map(({ icon: Icon, label }) => (
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
