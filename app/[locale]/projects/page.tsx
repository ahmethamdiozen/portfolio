import { getAllProjects } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";
import ProjectCard from "@/components/ProjectCard";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2C2C2C] mb-12">{t('heading')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.frontmatter.title}
              description={project.frontmatter.description}
              stack={project.frontmatter.stack}
              locale={locale}
              github={project.frontmatter.github}
              demo={project.frontmatter.demo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
