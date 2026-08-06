/**
 * Copy and data for the Contact section — same split as about-content.ts and
 * skills-content.ts, so channels and copy can be edited without touching
 * layout. GITHUB_PROFILE_URL is imported rather than redefined so the URL has
 * a single source of truth (it is also used by the Projects section).
 */
import { GITHUB_PROFILE_URL } from "@/lib/projects-content";

export const CONTACT_EMAIL = "kittisakcus2@gmail.com";
export const CONTACT_PHONE_DISPLAY = "094 229 5614";
export const CONTACT_PHONE_COPY = "0942295614";
/** International form for the tel: link — drop the leading 0, prefix +66. */
export const CONTACT_PHONE_TEL = "+66942295614";

/**
 * Serif-italic closing line, bookending the hero's serif-italic headline beats
 * and its "Looking for internships" meta. Editable here, not in the JSX.
 */
export const CONTACT_SIGNOFF = {
  lead: "Open to internships and",
  emphasis: "the right first team.",
};

export type SecondaryChannel = {
  label: string;
  value: string;
  href: string;
  /** When set, the row renders a copy button carrying this exact string. */
  copy?: string;
  /** External links open in a new tab with noreferrer. */
  external?: boolean;
};

export const SECONDARY_CHANNELS: SecondaryChannel[] = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    copy: CONTACT_EMAIL,
  },
  {
    label: "GitHub",
    value: "github.com/Kittisak293",
    href: GITHUB_PROFILE_URL,
    external: true,
  },
  {
    label: "Phone",
    value: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE_TEL}`,
    copy: CONTACT_PHONE_COPY,
  },
];
