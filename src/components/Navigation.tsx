"use client";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, TreePalm } from "lucide-react";

const locales = [
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
  { code: "en", label: "EN" },
] as const;

const navLinks = [
  { href: "#hebergement", key: "accommodation" },
  { href: "#spa", key: "spa" },
  { href: "#restaurant", key: "restaurant" },
  { href: "#galerie", key: "gallery" },
  { href: "#reservation", key: "reservation" },
] as const;

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const isRTL = locale === "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  const currentLocaleLabel = locales.find((l) => l.code === locale)?.label ?? "FR";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "nav-bg-scroll bg-bg-primary/95 backdrop-blur-md border-b border-sand-dark/20"
            : "bg-transparent"
        }`}
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <a href="#" className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <TreePalm className={`h-7 w-7 ${scrolled ? "text-gold" : "text-white"} transition-colors duration-500`} />
            <span className={`font-[family-name:var(--font-heading)] text-xl tracking-wide transition-colors duration-500 ${scrolled ? "text-text-primary" : "text-white"}`}>
              Palm Garden
            </span>
          </a>

          {/* Center nav */}
          <ul className={`hidden lg:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className={`text-sm uppercase tracking-widest transition-colors duration-300 ${scrolled ? "text-text-muted hover:text-gold" : "text-white/80 hover:text-white"}`}
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className={`hidden lg:flex items-center gap-6 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 text-sm uppercase tracking-wider transition-colors duration-300 ${scrolled ? "text-text-muted hover:text-text-primary" : "text-white/80 hover:text-white"}`}
              >
                {currentLocaleLabel}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 right-0 bg-white border border-sand-dark/20 rounded-xl overflow-hidden min-w-[80px] shadow-lg"
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`block w-full px-4 py-2 text-sm text-left uppercase tracking-wider transition-colors duration-200 ${
                          locale === l.code ? "text-gold bg-gold/5" : "text-text-muted hover:text-text-primary hover:bg-sand/30"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA — filled gold */}
            <a
              href="#reservation"
              className="bg-gold text-white px-6 py-2.5 text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              {t("book")}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors duration-500 ${scrolled ? "text-text-primary" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center"
          >
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-[family-name:var(--font-heading)] uppercase tracking-widest hover:text-gold transition-colors duration-300"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t(link.key)}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-12 flex items-center gap-4"
            >
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { switchLocale(l.code); setMobileOpen(false); }}
                  className={`text-sm uppercase tracking-wider px-3 py-1 rounded border transition-colors duration-200 ${
                    locale === l.code ? "text-gold border-gold" : "text-text-muted border-sand-dark/30 hover:text-text-primary hover:border-sand-dark/60"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </motion.div>

            <motion.a
              href="#reservation"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-8 bg-gold text-white px-8 py-3 text-sm uppercase tracking-widest font-semibold rounded-full hover:bg-gold-light transition-colors duration-300"
            >
              {t("book")}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
