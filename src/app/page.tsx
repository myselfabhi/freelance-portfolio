import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";
import HowIWork from "@/sections/HowIWork";
import Services from "@/sections/Services";
import WhyMe from "@/sections/WhyMe";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Hero />
      <Projects />
      <HowIWork />
      <Services />
      <WhyMe />
      <Footer />
    </main>
  );
}
