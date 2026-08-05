"use client";

import { useEffect, useRef, type RefObject } from "react";
import { BEATS, DRUM } from "@/lib/hero-config";

/**
 * Beats printed on the surface of a giant rotating drum. The drum position is
 * hero progress scaled across the gaps between beats, so beat N is dead centre
 * when the drum sits at N. Each beat pitches away around its own axis as it
 * leaves — no fading, they exit by rotating over the top edge.
 *
 * Perspective is applied per element rather than on the parent so each beat
 * pitches straight up instead of swinging sideways toward a shared vanishing
 * point.
 */
function transformFor(offset: number, unit: "vh" | "px", viewport = 1) {
  const y = offset * DRUM.y * viewport;
  const z = -Math.abs(offset) * DRUM.z * viewport;
  const u = unit === "vh" ? "vh" : "px";
  return (
    `perspective(${DRUM.perspective}px) translateY(-50%) ` +
    `translateY(${y}${u}) translateZ(${z}${u}) rotateX(${-offset * DRUM.rotate}deg)`
  );
}

export default function HeroDrum({
  progressRef,
}: {
  progressRef: RefObject<number>;
}) {
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const vh = window.innerHeight;
      const drum = (progressRef.current ?? 0) * (BEATS.length - 1);

      for (let i = 0; i < BEATS.length; i++) {
        const el = beatRefs.current[i];
        if (!el) continue;
        el.style.transform = transformFor(i - drum, "px", vh);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {BEATS.map((beat, i) => (
        <div
          key={beat.pill}
          ref={(el) => {
            beatRefs.current[i] = el;
          }}
          className="absolute top-1/2 left-0 w-full px-6 [backface-visibility:hidden] [will-change:transform] md:px-10 lg:px-16"
          // Rendered on the server in vh units so the beats are already in the
          // right place before any JS runs.
          style={{ transform: transformFor(i, "vh", 100) }}
        >
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-black/40 px-4 py-1.5 text-[0.625rem] font-medium tracking-[0.28em] text-white/80 uppercase backdrop-blur-md">
              {beat.pill}
            </span>

            <h1 className="mt-6 text-5xl leading-[0.95] text-white md:text-6xl lg:text-7xl">
              <span className="block font-semibold tracking-tight">
                {beat.lines[0]}
              </span>
              <span className="block font-semibold tracking-tight">
                {beat.lines[1]}
              </span>
              <span className="block font-serif italic">{beat.lines[2]}</span>
            </h1>

            <p className="mt-7 max-w-[28rem] text-base leading-relaxed text-white/70 md:text-lg">
              {beat.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
