"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps the app in Lenis smooth scrolling and keeps GSAP's ScrollTrigger
 * reading the same smoothed scroll position the hero reads.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Reduced motion means no inertia at all — hand scrolling back to the browser.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      anchors: true,
      autoRaf: false,
    });

    const stopScrollSync = lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      stopScrollSync();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
