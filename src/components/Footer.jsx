export function Footer({ logo }) {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_auto] lg:px-8">
        <div className="flex items-start gap-4">
          <img
            src={logo}
            alt="Backurus logo"
            className="h-12 w-12 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-1.5"
          />
          <div>
            <p className="text-lg font-semibold text-white">Backurus</p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-400">
              Backurus — A Laravel-inspired backend framework for Node.js.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a
            href="https://github.com/Virgarakha/backurus"
            className="transition hover:text-emerald-300"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="/docs" className="transition hover:text-emerald-300">
            Documentation
          </a>
        </div>
      </div>
    </footer>
  )
}
