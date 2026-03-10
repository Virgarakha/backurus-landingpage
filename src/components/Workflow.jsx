import { SectionHeader } from './SectionHeader.jsx'

export function Workflow({ steps }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow="Workflow"
        title="A clean build loop for API teams"
        description="From scaffolding to migration to local serving, the framework encourages a repeatable workflow that keeps teams aligned."
        align="center"
      />

      <div className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="relative rounded-3xl border border-white/10 bg-zinc-950/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-sm font-semibold text-emerald-200">
                {index + 1}
              </div>
              <p className="mt-4 text-base font-semibold text-white">{step}</p>
              {index < steps.length - 1 ? (
                <div className="mt-4 hidden h-px w-full bg-gradient-to-r from-emerald-400/30 to-transparent lg:block" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
