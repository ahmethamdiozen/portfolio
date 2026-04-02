import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  const projects = getAllProjects();
  const locales = ['en', 'tr'];

  return locales.flatMap(locale =>
    projects.map(project => ({
      locale,
      slug: project.slug,
    }))
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'projects' });

  if (!project) notFound();

  const { frontmatter, content } = project;

  return (
    <ProjectDetailClient>
      <div className="min-h-screen bg-[#FAF9F6] py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href={`/${locale}/projects`}
            className="text-sm text-[#9B9589] hover:text-[#8B7355] transition-colors mb-8 inline-flex items-center gap-1 group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            {t('heading')}
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#2C2C2C] mt-4 mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-base sm:text-lg text-[#9B9589] mb-6">{frontmatter.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {frontmatter.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-[#E8E4DC] text-[#8B7355] text-xs sm:text-sm"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-[#E8E4DC]">
            {frontmatter.github && (
              <a
                href={frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#7a6347] transition-colors text-sm font-medium"
              >
                {t('github')} ↗
              </a>
            )}
            {frontmatter.demo && (
              <a
                href={frontmatter.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#E8E4DC] text-[#2C2C2C] rounded-lg hover:border-[#8B7355] transition-colors text-sm font-medium"
              >
                {t('demo')} ↗
              </a>
            )}
          </div>

          <div className="prose prose-stone max-w-none
            prose-headings:text-[#2C2C2C] prose-headings:font-bold
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:sm:mt-10 prose-h2:mb-4
            prose-p:text-[#2C2C2C] prose-p:leading-relaxed prose-p:text-[15px] prose-p:sm:text-base
            prose-li:text-[#2C2C2C] prose-li:text-[15px] prose-li:sm:text-base
            prose-strong:text-[#2C2C2C]
            prose-code:bg-[#F5F3EE] prose-code:text-[#8B7355] prose-code:px-1 prose-code:rounded
          ">
            <MDXRemote source={content} />
          </div>
        </div>
      </div>
    </ProjectDetailClient>
  );
}
