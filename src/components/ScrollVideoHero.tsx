"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIRST_FRAME,
  FRAME_COUNT,
  HERO_TRACK_VH,
  SCRUB_EASE,
  TILT_EASE,
  framePath,
} from "@/lib/hero-config";
import HeroDrum from "./HeroDrum";
import HeroMeta from "./HeroMeta";

const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v;

/** Legibility scrim — the centre of the frame stays untouched. */
function Scrim() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.28)_32%,rgba(0,0,0,0)_66%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_50%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_100%)]" />
    </div>
  );
}

type Variant = "pending" | "full" | "static";

export default function ScrollVideoHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  /** Eased hero progress 0..1 — the smoothed value, never raw scroll. */
  const progressRef = useRef(0);

  const [variant, setVariant] = useState<Variant>("pending");

  // Decide before the loading effect runs, so a phone never downloads the sequence.
  useEffect(() => {
    const small = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setVariant(small || reduced ? "static" : "full");
  }, []);

  useEffect(() => {
    if (variant !== "full") return;

    const track = trackRef.current;
    const canvas = canvasRef.current;
    const tilt = tiltRef.current;
    if (!track || !canvas || !tilt) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // --- load the whole sequence at once -------------------------------
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      images.push(img);
    }

    const ready = (img: HTMLImageElement | undefined) =>
      !!img && img.complete && img.naturalWidth > 0;

    // --- drawing --------------------------------------------------------
    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // clientWidth/Height are layout sizes, unaffected by the tilt transform.
      const w = Math.round(canvas.clientWidth * dpr);
      const h = Math.round(canvas.clientHeight * dpr);
      if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    /** Draw one frame the way object-fit: cover does it. */
    const drawCover = (img: HTMLImageElement, alpha: number) => {
      if (!ready(img)) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      ctx.globalAlpha = 1;
    };

    /**
     * Render a sub-frame position by cross-blending: floor frame solid, next
     * frame on top at the fractional alpha. Without this the scrub visibly
     * steps on slow scroll.
     */
    const render = (position: number) => {
      const base = Math.floor(position);
      const frac = position - base;
      const a = images[clamp(base, 0, FRAME_COUNT - 1)];
      const b = images[clamp(base + 1, 0, FRAME_COUNT - 1)];
      if (!ready(a)) return;
      drawCover(a, 1);
      if (frac > 0.001 && b !== a) drawCover(b, frac);
    };

    // --- first frame in, no black flash ---------------------------------
    let faded = false;
    const revealFirstFrame = () => {
      if (faded) return;
      faded = true;
      sizeCanvas();
      render(0);
      requestAnimationFrame(() => {
        canvas.style.transition = "opacity 600ms ease-out";
        canvas.style.opacity = "1";
      });
    };

    if (ready(images[0])) revealFirstFrame();
    else images[0].addEventListener("load", revealFirstFrame, { once: true });

    // --- scrub loop ------------------------------------------------------
    let current = 0;
    let tiltX = 0;
    let tiltY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    let raf = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onResize = () => {
      sizeCanvas();
      render(current);
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "10% 0px" },
    );
    observer.observe(track);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress =
        scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      // Target playhead stays a float — rounding it kills the cross-blend.
      const target = progress * (FRAME_COUNT - 1);
      current += (target - current) * SCRUB_EASE;
      if (Math.abs(target - current) < 0.001) current = target;

      progressRef.current = current / (FRAME_COUNT - 1);

      // Cursor tilt only while the video is parked on the opening frame.
      const fade = Math.max(0, 1 - current / 6);
      tiltX += (pointerX - tiltX) * TILT_EASE;
      tiltY += (pointerY - tiltY) * TILT_EASE;
      const tx = tiltX * fade;
      const ty = tiltY * fade;
      tilt.style.transform =
        `perspective(1400px) rotateX(${-ty * 2.2}deg) rotateY(${tx * 2.2}deg) ` +
        `translate3d(${-tx * 8}px, ${-ty * 8}px, 0) scale(${1 + 0.05 * fade})`;

      render(current);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      images[0].removeEventListener("load", revealFirstFrame);
      for (const img of images) img.src = "";
    };
  }, [variant]);

  // Small screens / reduced motion: one still frame, the text, and nothing else.
  if (variant === "static") {
    return (
      <section className="relative h-svh w-full overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FIRST_FRAME}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Scrim />
        <HeroDrum progressRef={progressRef} />
        <HeroMeta />
      </section>
    );
  }

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${HERO_TRACK_VH}vh` }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-black">
        <div ref={tiltRef} className="absolute inset-0 [will-change:transform]">
          <canvas
            ref={canvasRef}
            className="block h-full w-full"
            style={{ opacity: 0 }}
          />
        </div>
        <Scrim />
        <HeroDrum progressRef={progressRef} />
        <HeroMeta />
      </div>
    </div>
  );
}
