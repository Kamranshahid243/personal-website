export function Hero() {
  return (
    <section className="hero">
      <p className="hero__eyebrow">Software Engineer · Builder</p>
      <h1 className="hero__title">
        Hi, I&apos;m <span className="hero__name">Alex Rivera</span>.
      </h1>
      <p className="hero__lede">
        I design and build delightful web experiences. I care about clean
        interfaces, fast tools, and shipping things people love to use.
      </p>
      <div className="hero__cta">
        <a className="btn btn--primary" href="#projects">
          View my work
        </a>
        <a className="btn btn--ghost" href="#guestbook">
          Say hello
        </a>
      </div>
    </section>
  )
}
