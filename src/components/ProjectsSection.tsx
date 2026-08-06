"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "@/components/Reveal";
import ProjectRow from "@/components/ProjectRow";
import { GITHUB_PROFILE_URL, PROJECTS } from "@/lib/projects-content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial two-column projects list: same sticky numbered rail as About and
 * Skills, a git-log reading of the work instead of a card grid. Rows reveal
 * on scroll as one GSAP timeline, using .to() rather than .from() — see
 * SkillsSection.tsx for why: .from()'s immediateRender bakes the hidden
 * state into an inline style the instant it's created, and React Strict
 * Mode's dev-mode double-effect-invocation turns that into a tween that
 * permanently locks at opacity 0. The hidden starting state lives in CSS
 * instead (globals.css, [data-project-row]).
 */
export default function ProjectsSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rows = gsap.utils.toArray<HTMLElement>(
      "[data-project-row]",
      container,
    );

    const tl = gsap.timeline({
      defaults: { ease: "power1.out" },
      scrollTrigger: { trigger: container, start: "top 85%", once: true },
    });
    tl.to(rows, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="projects"
      className="border-t border-white/10 bg-black px-6 py-28 md:px-10 md:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-3">
          <p className="border-t border-white/20 pt-4">
            <span className="block font-mono text-[0.625rem] tracking-[0.28em] text-white/30">
              03
            </span>
            <span className="mt-1.5 block text-[0.625rem] tracking-[0.28em] text-white/50 uppercase">
              Projects
            </span>
          </p>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-block text-[0.8125rem] text-white/40 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/70"
          >

          </a>
        </Reveal>

        <div ref={contentRef} className="lg:col-span-9">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
