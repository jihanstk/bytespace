"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, REDUCED_MOTION } from "@/lib/gsap";

/**
 * Page-level animation wiring driven by data attributes, so sections stay Server Components:
 * - `data-intro="n"`   entrance on load, grouped and ordered by n
 * - `data-reveal`      fade-up when scrolled into view (siblings are staggered together)
 * - `data-parallax="n"` scroll-linked vertical drift of n px
 */
export default function MotionController() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(`not all and ${REDUCED_MOTION}`, () => {
        playIntro();
        revealOnScroll();
        parallax();
      });

      mm.add(REDUCED_MOTION, () => {
        gsap.set("[data-intro], [data-reveal]", { autoAlpha: 1 });
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}

function playIntro() {
  const items = gsap.utils.toArray<HTMLElement>("[data-intro]");
  if (!items.length) return;

  const groups = new Map<number, HTMLElement[]>();
  for (const item of items) {
    const order = Number(item.dataset.intro) || 0;
    groups.set(order, [...(groups.get(order) ?? []), item]);
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } });
  [...groups.keys()]
    .sort((a, b) => a - b)
    .forEach((order, index) => {
      const targets = groups.get(order)!;
      const kind = targets[0].dataset.introKind;
      const position = index === 0 ? 0 : "-=0.65";

      if (kind === "scale") {
        tl.fromTo(targets, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: "expo.out" }, position);
      } else if (kind === "pop") {
        tl.fromTo(
          targets,
          { autoAlpha: 0, y: 24, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, stagger: 0.12, ease: "back.out(1.6)", duration: 0.7 },
          position,
        );
      } else if (kind === "fade") {
        tl.fromTo(targets, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.08, duration: 1 }, position);
      } else {
        tl.fromTo(targets, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, position);
      }
    });
}

function revealOnScroll() {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(
        batch,
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true },
      ),
  });
}

function parallax() {
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const distance = Number(el.dataset.parallax) || 60;
    gsap.fromTo(
      el,
      { y: -distance / 2 },
      {
        y: distance / 2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}
