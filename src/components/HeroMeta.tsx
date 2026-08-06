/**
 * Persistent meta column down the right edge. Large screens only — it would
 * crowd the headline anywhere narrower.
 */
export default function HeroMeta() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-56 flex-col justify-between py-28 pr-10 text-right text-[0.625rem] tracking-[0.22em] text-white/50 uppercase lg:flex">
      <div className="space-y-1.5">
        <p>Final year</p>
        <p>Computer Science</p>
        {/* <p>Burapha University</p> */}
      </div>

      <div className="space-y-1.5">
        <p>Looking for internships</p>
        <p>Software Engineer</p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span>Scroll to explore</span>
        <svg
          width="10"
          height="14"
          viewBox="0 0 10 14"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M5 0v12M1 8l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
