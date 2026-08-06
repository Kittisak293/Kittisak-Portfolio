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

/** Height of the hero scroll track, in vh. The sticky stage inside it is 100svh. */
export const HERO_TRACK_VH = 600;

/**
 * The opening frames of the clip are nearly identical, so the picture reads as
 * held for the first few wheel notches. The text drum is far more sensitive —
 * a sliver of progress visibly rolls it. Without a matching hold, the copy
 * moves while the picture still looks parked.
 *
 * So the drum stays put for this many wheel notches, then rolls through every
 * beat across the remaining scroll. Raise it to hold the copy longer.
 */
export const TEXT_HOLD_NOTCHES = 4;

/** Pixels a single mouse-wheel notch scrolls. Chrome's default is 100. */
export const WHEEL_NOTCH_PX = 100;

export const framePath = (index: number) =>
  `/hero/frames/frame_${String(index).padStart(4, "0")}.jpg`;

export const FIRST_FRAME = framePath(1);

/**
 * One rendered headline line. A plain string covers the common case; the object
 * form adds a hanging indent, or overrides which line gets the serif treatment.
 */
export type BeatLine =
  | string
  | {
      text: string;
      /** Indent from the left edge, in em of the headline's own font size. */
      indent?: number;
      /** Force italic serif on or off. Defaults to true for the last line only. */
      serif?: boolean;
    };

export type Beat = {
  /** One entry per rendered line. Any length — beats need not be the same shape. */
  lines: BeatLine[];
  pill: string;
  body: string;
};

/** The last line of every headline is the italic serif one. */
export const BEATS: Beat[] = [
  {
    pill: "WHO I AM",
    lines: ["KITTISAK", { text: "JANWANRAK", indent: 1.5 }],
    body: "Fourth-year Computer Science student at Burapha University.",
  },
  {
    pill: "WHAT I DO",
    lines: ["FULL STACK", { text: "DEVELOPMENT", indent: 1.2 }],
    body: "Passionate about building end-to-end web applications. Always striving for clean, secure, and scalable solutions."
  },
  {
    pill: "OPEN FOR ROLES",
    lines: ["SOFTWARE", { text: "ENGINEER", indent: 1.5 }],
    body: "Ready to step into a Software Engineer role to solve real-world problems, design reliable systems, and create real value for users and businesses.",
  }
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
