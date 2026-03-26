import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/projects');

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

export function getAllProjects(): Project[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.mdx'));

  return files.map(filename => {
    const slug = filename.replace('.mdx', '');
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  }).sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter(p => p.frontmatter.featured);
}
