type Project = {
  title: string
  description: string
  tags: string[]
  link: string
}

const projects: Project[] = [
  {
    title: 'Orbit',
    description:
      'A keyboard-first task manager for teams that keeps everyone in flow.',
    tags: ['React', 'TypeScript', 'Design'],
    link: '#',
  },
  {
    title: 'Lumen',
    description:
      'An open-source component library focused on accessibility and theming.',
    tags: ['Design Systems', 'A11y'],
    link: '#',
  },
  {
    title: 'Trailhead',
    description:
      'A personalized learning platform that adapts to how you study best.',
    tags: ['Node.js', 'Vite'],
    link: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section__title">Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <a key={project.title} className="card" href={project.link}>
            <h3 className="card__title">{project.title}</h3>
            <p className="card__body">{project.description}</p>
            <div className="card__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
