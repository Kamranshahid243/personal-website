import type { Project } from "@/types/content";

/**
 * Case studies, in display order.
 *
 * Three to five entries, strongest first. A long list reads as a job board
 * history; a short curated one reads as taste.
 */
export const projects: Project[] = [];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
