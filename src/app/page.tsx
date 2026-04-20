import Hero from "@/sections/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/sections/Projects";
import InteractiveDivider from "@/components/InteractiveDivider";
import HowIWork from "@/sections/HowIWork";
import Services from "@/sections/Services";
import WhyMe from "@/sections/WhyMe";
import About from "@/sections/About";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";
import { HomeJsonLd, FaqJsonLd } from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/lib/faq";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <HomeJsonLd />
      <FaqJsonLd items={FAQ_ITEMS} />
      <Hero />
      <Marquee />
      <Projects />
      <InteractiveDivider />
      <HowIWork />
      <Services />
      <WhyMe />
      <About />
      <FAQ />
      <Footer />
    </main>
  );
}
