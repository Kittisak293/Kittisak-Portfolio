import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import SiteNav from "@/components/SiteNav";
import SkillsSection from "@/components/SkillsSection";

const STUB_SECTIONS = [{ id: "contact", title: "Contact" }];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top" className="bg-black">
        <ScrollVideoHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />

        {STUB_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="flex min-h-[60vh] items-center bg-black px-6 py-24 text-white md:px-10 lg:px-16"
          >
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {section.title}
            </h2>
          </section>
        ))}
      </main>
    </>
  );
}
