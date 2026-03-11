import { SectionHeader } from './SectionHeader.jsx'
import { Link } from "react-router-dom"

export function Documentation() {
  return (
    <section id="documentation" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="rounded-[2rem] border border-emerald-400/20 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.04))] p-8 sm:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeader
            eyebrow="Documentation"
            title="Documentation that supports real development work"
            description="Backurus includes full documentation for onboarding, day-to-day implementation, and team reference. The docs are designed to help developers move from setup to shipping without losing momentum."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {['Multi-language docs', 'Code examples', 'CLI commands', 'API guides'].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-zinc-950/60 p-5 text-sm text-zinc-300"
              >
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-2 leading-7 text-zinc-400">
                  Clear reference material for common framework tasks and deeper implementation details.
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/docs"
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
          >
            Open Docs
          </Link>
        </div>
      </div>
    </section>
  )
}
