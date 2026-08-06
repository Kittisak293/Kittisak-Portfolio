"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import {
  SKILL_CATEGORIES,
  SKILLS_INTRO,
  type SkillCategory,
  type SkillGroup,
} from "@/lib/skills-content";

gsap.registerPlugin(ScrollTrigger);

const NBSP = " ";

/**
 * Items run together separated by a decorative slash. A non-breaking space
 * precedes the slash and a normal one follows it, so a wrapped line never
 * opens on "/". Each item gets its own quiet hover — brightening 31 small
 * text spans on :hover is compositor-only and free; per-item GSAP listeners
 * would not be (ui-ux-pro-max gsap domain, hover micro-interaction notes).
 */
function ItemRun({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={item}
          className="transition-colors duration-150 hover:text-white"
        >
          {item}
          {i < items.length - 1 && (
            <>
              {NBSP}
              <span aria-hidden className="px-1 text-white/[22%]">
                /
              </span>{" "}
            </>
          )}
        </span>
      ))}
    </>
  );
}

function GroupRow({ label, items }: SkillGroup) {
  return (
    <div className="grid grid-cols-1 gap-y-1.5 py-3 md:grid-cols-[168px_1fr_44px] md:items-baseline md:gap-x-8 md:gap-y-0 md:py-2.5">
      {label ? (
        <dt className="text-[0.6875rem] font-medium tracking-[0.14em] text-white/50 uppercase">
          {label}
        </dt>
      ) : (
        <dt aria-hidden className="hidden md:block" />
      )}

      <dd className="text-[1.0625rem] leading-[1.75] text-white/[62%]">
        <ItemRun items={items} />
      </dd>

      <span
        aria-hidden
        className="hidden font-mono text-[11px] text-white/30 md:block md:text-right"
      >
        {String(items.length).padStart(2, "0")}
      </span>
    </div>
  );
}

/** One category per scroll-reveal step: a heading, an optional subtitle, and its groups. */
function CategoryBlock({ label, subtitle, groups }: SkillCategory) {
  return (
    <div data-skill-row className="border-t border-white/10 py-8 last:border-b">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xs font-medium tracking-[0.16em] text-white/90 uppercase">
          {label}
        </h3>
        {subtitle && (
          <span className="text-[0.6875rem] text-white/35">{subtitle}</span>
        )}
      </div>

      <dl className="mt-4 divide-y divide-white/5 md:mt-5">
        {groups.map((group, i) => (
          <GroupRow key={group.label ?? i} {...group} />
        ))}
      </dl>
    </div>
  );
}

/**
 * Editorial two-column skills list: same sticky numbered rail as About, a
 * spec-sheet reading of the stack instead of a logo wall. Categories reveal
 * on scroll as one GSAP timeline (ui-ux-pro-max gsap domain: "Scroll Reveal /
 * Subtle" — opacity + small y, ~300-400ms, power1.out; a bigger back.out
 * overshoot reads as sloppy on this kind of informational UI).
 */
export default function SkillsSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = gsap.utils.toArray<HTMLElement>("[data-skill-row]", container);

    const tl = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: { trigger: container, start: "top 85%", once: true },
    });
    // .to(), not .from() — the hidden starting state lives in globals.css on
    // [data-skill-row] instead. A .from() tween bakes its start value into an
    // inline style the instant it's created (immediateRender), which React's
    // dev-mode double-effect (mount → cleanup → mount) turns into a trap: the
    // first instance sets opacity 0 inline, kill() doesn't undo that, and the
    // second .from() then reads 0 as its own end value too — permanently
    // invisible. .to() has no such start-value capture, so it's immune.
    tl.to(rows, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="skills"
      className="border-t border-white/10 bg-black px-6 py-28 md:px-10 md:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-3">
          <p className="border-t border-white/20 pt-4">
            <span className="block font-mono text-[0.625rem] tracking-[0.28em] text-white/30">
              02
            </span>
            <span className="mt-1.5 block text-[0.625rem] tracking-[0.28em] text-white/50 uppercase">
              Skills
            </span>
          </p>
          {SKILLS_INTRO && (
            <p className="mt-6 max-w-[13rem] text-[0.8125rem] leading-relaxed text-white/40">
              {SKILLS_INTRO}
            </p>
          )}
        </Reveal>

        <div ref={contentRef} className="lg:col-span-9">
          {SKILL_CATEGORIES.map((category) => (
            <CategoryBlock key={category.label} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
