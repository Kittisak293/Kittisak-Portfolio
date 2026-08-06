"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades its contents up once, the first time they cross into view.
 *
 * The hidden starting state lives in globals.css on `[data-reveal]` rather than
 * in an inline style, so it is already inside a
 * `prefers-reduced-motion: no-preference` query — readers who ask for less
 * motion get the finished layout server-side with no flash and no JS involved.
 *
 * ScrollTrigger is used rather than a bare IntersectionObserver because
 * SmoothScroll already feeds it Lenis' smoothed scroll position, so these
 * reveals fire against the same clock as the hero.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait after the trigger fires. Stagger siblings by hand. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
