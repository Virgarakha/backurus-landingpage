export function Navbar({ logo }) {
  const links = [
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub', href: 'https://github.com/Virgarakha/backurus' },
    { label: 'Install', href: '#installation' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07110d]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Backurus logo"
            className="h-10 w-10 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-1"
          />
          <span className="text-lg font-semibold tracking-tight text-white">Backurus</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-emerald-300"
              target={link.label === 'GitHub' ? '_blank' : undefined}
              rel={link.label === 'GitHub' ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#installation"
          className="rounded-full border border-emerald-400/30 bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          Get Started
        </a>
      </nav>
    </header>
  )
}
