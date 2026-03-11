import {
  siDotenv,
  siJsonwebtokens,
  siMysql,
  siNodedotjs,
  siOpenapiinitiative,
  siPostgresql,
  siRedis,
  siSqlite,
  siSwagger,
} from 'simple-icons'

function BrandIcon({ icon, className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}

function CustomIcon({ variant, className }) {
  if (variant === 'websocket') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4.5 12a7.5 7.5 0 0 1 15 0" />
        <path d="M7.5 12a4.5 4.5 0 0 1 9 0" />
        <path d="M10.5 12a1.5 1.5 0 0 1 3 0" />
        <path d="M12 19v-4.5" />
      </svg>
    )
  }

  if (variant === 'esm') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 6h14v12H5z" />
        <path d="M7 9h10" />
        <path d="M7 12h10" />
        <path d="M7 15h10" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  )
}

function Pill({ item }) {
  const base =
    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold'
  const colors = item.planned
    ? 'border-white/10 bg-white/5 text-zinc-400'
    : 'border-white/10 bg-zinc-950/60 text-zinc-200'

  return (
    <div className={`${base} ${colors}`}>
      <span className={item.planned ? 'opacity-70' : ''}>
        {item.kind === 'brand' ? (
          <BrandIcon icon={item.icon} className={`h-4 w-4 ${item.className || ''}`} />
        ) : (
          <CustomIcon variant={item.icon} className={`h-4 w-4 ${item.className || ''}`} />
        )}
      </span>
      <span className="whitespace-nowrap">{item.label}</span>
      {item.planned ? (
        <span className="ml-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
          Soon
        </span>
      ) : null}
    </div>
  )
}

const stackItems = [
  { kind: 'brand', icon: siNodedotjs, label: 'Node.js', className: 'text-emerald-300' },
  { kind: 'custom', icon: 'esm', label: 'ES Modules', className: 'text-zinc-200' },
  { kind: 'brand', icon: siMysql, label: 'MySQL', className: 'text-sky-300' },
  { kind: 'brand', icon: siSqlite, label: 'SQLite', className: 'text-zinc-200' },
  { kind: 'brand', icon: siRedis, label: 'Redis', className: 'text-rose-300' },
  { kind: 'brand', icon: siJsonwebtokens, label: 'JWT', className: 'text-amber-300' },
  { kind: 'custom', icon: 'websocket', label: 'WebSocket', className: 'text-violet-300' },
  { kind: 'brand', icon: siSwagger, label: 'Swagger', className: 'text-lime-300' },
  { kind: 'brand', icon: siOpenapiinitiative, label: 'OpenAPI', className: 'text-orange-300' },
  { kind: 'brand', icon: siDotenv, label: '.env', className: 'text-zinc-200' },
  { kind: 'brand', icon: siPostgresql, label: 'PostgreSQL', planned: true, className: 'text-sky-200' },
]

export function StackMarquee() {
  const lane = [...stackItems, ...stackItems]

  return (
    <section id="stack" className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
      <div
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-8"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 9%, black 91%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 9%, black 91%, transparent 100%)',
        }}
      >
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
          Tech Stack
        </p>
        <p className="mt-2 text-center text-sm leading-7 text-zinc-400">
          Some of the technologies used or supported by Backurus.
        </p>

        <div className="mt-8">
          <div className="backurus-marquee flex w-max gap-3 pr-3">
            {lane.map((item, index) => (
              <Pill key={`${item.label}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

