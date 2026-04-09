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
    quote: "Les chalets sont un vrai cocon de confort. Le petit-déjeuner livré en chambre au réveil, avec vue sur les palmiers — un pur bonheur.",
    occasion: "Séjour en chalet · Hiver 2024",
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
  {
    name: "Leïla H.",
    stars: 5,
    quote: "Une escapade inoubliable. Le calme du désert, le raffinement du service — on reviendra sans hésiter.",
    occasion: "Séjour en chalet · Automne 2024",
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
        scrollTrigger: { trigger: ".reviews-grid", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="reviews-header text-center mb-16">
          <p className="eyebrow mb-4">{t("subtitle")}</p>
          <h2
            className="font-[family-name:var(--font-heading)] italic font-light leading-[1.1]"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#1A1208" }}
          >
            {t("title")}
          </h2>
          <div className="gold-line w-20 mx-auto mt-6" />
        </div>

        <div className="reviews-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="review-card flex flex-col gap-5 transition-shadow duration-500 hover:shadow-lg"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid #F0E5D0",
                boxShadow: "0 1px 3px rgba(26,18,8,0.04)",
              }}
            >
              <div className="flex gap-1">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} size={15} style={{ color: "#C8973A", fill: "#C8973A" }} />
                ))}
              </div>

              <p
                className="font-[family-name:var(--font-heading)] italic flex-1"
                style={{ fontSize: "19px", color: "#1A1208", lineHeight: 1.6 }}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="pt-5" style={{ borderTop: "1px solid #F0E5D0" }}>
                <p className="font-medium text-sm" style={{ color: "#1A1208" }}>
                  {review.name}
                </p>
                <p className="text-xs mt-1" style={{ color: "#9C8B72" }}>
                  {review.occasion}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
