import { AboutSection } from "@/components/sections/about";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { ExperienceSection } from "@/components/sections/experience";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero";
import { LatestBlogPostsSection } from "@/components/sections/latest-blog-posts";
import { ServicesSection } from "@/components/sections/services";
import { TechStackSection } from "@/components/sections/tech-stack";
import { WhyWorkWithMeSection } from "@/components/sections/why-work-with-me";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/content/blog";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  pathname: "/",
  ogType: "profile",
  description:
    "Kamran Shahid — full stack software engineer specializing in React, Next.js, TypeScript, Node.js, and AI workflow automation. Based in Pakistan.",
});

const LATEST_POSTS = 3;

/**
 * Conversion homepage.
 *
 * Trimmed to proof + offer + ask: hero, about, services, experience, work,
 * stack, differentiators, writing, contact. Skills/process were redundant with
 * stack and why-work-with-me and delayed the primary CTA.
 */
export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, LATEST_POSTS);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <ExperienceSection experience={experience} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <TechStackSection />
      <WhyWorkWithMeSection />
      <LatestBlogPostsSection posts={posts} />
      <ContactCtaSection />
    </>
  );
}
