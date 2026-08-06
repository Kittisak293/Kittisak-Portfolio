"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { CONTACT_SIGNOFF, SECONDARY_CHANNELS } from "@/lib/contact-content";

/**
 * Copies `value` to the clipboard and swaps its own label to "Copied" for a
 * moment. The feedback is a text swap, not an animation, so it reads correctly
 * under prefers-reduced-motion with no extra branching. aria-live announces
 * the change to screen readers.
 */
function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable (insecure context / denied) — the adjacent
      // mailto/tel link is the fallback, so fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.08em] text-white/50 uppercase transition-colors hover:border-white/30 hover:text-white/80 focus-visible:text-white"
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

/**
 * The close. Same sticky rail + content grid as the other sections. Email,
 * GitHub, and phone sit in one shared channel list so they read as equals. A
 * serif-italic sign-off bookends the hero's serif-italic beats, and a thin
 * colophon stands in for the footer the site otherwise lacks.
 */
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-black px-6 py-28 md:px-10 md:py-36 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-3">
            <p className="border-t border-white/20 pt-4">
              <span className="block font-mono text-[0.625rem] tracking-[0.28em] text-white/30">
                04
              </span>
              <span className="mt-1.5 block text-[0.625rem] tracking-[0.28em] text-white/50 uppercase">
                Contact
              </span>
            </p>
          </Reveal>

          <div className="lg:col-span-9">
            <Reveal>
              <p className="text-[0.625rem] tracking-[0.28em] text-white/40 uppercase">
                Get in touch
              </p>
              <h2 className="mt-5 max-w-2xl text-3xl leading-[1.05] text-white md:text-4xl lg:text-5xl">
                <span className="block font-semibold tracking-tight">
                  {CONTACT_SIGNOFF.lead}
                </span>
                <span className="block font-semibold tracking-tight">
                  {CONTACT_SIGNOFF.emphasis}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-16 max-w-xl">
                {SECONDARY_CHANNELS.map((channel) => (
                  <div
                    key={channel.label}
                    className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-white/10 py-5"
                  >
                    <dt className="w-20 shrink-0 text-[0.625rem] tracking-[0.22em] text-white/40 uppercase">
                      {channel.label}
                    </dt>
                    <dd className="flex flex-1 flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="text-sm text-white/70 transition-colors hover:text-white md:text-base"
                      >
                        {channel.value}
                        {channel.external && (
                          <span aria-hidden className="ml-1 text-white/40">
                            ↗
                          </span>
                        )}
                      </a>
                      {channel.copy && <CopyButton value={channel.copy} />}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[0.6875rem] tracking-[0.08em] text-white/30">
          <span>© 2026 Kittisak Janwanrak</span>
          <a href="#top" className="transition-colors hover:text-white/60">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}
