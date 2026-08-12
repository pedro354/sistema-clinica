import { Benefits } from "./components/Benefits";
import { CTA } from "./components/CTA";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials ";
import { ValueProposition } from "./components/ValueProposition";

export default function Landing() {
  return (
    <main className="min-h-screen w-full py-4 font-sans">
      <Hero />
      <Benefits />
      <Features />
      <HowItWorks />
      <ValueProposition />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
