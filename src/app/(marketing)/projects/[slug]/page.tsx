import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { ProjectCaseStudy } from "@/components/project/project-case-study";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/projects";
import { createMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  buildGraph,
  creativeWorkSchema,
} from "@/lib/seo/json-ld";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createMetadata({ title: "Not found", noIndex: true });
  }

  const description =
    project.summary.length >= 110
      ? project.summary
      : `${project.summary} Case study: ${project.problem}`;

  return createMetadata({
    title: project.title,
    description: description.slice(0, 160),
    pathname: `/projects/${project.slug}`,
    image:
      project.cover.src ??
      `/api/og?title=${encodeURIComponent(project.title)}&eyebrow=${encodeURIComponent(project.category)}`,
    keywords: [project.category, project.client, ...project.stack],
    // Case studies are CreativeWork in JSON-LD, not blog articles in OG.
    ogType: "website",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project);
  const pathname = `/projects/${project.slug}`;

  return (
    <>
      <JsonLd
        graph={buildGraph(
          creativeWorkSchema({
            name: project.title,
            description: project.summary,
            slug: project.slug,
            datePublished: `${project.year}-01-01`,
            keywords: [project.category, ...project.stack],
            genre: project.category,
            image: project.cover.src,
            about: project.businessProblem,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: pathname },
          ]),
        )}
      />
      <ProjectCaseStudy project={project} related={related} />
    </>
  );
}
