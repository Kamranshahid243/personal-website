import { useState } from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Guestbook } from './components/Guestbook'
import { Footer } from './components/Footer'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className={`app app--${theme}`}>
      <header className="nav">
        <a className="nav__brand" href="#top">
          <span className="nav__logo">AR</span>
          <span>Alex Rivera</span>
        </a>
        <nav className="nav__links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#guestbook">Guestbook</a>
          <button
            className="nav__theme"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          >
            {theme === 'dark' ? '☀︎' : '☾'}
          </button>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <About />
        <Projects />
        <Guestbook />
      </main>

      <Footer />
    </div>
  )
}

export default App
