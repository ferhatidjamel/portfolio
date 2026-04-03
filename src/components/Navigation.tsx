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
  { href: "#events", key: "events" },
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
            ? "nav-bg-scroll backdrop-blur-md"
            : "bg-transparent"
        }`}
        style={scrolled ? { backgroundColor: "#FAF7F2", borderBottom: "1px solid #F0E5D0" } : undefined}
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 ${isRTL ? "flex-row-reverse" : ""}`}>
          {/* Logo */}
          <a href="#" className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <TreePalm
              className="h-7 w-7 transition-colors duration-500"
              style={{ color: scrolled ? "#2D5016" : "#FFFFFF" }}
            />
            <span
              className="font-[family-name:var(--font-heading)] text-xl tracking-wide transition-colors duration-500"
              style={{ color: scrolled ? "#1A1208" : "#FFFFFF" }}
            >
              Palm Garden
            </span>
          </a>

          {/* Center nav */}
          <ul className={`hidden lg:flex items-center gap-8 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.key}>
                <a
                  href={link.href}
                  className="transition-colors duration-300"
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: scrolled ? "#6B5C42" : "rgba(255,255,255,0.85)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#C8973A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = scrolled ? "#6B5C42" : "rgba(255,255,255,0.85)")}
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
                className="flex items-center gap-1 transition-colors duration-300"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: scrolled ? "#6B5C42" : "rgba(255,255,255,0.85)",
                }}
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
                    className="absolute top-full mt-2 right-0 overflow-hidden min-w-[80px] shadow-lg rounded-xl"
                    style={{ backgroundColor: "#FAF7F2", border: "1px solid #F0E5D0" }}
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className="block w-full px-4 py-2 text-sm text-left uppercase tracking-wider transition-colors duration-200"
                        style={{
                          color: locale === l.code ? "#C8973A" : "#6B5C42",
                          backgroundColor: locale === l.code ? "rgba(200,151,58,0.05)" : "transparent",
                        }}
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA — gold pill */}
            <a
              href="#reservation"
              className="rounded-full transition-colors duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#C8973A",
                color: "#1A1208",
                padding: "10px 24px",
                fontSize: "12px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {t("book")}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition-colors duration-500"
            style={{ color: scrolled ? "#1A1208" : "#FFFFFF" }}
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#FAF7F2" }}
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
                    style={{ color: "#1A1208" }}
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
                  className="text-sm uppercase tracking-wider px-3 py-1 rounded border transition-colors duration-200"
                  style={{
                    color: locale === l.code ? "#C8973A" : "#9C8B72",
                    borderColor: locale === l.code ? "#C8973A" : "rgba(156,139,114,0.3)",
                  }}
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
              className="mt-8 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: "#C8973A",
                color: "#1A1208",
                padding: "14px 32px",
                fontSize: "12px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {t("book")}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
