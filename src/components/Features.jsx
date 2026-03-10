import { SectionHeader } from './SectionHeader.jsx'

function Icon({ kind }) {
  const common = 'h-5 w-5 text-emerald-300'

  if (kind === 'terminal') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 6h16v12H4z" />
        <path d="m8 10 2 2-2 2" />
        <path d="M12.5 15H16" />
      </svg>
    )
  }

  if (kind === 'routes') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M5 7h6" />
        <path d="M13 7h6" />
        <path d="M7 7v10" />
        <path d="M17 7v4" />
        <path d="M7 17h10" />
      </svg>
    )
  }

  if (kind === 'database') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    )
  }

  if (kind === 'layers') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </svg>
    )
  }

  if (kind === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 3 5 6v5c0 5 3.4 8.9 7 10 3.6-1.1 7-5 7-10V6l-7-3Z" />
        <path d="m9.5 12 1.7 1.7 3.3-3.7" />
      </svg>
    )
  }

  if (kind === 'lock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" />
      </svg>
    )
  }

  if (kind === 'stack') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="m12 5 7 4-7 4-7-4 7-4Z" />
        <path d="m5 13 7 4 7-4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
      <path d="m12 3 2.5 5 5.5.8-4 4 .9 5.7-4.9-2.6-4.9 2.6.9-5.7-4-4 5.5-.8L12 3Z" />
    </svg>
  )
}

export function Features({ items }) {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need to build structured Node.js backends"
        description="The framework is designed around the pieces backend teams reach for constantly: clean routing, data modeling, database evolution, validation, auth, and developer tooling."
        align="center"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.title}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/[0.07]"
          >
            <div className="inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3">
              <Icon kind={item.icon} />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
