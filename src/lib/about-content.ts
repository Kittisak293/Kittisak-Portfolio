/**
 * Copy for the About section, kept out of the component so the words can be
 * rewritten without touching layout — the same split hero-config.ts uses.
 *
 * These strings are Kittisak's own wording, verbatim. Leave them that way.
 */

export const ABOUT_INTRO = {
  greeting: "Hi, I’m “Focus” Kittisak Janwanrak",
  role: "Full Stack Developer | Senior Computer Science Student at Burapha University",
};

export const ABOUT_STORY =
  "Growing up with a deep fascination for both software and hardware, pursuing Computer Science was a natural choice. I am passionate about full-stack web development and view complex technical challenges much like beating video game levels—exciting, rewarding, and constantly pushing me to find the cleanest solutions.";

export type AboutEntry = {
  term: string;
  detail: string;
};

export type AboutGroup = {
  label: string;
  entries: AboutEntry[];
};

export const ABOUT_GROUPS: AboutGroup[] = [
  {
    label: "Mindset & Working Style",
    entries: [
      {
        term: "Lifelong Learner",
        detail:
          "Enthusiastic about adopting new skills, exploring emerging technologies, and continuously pushing my technical boundaries.",
      },
      {
        term: "Team-Oriented Problem Solver",
        detail:
          "Thrive in collaborative environments, exchanging perspectives with teammates to solve tough problems and deliver high-quality results.",
      },
    ],
  },
  {
    label: "Career Goals & Vision",
    entries: [
      {
        term: "Short-Term (2–3 Years)",
        detail:
          "Solidify my full-stack engineering foundations, master robust system design, and consistently deliver clean, maintainable software.",
      },
      {
        term: "Ultimate Goal",
        detail:
          "Unbothered by rigid job titles and fully adaptable to team goals. My primary drive is seeing the software I build solve real user pain points and power business growth.",
      },
    ],
  },
];
