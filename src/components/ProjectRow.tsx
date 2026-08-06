"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects-content";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-white/40 transition-transform duration-300 motion-reduce:transition-none ${
        open ? "rotate-45" : ""
      }`}
    >
      <path
        d="M7 1v12M1 7h12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * One disclosure row: collapsed shows date / name / type & role at a glance.
 * Expanded reveals the description, highlights, stack, and screenshots.
 *
 * The panel animates via grid-template-rows (0fr -> 1fr) rather than a GSAP
 * height tween: the browser recomputes the natural height every frame, which
 * stays correct even while a lazily-mounted <Image> is still loading, since
 * its aspect-ratio box reserves height from CSS alone before any pixels
 * arrive. A scrollHeight-based tween would need to re-measure on image load
 * to avoid a second jump.
 */
export default function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const triggerId = `project-trigger-${project.id}`;
  const panelId = `project-panel-${project.id}`;

  const toggle = () => {
    setOpen((v) => !v);
    if (!hasOpened) setHasOpened(true);
  };

  return (
    <div data-project-row className="border-t border-white/10 last:border-b">
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className="grid w-full grid-cols-[1fr_auto] items-start gap-4 py-6 text-left md:grid-cols-[108px_1fr_auto] md:items-center md:gap-8"
      >
        <span className="order-2 font-mono text-[0.6875rem] tracking-[0.08em] text-white/35 md:order-1">
          {project.period}
        </span>
        <span className="order-1 md:order-2">
          <span className="block text-base font-medium text-white md:text-lg">
            {project.name}
          </span>
          <span className="mt-1 block text-xs text-white/45">
            {project.type} &middot; {project.role}
          </span>
        </span>
        <span className="order-3 self-start pt-1 md:self-center md:pt-0">
          <Chevron open={open} />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        inert={open ? undefined : true}
        className={`grid transition-[grid-template-rows] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-8 md:pl-[132px]">
            {project.fullName && (
              <p className="text-xs text-white/40">{project.fullName}</p>
            )}

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
              {project.description}
            </p>

            <ul className="mt-5 space-y-2">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed text-white/55"
                >
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-white/25"
                  />
                  {highlight}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.6875rem] text-white/55"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {hasOpened && (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {project.images.map((image) => (
                  <div
                    key={image.src}
                    className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10 bg-white/[0.03]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 90vw"
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
