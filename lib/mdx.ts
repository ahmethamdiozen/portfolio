import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/projects');

export type Locale = 'en' | 'tr';
const DEFAULT_LOCALE: Locale = 'en';

export interface ProjectFrontmatter {
  title: string;
  description: string;
  stack: string[];
  date: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  image?: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

function readProjectFile(slug: string, locale: Locale): Project | null {
  const localized = path.join(contentDirectory, `${slug}.${locale}.mdx`);
  const fallback = path.join(contentDirectory, `${slug}.${DEFAULT_LOCALE}.mdx`);

  const filePath = fs.existsSync(localized)
    ? localized
    : fs.existsSync(fallback)
      ? fallback
      : null;

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

function getProjectSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.mdx'));
  const slugs = new Set<string>();
  for (const filename of files) {
    const match = filename.match(/^(.+)\.(en|tr)\.mdx$/);
    if (match) slugs.add(match[1]);
  }
  return Array.from(slugs);
}

export function getAllProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  const slugs = getProjectSlugs();
  const projects: Project[] = [];
  for (const slug of slugs) {
    const project = readProjectFile(slug, locale);
    if (project) projects.push(project);
  }
  return projects.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getProjectBySlug(slug: string, locale: Locale = DEFAULT_LOCALE): Project | null {
  return readProjectFile(slug, locale);
}

export function getFeaturedProjects(locale: Locale = DEFAULT_LOCALE): Project[] {
  return getAllProjects(locale).filter(p => p.frontmatter.featured);
}
