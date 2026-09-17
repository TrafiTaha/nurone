"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/** Pinned storytelling needs motion allowed and enough height to hold a scene. Mirrors `.scene` in globals.css. */
const base = "(prefers-reduced-motion: no-preference) and (min-height: 600px)";
export const PIN_QUERY = { always: base, desktop: `${base} and (min-width: 1024px)` } as const;
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger };
