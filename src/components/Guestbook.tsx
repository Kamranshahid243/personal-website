import { useState } from 'react'

type Entry = {
  id: number
  name: string
  message: string
}

const initialEntries: Entry[] = [
  { id: 1, name: 'Sam', message: 'Love the clean design — great work!' },
  { id: 2, name: 'Priya', message: 'Bookmarking this for inspiration.' },
]

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>(initialEntries)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const canSubmit = name.trim().length > 0 && message.trim().length > 0

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return
    setEntries((prev) => [
      { id: Date.now(), name: name.trim(), message: message.trim() },
      ...prev,
    ])
    setName('')
    setMessage('')
  }

  return (
    <section id="guestbook" className="section">
      <h2 className="section__title">Guestbook</h2>
      <p className="section__body">
        Passing through? Leave a note — I&apos;d love to hear from you.
      </p>

      <form className="guestbook__form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="input input--textarea"
          placeholder="Your message"
          aria-label="Your message"
          value={message}
          rows={3}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn--primary" type="submit" disabled={!canSubmit}>
          Sign guestbook
        </button>
      </form>

      <ul className="guestbook__list">
        {entries.map((entry) => (
          <li key={entry.id} className="guestbook__entry">
            <p className="guestbook__message">“{entry.message}”</p>
            <p className="guestbook__author">— {entry.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
