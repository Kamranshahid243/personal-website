export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="mailto:hello@example.com">Email</a>
      </div>
      <p className="footer__note">
        © {new Date().getFullYear()} Alex Rivera. Built with React &amp; Vite.
      </p>
    </footer>
  )
}
