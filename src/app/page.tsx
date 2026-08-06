import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import SiteNav from "@/components/SiteNav";
import SkillsSection from "@/components/SkillsSection";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main id="top" className="bg-black">
        <ScrollVideoHero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
