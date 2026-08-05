/**
 * Frame sequence + scrub tuning for the scroll-driven hero.
 *
 * The sequence is extracted at 24 fps — final.mp4's native rate — so every
 * source frame survives with no dropping or interpolation.
 *
 * FRAME_COUNT is the real number of files in public/hero/frames — counted on
 * disk after extraction, never estimated. If you re-extract the sequence at a
 * different frame rate, recount and update this number.
 */
export const FRAME_COUNT = 266;

/**
 * How hard the playhead chases the scroll position each animation frame.
 * Lower = heavier, more lag, more cinematic. Higher = tighter, snappier.
 * This is the one number to change to make the scrub slower or faster.
 */
export const SCRUB_EASE = 0.12;

/** How hard the cursor tilt chases the pointer. Same idea, separate feel. */
export const TILT_EASE = 0.08;

export const framePath = (index: number) =>
  `/hero/frames/frame_${String(index).padStart(4, "0")}.jpg`;

export const FIRST_FRAME = framePath(1);

export type Beat = {
  pill: string;
  lines: [string, string, string];
  body: string;
};

/** The third line of every headline is the italic serif one. */
export const BEATS: Beat[] = [
  {
    pill: "PORTFOLIO 2026",
    lines: ["Building things", "that work, and", "feel considered."],
    body: "Fourth-year Computer Science student at Burapha University, shipping web products end to end.",
  },
  {
    pill: "WHAT I WORK WITH",
    lines: ["TypeScript from", "the interface", "down to the API."],
    body: "Vue.js and Quasar on the front, NestJS on the back — one language, one mental model, all the way through.",
  },
  {
    pill: "OPEN TO WORK",
    lines: ["Looking for a", "team worth", "building with."],
    body: "Graduating soon and ready for real problems, real users, and people who care how it's made.",
  },
];

/** Drum geometry — beats live on the surface of a cylinder larger than the screen. */
export const DRUM = {
  perspective: 900,
  /** vertical travel per beat, as a fraction of viewport height */
  y: 0.82,
  /** how far each beat recedes as it leaves centre, as a fraction of viewport height */
  z: 0.3,
  /** degrees of pitch per beat */
  rotate: 58,
} as const;
