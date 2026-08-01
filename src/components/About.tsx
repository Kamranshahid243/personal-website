const skills = [
  'TypeScript',
  'React',
  'Node.js',
  'Vite',
  'Design Systems',
  'Accessibility',
]

export function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__title">About</h2>
      <p className="section__body">
        I&apos;m a full-stack engineer who loves turning ideas into polished
        products. Over the years I&apos;ve built everything from developer tools
        to consumer apps, always with an eye for craft and detail.
      </p>
      <ul className="skills">
        {skills.map((skill) => (
          <li key={skill} className="skills__item">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}
