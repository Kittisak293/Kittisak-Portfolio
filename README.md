# Kittisak Janwanrak — Portfolio

A scroll-scrubbed video hero. Scroll position is the video's playhead: scroll down and
the video advances, scroll up and it rewinds, stop and it holds on a frame. Headline
copy rides on a rotating drum locked to the same playhead.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lenis, and GSAP.

---

## ⚠️ Read this first — the frames are not in git

`public/hero/frames/` is **gitignored**. A fresh clone has no images, and the hero will
render as a black screen until you generate them.

`final.mp4` **is** committed — it is the irreplaceable source. Run the command below to
rebuild the frame sequence from it.

---

## Generating the frame sequence

Browsers cannot scrub a video file smoothly, so the video is turned into a numbered
JPEG sequence drawn onto a canvas.

Requires [ffmpeg](https://ffmpeg.org/) on your `PATH`. On Windows:
`winget install Gyan.FFmpeg`. On macOS: `brew install ffmpeg`.

From the project root:

```bash
mkdir -p public/hero/frames && ffmpeg -i final.mp4 -vf "fps=24,scale=1920:-2" -q:v 6 -start_number 1 public/hero/frames/frame_%04d.jpg
```

On PowerShell, use this instead (PowerShell has no `mkdir -p`):

```bash
New-Item -ItemType Directory -Force public/hero/frames; ffmpeg -i final.mp4 -vf "fps=24,scale=1920:-2" -q:v 6 -start_number 1 public/hero/frames/frame_%04d.jpg
```

What each part does:

| Flag | Why |
| --- | --- |
| `fps=24` | `final.mp4` is natively 24 fps (`ffprobe` reports `r_frame_rate=24/1`, `nb_frames=266`). Extracting at 24 keeps every source frame — no dropping, no interpolation. |
| `scale=1920:-2` | 1920px wide, aspect ratio preserved, `-2` forces an even pixel height (1072). |
| `-q:v 6` | JPEG quality. Lands each frame near 66 KB. |
| `-start_number 1` | Numbering starts at 1, zero-padded to four digits: `frame_0001.jpg`. |

### Expected output

| | |
| --- | --- |
| Frames | **266** (`frame_0001.jpg` … `frame_0266.jpg`, contiguous) |
| Folder size | ~17.3 MB |
| Average frame | ~66 KB |
| Dimensions | 1920 × 1072 |

## FRAME_COUNT must match the files on disk

`FRAME_COUNT` in [`src/lib/hero-config.ts`](src/lib/hero-config.ts) is currently **266**
and must equal the real number of files in `public/hero/frames/`. Never estimate it —
count what actually landed:

```bash
ls public/hero/frames | wc -l
```

PowerShell:

```bash
(Get-ChildItem public/hero/frames -Filter "frame_*.jpg").Count
```

If the count and `FRAME_COUNT` disagree, the scrub will either stop short of the end of
the clip or reach for frames that do not exist. **If you change the frame rate in the
ffmpeg command, you must recount and update `FRAME_COUNT`.**

## Running the dev server

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>. If port 3000 is taken, Next.js picks another port and
prints the actual URL.

Other scripts: `npm run build` for a production build, `npm start` to serve it,
`npm run lint` for ESLint.

## Tuning the scrub

**`SCRUB_EASE` in [`src/lib/hero-config.ts`](src/lib/hero-config.ts) is the one number
that controls scrub speed.** Default `0.12`.

Every animation frame the playhead moves a fraction of the remaining distance toward the
scroll target:

```ts
current += (target - current) * SCRUB_EASE;
```

- **Lower** (e.g. `0.06`) — heavier, more lag, more cinematic drift after you stop scrolling.
- **Higher** (e.g. `0.25`) — tighter and snappier, tracks the scrollbar more literally.
- `1` removes the easing entirely and makes the video snap to the raw scroll position.

Related knobs in the same file:

- `TILT_EASE` (`0.08`) — how fast the cursor-parallax tilt chases the pointer.
- `DRUM` — geometry of the rotating text drum: travel, depth, and degrees of pitch per beat.

Hero scroll length is set by the `h-[600vh]` track in
[`src/components/ScrollVideoHero.tsx`](src/components/ScrollVideoHero.tsx). A taller track
spreads the same 266 frames over more scrolling, which also slows the scrub.

## How it works

- **[`SmoothScroll.tsx`](src/components/SmoothScroll.tsx)** — starts Lenis, drives it from
  one rAF loop, and pushes `ScrollTrigger.update` on every Lenis scroll event so GSAP and
  the hero read the same smoothed position. Skipped entirely under `prefers-reduced-motion`.
- **[`ScrollVideoHero.tsx`](src/components/ScrollVideoHero.tsx)** — a 600vh track with a
  sticky 100svh stage. Reads progress from `getBoundingClientRect`, eases the playhead
  toward it, and renders sub-frame positions by cross-blending the floor frame at full
  opacity with the next frame at the fractional alpha. Work is skipped while the hero is
  off screen via `IntersectionObserver`.
- **[`HeroDrum.tsx`](src/components/HeroDrum.tsx)** — three headline beats transformed as if
  printed on a cylinder, reading the hero's smoothed progress ref from its own rAF loop.
  Renders an initial transform in `vh` units so the beats are placed correctly server-side.

On screens 768px and narrower, or under `prefers-reduced-motion`, the sequence is never
downloaded — the hero falls back to a single still of `frame_0001.jpg`.
