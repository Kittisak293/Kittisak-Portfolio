const LINKS = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

/**
 * The wrapper is pointer-events-none so it never blocks the hero; every
 * interactive child opts back in.
 */
export default function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10 lg:px-16">
      <a
        href="#top"
        className="pointer-events-auto leading-tight text-white"
        aria-label="Kittisak Janwanrak — Software Engineer"
      >
        <span className="block text-sm font-semibold tracking-tight md:text-base">
          KITTISAK JANWANRAK
        </span>
        <span className="block text-[0.5625rem] tracking-[0.3em] text-white/50 uppercase">
          Software Engineer
        </span>
      </a>

      <nav className="pointer-events-auto hidden md:block">
        <ul className="flex items-center gap-1 rounded-full border border-white/15 bg-black/40 px-2 py-1.5 backdrop-blur-md">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-4 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href="#contact"
        className="group pointer-events-auto flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-xs font-medium text-black transition-colors hover:bg-white/90"
      >
        Contact
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          >
            <path
              d="M2 6h8M6.5 2.5 10 6l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </header>
  );
}
