import Reveal from "@/components/Reveal";
import { ABOUT_GROUPS, ABOUT_INTRO, ABOUT_STORY } from "@/lib/about-content";

/**
 * Editorial two-column about: a numbered label that parks itself against the
 * top of the viewport on wide screens, and the intro, story, and spec sheet
 * running down the right. Plain-spoken on purpose — this section states
 * things rather than performs them, unlike the hero's headline drum.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-black px-6 py-28 md:px-10 md:py-36 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-y-12 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="self-start lg:sticky lg:top-28 lg:col-span-3">
          <p className="border-t border-white/20 pt-4">
            <span className="block font-mono text-[0.625rem] tracking-[0.28em] text-white/30">
              01
            </span>
            <span className="mt-1.5 block text-[0.625rem] tracking-[0.28em] text-white/50 uppercase">
              About Me
            </span>
          </p>
        </Reveal>

        <div className="lg:col-span-9">
          <Reveal>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {ABOUT_INTRO.greeting}
            </h2>
            <p className="mt-3 max-w-2xl text-sm tracking-tight text-white/50 md:text-base">
              {ABOUT_INTRO.role}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              {ABOUT_STORY}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-20 grid gap-x-12 gap-y-14 md:grid-cols-2">
              {ABOUT_GROUPS.map((group) => (
                <div key={group.label}>
                  <h3 className="text-[0.625rem] tracking-[0.28em] text-white/40 uppercase">
                    {group.label}
                  </h3>

                  <dl className="mt-5">
                    {group.entries.map((entry) => (
                      <div
                        key={entry.term}
                        className="border-t border-white/10 py-5"
                      >
                        <dt className="text-sm font-medium text-white">
                          {entry.term}
                        </dt>
                        <dd className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                          {entry.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
