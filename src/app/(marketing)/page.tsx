import { AboutSection } from "@/components/sections/about";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { DevelopmentProcessSection } from "@/components/sections/development-process";
import { ExperienceSection } from "@/components/sections/experience";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects";
import { HeroSection } from "@/components/sections/hero";
import { LatestBlogPostsSection } from "@/components/sections/latest-blog-posts";
import { ServicesSection } from "@/components/sections/services";
import { SkillsSection } from "@/components/sections/skills";
import { TechStackSection } from "@/components/sections/tech-stack";
import { WhyWorkWithMeSection } from "@/components/sections/why-work-with-me";
import { experience } from "@/data/experience";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { getAllPosts } from "@/lib/content/blog";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ pathname: "/" });

const LATEST_POSTS = 3;

/**
 * Conversion homepage.
 *
 * Server Component only — sections receive data as props. Animations are CSS
 * (`reveal-on-load` / `reveal-on-scroll`) so the critical path stays light.
 * Footer lives in the marketing layout and is not duplicated here.
 */
export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, LATEST_POSTS);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services} />
      <SkillsSection />
      <ExperienceSection experience={experience} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <DevelopmentProcessSection />
      <TechStackSection />
      <WhyWorkWithMeSection />
      <LatestBlogPostsSection posts={posts} />
      <ContactCtaSection />
    </>
  );
}
