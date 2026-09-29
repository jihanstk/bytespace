"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED_MOTION } from "@/lib/gsap";
import { registerLenis } from "@/lib/smooth-scroll";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: true });
    registerLenis(lenis);
    const onTick = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
