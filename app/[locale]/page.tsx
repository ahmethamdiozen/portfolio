import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AnimatedWords, FadeUp, StaggerContainer, StaggerItem } from "@/components/AnimatedText";
import MagneticButton from "@/components/MagneticButton";
import SkillCard from "@/components/SkillCard";
import Image from "next/image";
import { ScrollRestorer } from "@/components/ScrollRestorer";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });
  const aboutT = await getTranslations({ locale, namespace: "about" });
  const skillsT = await getTranslations({ locale, namespace: "skills" });
  const contactT = await getTranslations({ locale, namespace: "contact" });

  const featuredProjects = getFeaturedProjects();

  const skills = [
    "Python",
    "TypeScript",
    "Node.js",
    "FastAPI",
    "Next.js",
    "React",
    "Docker",
    "PostgreSQL",
    "Redis",
    "Kafka",
  ];

  return (
    <div>
      <ScrollRestorer />
      <ScrollProgress />
      <Hero locale={locale} />

      {/* About */}
      <section id="about" className="py-16 sm:py-24 bg-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp>
            <h2 className="text-sm font-medium text-[#9B9589] tracking-widest uppercase mb-6">
              {aboutT("heading")}
            </h2>
          </FadeUp>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            <FadeUp delay={0.3} className="flex-shrink-0 order-first md:order-last">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-3xl overflow-hidden border border-[#E8E4DC]">
                <Image
                  src="/hamdi.jpg"
                  alt="Ahmet Hamdi Özen"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </FadeUp>
            <div className="flex-1">
              <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#2C2C2C] leading-snug text-center md:text-left">
                <AnimatedWords text={aboutT("body")} delay={0.1} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-medium text-[#9B9589] tracking-widest uppercase mb-2">
                Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C]">{t("heading")}</h2>
            </div>
            <MagneticButton strength={0.3}>
              <Link
                href={`/${locale}/projects`}
                className="group hidden sm:flex items-center gap-2 text-sm font-medium text-[#8B7355] border border-[#E8E4DC] px-4 py-2 rounded-lg hover:border-[#8B7355] transition-colors duration-300"
              >
                {t("view_all")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </MagneticButton>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard
                  slug={project.slug}
                  title={project.frontmatter.title}
                  description={project.frontmatter.description}
                  stack={project.frontmatter.stack}
                  locale={locale}
                  github={project.frontmatter.github}
                  demo={project.frontmatter.demo}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp className="mt-8 text-center sm:hidden">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#8B7355]"
            >
              {t("view_all")} →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-16 sm:py-24 bg-[#F5F3EE]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp className="mb-10">
            <p className="text-sm font-medium text-[#9B9589] tracking-widest uppercase mb-2">
              Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C]">{skillsT("heading")}</h2>
          </FadeUp>

          <StaggerContainer
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
            staggerDelay={0.05}
          >
            {skills.map((skill) => (
              <StaggerItem key={skill}>
                <SkillCard name={skill} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeUp className="mb-4">
            <p className="text-sm font-medium text-[#9B9589] tracking-widest uppercase mb-2">
              Contact
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4 leading-tight">
              {contactT("heading")}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base sm:text-lg text-[#9B9589] mb-10 sm:mb-12 max-w-lg">{contactT("subheading")}</p>
          </FadeUp>

          <StaggerContainer className="flex flex-col sm:flex-row gap-4" staggerDelay={0.1}>
            <StaggerItem>
              <MagneticButton strength={0.3}>
                <a
                  href="mailto:ahmet@example.com"
                  className="group relative overflow-hidden inline-flex items-center gap-3 px-7 py-3.5 bg-[#2C2C2C] text-white rounded-lg font-medium text-sm"
                  data-cursor-hover
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    {contactT("email_label")}
                  </span>
                  <span className="absolute inset-0 bg-[#8B7355] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]" />
                </a>
              </MagneticButton>
            </StaggerItem>

            <StaggerItem>
              <MagneticButton strength={0.3}>
                <a
                  href="https://github.com/ahmethamdiozen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 border border-[#E8E4DC] text-[#2C2C2C] rounded-lg font-medium text-sm hover:border-[#8B7355] hover:text-[#8B7355] transition-all duration-300"
                  data-cursor-hover
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                  {contactT("github_label")}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                </a>
              </MagneticButton>
            </StaggerItem>

            <StaggerItem>
              <MagneticButton strength={0.3}>
                <a
                  href="https://linkedin.com/in/ahmethamdiozen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 border border-[#E8E4DC] text-[#2C2C2C] rounded-lg font-medium text-sm hover:border-[#8B7355] hover:text-[#8B7355] transition-all duration-300"
                  data-cursor-hover
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  {contactT("linkedin_label")}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                </a>
              </MagneticButton>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
