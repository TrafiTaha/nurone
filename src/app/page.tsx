import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Labs } from "@/components/sections/Labs";
import { Manifesto } from "@/components/sections/Manifesto";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { Stack } from "@/components/sections/Stack";
import { SystemSection } from "@/components/sections/SystemSection";
import { Testimonials } from "@/components/sections/Testimonials";

/**
 * One continuous story: the promise, where ambition breaks, how NURONE thinks,
 * the engine, the Labs, the method, the proof, the stack, and the decision.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Manifesto />
        <Principles />
        <SystemSection />
        <Labs />
        <Process />
        <Impact />
        <CaseStudies />
        <Testimonials />
        <Stack />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
