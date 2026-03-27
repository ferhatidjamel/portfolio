"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".reviews-header", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reviews-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Cards stagger from right
      gsap.from(".review-card", {
        x: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reviews-track",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0D0A06 0%, #15120C 30%, #15120C 70%, #0D0A06 100%)",
      }}
    >
      <div className="noise-overlay absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reviews-header text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-cream text-4xl md:text-5xl lg:text-6xl mb-5">
            {t("title")}
          </h2>
          <p className="text-sand-light/60 text-lg md:text-xl max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="reviews-track flex gap-6 md:gap-8 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className="review-card group min-w-[320px] md:min-w-[380px] flex-shrink-0 snap-start rounded-2xl border border-gold/15 bg-[#1A150D]/80 backdrop-blur-sm p-8 md:p-10 flex flex-col gap-5 hover:border-gold/40 transition-all duration-500"
            >
              {/* Quote icon */}
              <Quote
                className="text-gold/30 group-hover:text-gold/50 transition-colors duration-500"
                size={32}
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="text-gold fill-gold"
                    size={16}
                  />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-cream/80 text-base md:text-lg leading-relaxed italic flex-1">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-gold/10">
                <p className="text-cream font-semibold text-base">
                  {review.name}
                </p>
                <p className="text-cream/40 text-sm mt-1">
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
