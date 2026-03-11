import { Link } from "react-router-dom";

export function Hero({ logo }) {
  return (
    <section id="top" className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-24">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-white/5 px-4 py-2 text-sm text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Laravel-inspired ergonomics for modern Node.js APIs
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Backurus
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-medium tracking-tight text-zinc-200">
            A Modern Backend Framework for Node.js inspired by Laravel.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Backurus helps developers build APIs quickly with expressive routing,
            built-in ORM, migrations, validation, and a powerful CLI.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#installation"
              className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
            >
              Get Started
            </a>
            <Link
              to="/docs"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/30 hover:bg-emerald-400/10"
            >
              View Documentation
            </Link>
          </div>

          <div className="mt-12 grid gap-4 text-sm text-zinc-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">8+</p>
              <p className="mt-1">core developer features in the box</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">ESM</p>
              <p className="mt-1">modern JavaScript runtime conventions</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-2xl font-semibold text-white">API-first</p>
              <p className="mt-1">structured for growing backend teams</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.28),_transparent_55%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute -right-20 top-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -left-16 bottom-8 h-32 w-32 rounded-full bg-lime-300/10 blur-3xl" />

            <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
              <div className="rounded-[2rem] border border-emerald-400/30 bg-emerald-400/10 p-6 shadow-[0_0_80px_rgba(74,222,128,0.12)]">
                <img
                  src={logo}
                  alt="Backurus dinosaur mascot"
                  className="h-44 w-44 object-contain drop-shadow-[0_18px_42px_rgba(74,222,128,0.28)] sm:h-56 sm:w-56"
                />
              </div>

              <div className="mt-8 grid w-full gap-3 text-left text-sm text-zinc-300">
                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                  <p className="font-semibold text-white">Built for fast API delivery</p>
                  <p className="mt-1 text-zinc-400">
                    Routing, ORM, validation, auth, queues, and docs-ready workflows.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                  <p className="font-semibold text-white">Familiar Laravel patterns</p>
                  <p className="mt-1 text-zinc-400">
                    Comfortable conventions for teams moving between PHP and Node.js.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
