import Footer from "@/components/layout/Footer";
import Courses from "@/components/sections/Courses";
import CreatorCta from "@/components/sections/CreatorCta";
import Growth from "@/components/sections/Growth";
import Hero from "@/components/sections/Hero";
import Partners from "@/components/sections/Partners";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Partners />
        <Courses />
        <Growth />
        <CreatorCta />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
