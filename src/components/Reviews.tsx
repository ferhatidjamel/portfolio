"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const reviews = [
  {
    name: "Amira B.",
    stars: 5,
    quote:
      "Un séjour magique dans un cadre exceptionnel. Les chalets sont magnifiques et le personnel aux petits soins.",
    occasion: "Séjour en chalet · Été 2024",
  },
  {
    name: "Karim M.",
    stars: 5,
    quote:
      "Notre mariage était absolument parfait. Le cadre sous les dômes dorés était à couper le souffle.",
    occasion: "Mariage · Printemps 2024",
  },
  {
    name: "Sophie L.",
    stars: 5,
    quote:
      "Le spa et le hammam sont divins. Une parenthèse de bien-être inoubliable au milieu du désert.",
    occasion: "Spa & Bien-être · Hiver 2024",
  },
  {
    name: "Yacine D.",
    stars: 5,
    quote:
      "Le restaurant propose une cuisine algérienne raffinée dans un décor somptueux. Une adresse incontournable.",
    occasion: "Restaurant · Automne 2024",
  },
  {
    name: "Nadia R.",
    stars: 5,
    quote:
      "Lieu parfait pour notre événement d'entreprise. Professionnel, élégant et mémorable.",
    occasion: "Conférence · Été 2024",
  },
];

export default function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section id="reviews" className="bg-desert-night py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="font-[family-name:var(--font-heading)] text-gold text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
            {t("title")}
          </h2>
          <p className="text-cream text-base md:text-lg text-center mb-12">
            {t("subtitle")}
          </p>

          <div className="flex gap-6 overflow-x-auto snap-x pb-4">
            {reviews.map((review) => (
              <div
                key={review.name}
                className="min-w-[300px] flex-shrink-0 snap-start rounded-xl border border-gold bg-desert-night p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-gold fill-gold"
                      size={18}
                    />
                  ))}
                </div>

                <p className="text-cream italic leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div className="mt-auto">
                  <p className="text-gold font-semibold">{review.name}</p>
                  <p className="text-cream/60 text-sm">{review.occasion}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
