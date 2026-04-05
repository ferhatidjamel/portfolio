import { setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Accommodations from "@/components/Accommodations";
import Events from "@/components/Events";
import Restaurant from "@/components/Restaurant";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Accommodations />
        <Restaurant />
        <Gallery />
        <Booking />
        <Reviews />
        <Events />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
