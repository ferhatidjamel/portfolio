"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

function FacebookIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-desert-night py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="font-[family-name:var(--font-heading)] text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
            {t("title")}
          </h2>
          <p className="text-cream/70 text-base md:text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <motion.div
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          {/* Left: Contact info */}
          <div className="w-full lg:w-1/2 space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="text-gold shrink-0 mt-1" size={24} strokeWidth={1.5} />
              <span className="text-cream text-base leading-relaxed">
                {t("address")}
              </span>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="text-gold shrink-0 mt-1" size={24} strokeWidth={1.5} />
              <span className="text-cream text-base leading-relaxed">
                {t("phone")}
              </span>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="text-gold shrink-0 mt-1" size={24} strokeWidth={1.5} />
              <span className="text-cream text-base leading-relaxed">
                {t("email")}
              </span>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/213XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
              {t("whatsapp")}
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-cream/60 hover:text-gold transition-colors duration-300"
              >
                <FacebookIcon size={24} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-cream/60 hover:text-gold transition-colors duration-300"
              >
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>

          {/* Right: Google Maps embed */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-video rounded-2xl border-2 border-gold/40 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26889.24!2d6.85!3d33.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIxJzAwLjAiTiA2wrA1MScwMC4wIkU!5e0!3m2!1sfr!2sdz!4v1"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Palm Garden Location"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
