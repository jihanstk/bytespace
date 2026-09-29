import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="grid-backdrop flex min-h-svh items-center md:min-h-[max(100svh,60rem)] overflow-hidden pt-36 pb-20 md:pb-24">
        <div className="container-page flex flex-col items-center text-center">
          <p
            aria-hidden
            data-intro="1"
            data-intro-kind="scale"
            className="bg-linear-to-b from-lime-500 from-40% to-lime-500/0 bg-clip-text font-heading text-[clamp(9rem,33vw,30rem)] leading-[0.8] font-semibold tracking-[-0.02em] text-transparent select-none"
          >
            404
          </p>
          <h1
            data-intro="2"
            className="-mt-[0.9em] font-heading text-[clamp(2.25rem,4.2vw+0.75rem,4.5rem)] leading-[1.2] font-semibold text-white"
          >
            The page you are looking
            <br className="hidden sm:block" /> for doesn&rsquo;t exist
          </h1>
          <p data-intro="3" className="mt-6 text-body-m text-white/90 md:text-body-l">
            Try to use a correct url or go back to homepage to start again
          </p>
          <div data-intro="3" className="mt-8">
            <LinkButton href="/">Back to Home</LinkButton>
          </div>
        </div>
      </main>
      <Footer bordered />
    </>
  );
}
