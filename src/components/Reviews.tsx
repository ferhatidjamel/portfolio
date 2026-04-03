"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Amira B.",
    stars: 5,
    quote: "Un séjour magique dans un cadre exceptionnel. Les chalets sont magnifiques et le personnel aux petits soins.",
    occasion: "Séjour en chalet · Été 2024",
  },
  {
    name: "Karim M.",
    stars: 5,
    quote: "Notre mariage était absolument parfait. Le cadre sous les dômes dorés était à couper le souffle.",
    occasion: "Mariage · Printemps 2024",
  },
  {
    name: "Sophie L.",
    stars: 5,
    quote: "Le spa et le hammam sont divins. Une parenthèse de bien-être inoubliable au milieu du désert.",
    occasion: "Spa & Bien-être · Hiver 2024",
  },
  {
    name: "Yacine D.",
    stars: 5,
    quote: "Le restaurant propose une cuisine algérienne raffinée dans un décor somptueux. Une adresse incontournable.",
    occasion: "Restaurant · Automne 2024",
  },
  {
    name: "Nadia R.",
    stars: 5,
    quote: "Lieu parfait pour notre événement d'entreprise. Professionnel, élégant et mémorable.",
    occasion: "Conférence · Été 2024",
  },
];

export default function Reviews() {
  const t = useTranslations("reviews");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reviews-header", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".reviews-header", start: "top 85%" },
      });

      gsap.from(".review-card", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: { trigger: ".reviews-track", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ backgroundColor: "#F0E5D0" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="reviews-header text-center mb-16">
          <p className="eyebrow mb-4">{t("subtitle")}</p>
          <h2 className="heading-section" style={{ color: "#1A1208" }}>
            {t("title")}
          </h2>
        </div>

        <div
          className="reviews-track flex gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="review-card bg-day-card group min-w-[320px] md:min-w-[380px] flex-shrink-0 snap-start flex flex-col gap-5 hover:shadow-xl transition-shadow duration-500"
              style={{
                backgroundColor: "#FAF7F2",
                borderRadius: "16px",
                padding: "28px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Large quote mark */}
              <span
                className="font-[family-name:var(--font-heading)] leading-none"
                style={{
                  fontSize: "80px",
                  color: "#C8973A",
                  opacity: 0.4,
                  marginBottom: "-20px",
                  lineHeight: 0,
                }}
              >
                &ldquo;
              </span>

              <div className="flex gap-1">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} size={16} style={{ color: "#C8973A", fill: "#C8973A" }} />
                ))}
              </div>

              <p
                className="font-[family-name:var(--font-heading)] italic flex-1"
                style={{ fontSize: "18px", color: "#1A1208", lineHeight: 1.6 }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="pt-4" style={{ borderTop: "1px solid #F0E5D0" }}>
                <p className="font-medium text-sm" style={{ color: "#1A1208" }}>
                  {review.name}
                </p>
                <p className="text-xs mt-1" style={{ color: "#9C8B72" }}>
                  {review.occasion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
