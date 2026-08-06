/**
 * Copy and data for the Projects section — same split as about-content.ts
 * and skills-content.ts, so content can be edited without touching layout.
 * Ordered newest-first, matching the git-log framing of the section itself.
 */

export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  id: string;
  name: string;
  /** Expands an acronym or gives a fuller product name. Shown only in the expanded panel. */
  fullName?: string;
  type: string;
  role: string;
  period: string;
  stack: string[];
  description: string;
  highlights: string[];
  images: [ProjectImage, ProjectImage];
};

export const GITHUB_PROFILE_URL = "https://github.com/Kittisak293";

export const PROJECTS: Project[] = [
  {
    id: "hids",
    name: "HIDS",
    fullName: "Home Inspection and Defect Management System",
    type: "Web App",
    role: "Full-Stack Developer & System Analyst",
    period: "03/2026 – Present",
    stack: [
      "Vue 3",
      "NestJS",
      "TypeScript",
      "Quasar",
      "TypeORM",
      "PostgreSQL",
      "Pinia",
    ],
    description:
      "A dedicated web application for home inspection companies to track structural issues and defects. Features a comprehensive management ecosystem with multi-role access for Admins, Engineers, Contractors, and Customers.",
    highlights: [
      "Gathered requirements and designed the Figma UX",
      "Designed the PostgreSQL schema architecture",
      "Built the REST APIs and frontend",
      "Implemented JWT auth with RBAC and Hash-based password security",
      "Designed the engineer's inspection flow to log defects in as few steps as possible, so it's fast to use on-site",
      "Built a cached PDF pipeline that generates defect reports instantly"
    ],
    images: [
      { src: "/projects/hids.png", alt: "HIDS defect tracking dashboard" },
      { src: "/projects/hids2.png", alt: "HIDS inspection report view" },
    ],
  },
  {
    id: "rumo",
    name: "Rumo",
    fullName: "E-Commerce Platform",
    type: "Self-Initiated Web App",
    role: "Full-Stack Developer (solo)",
    period: "09/2025 – Present",
    stack: [
      "Vue 3",
      "NestJS",
      "TypeScript",
      "Tailwind CSS",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    description:
      "A personal full-stack project built to deeply explore modern web architectures, featuring vendor onboarding, membership accounts, shopping carts, coupon management, and order tracking systems.",
    highlights: [
      "Independently chose and benchmarked the stack",
      "Built the ERD in Miro and UI in Figma",
      "Built a responsive Vue 3 + Tailwind frontend",
      "Designed a PostgreSQL schema for 10+ entities",
    ],
    images: [
      { src: "/projects/rumo.png", alt: "Rumo storefront homepage" },
      { src: "/projects/rumo2.png", alt: "Rumo vendor dashboard" },
    ],
  },
  {
    id: "pos-dcoffee",
    name: "POS D.Coffee System",
    fullName: "Coffee Shop POS System",
    type: "Web App",
    role: "Full-Stack Developer",
    period: "02/2025 – 04/2025",
    stack: [
      "Vue 3",
      "Quasar",
      "TypeScript",
      "NestJS",
      "TypeORM",
      "SQLite",
      "Pinia",
      "Chart.js",
    ],
    description:
      "A coffee shop management and Point of Sale (POS) system integrated with multi-branch sales dashboards, real-time inventory tracking, and employee management systems.",
    highlights: [
      "Built the backend architecture for stock tracking",
      "Implemented E2E real-time stock logic",
      "Refactored the POS frontend and optimized APIs",
      "Built interactive Chart.js dashboards",
    ],
    images: [
      {
        src: "/projects/pos-coffee.png",
        alt: "POS D.Coffee point-of-sale screen",
      },
      {
        src: "/projects/pos-coffee2.png",
        alt: "POS D.Coffee sales dashboard",
      },
    ],
  },
];
