import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export { gsap, ScrollTrigger, useGSAP };
