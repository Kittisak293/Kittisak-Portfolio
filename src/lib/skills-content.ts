/**
 * Copy and data for the Skills section — same split as about-content.ts and
 * hero-config.ts, so the list can be reordered or edited without touching
 * layout.
 */

export const SKILLS_INTRO =
  // "Tools I reach for daily, grouped by where they sit in the stack.";
  "";

export type SkillGroup = {
  /** Sub-label within a category, e.g. "Databases" under "Backend & Databases". Omit for a category with a single, ungrouped list. */
  label?: string;
  items: string[];
};

export type SkillCategory = {
  label: string;
  /** Short muted line under the category label — used only where it adds real information. */
  subtitle?: string;
  groups: SkillGroup[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: "Languages",
    groups: [
      {
        items: [
          "TypeScript",
          "JavaScript",
          "Java",
          "Python",
          "SQL",
          "HTML5, CSS3 & SCSS",
        ],
      },
    ],
  },
  {
    label: "Frontend Development",
    groups: [
      {
        label: "Frameworks & Libraries",
        items: ["Vue.js", "Nuxt.js", "Quasar Framework"],
      },
      { label: "Styling", items: ["Tailwind CSS"] },
    ],
  },
  {
    label: "Backend & Databases",
    groups: [
      { label: "Frameworks", items: ["NestJS"] },
      {
        label: "Databases",
        items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
      },
    ],
  },
  {
    label: "DevOps, Testing & Cloud",
    groups: [
      { label: "Version Control & Container", items: ["Git", "Docker"] },
      { label: "Testing & API", items: ["Cypress", "Postman"] },
      {
        label: "Deployment & Hosting",
        items: ["Vercel", "Render", "Netlify"],
      },
    ],
  },
  {
    label: "AI & Developer Tools",
    subtitle: "Modern workflows & productivity",
    groups: [{ items: ["Claude", "Antigravity","Cursor" ] }],
  },
  {
    label: "Design & Architecture Tools",
    subtitle: "System design, diagramming & documentation",
    groups: [{ items: ["Figma", "Miro", "Lucidchart", "Draw.io", "Notion"] }],
  },
];
