import { useState } from 'react'

function highlightCode(code) {
  return code
    .split('\n')
    .map((line) => {
      const html = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(
          /\b(import|export|default|class|async|await|return|const)\b/g,
          '<span class="text-emerald-300">$1</span>',
        )
        .replace(
          /(\bRoute\b|\bUserController\b|\bUser\b|\breq\b|\bres\b)/g,
          '<span class="text-sky-300">$1</span>',
        )
        .replace(/('.*?')/g, '<span class="text-amber-300">$1</span>')
        .replace(/\b(success|all)\b/g, '<span class="text-violet-300">$1</span>')

      return { html }
    })
}

export function CodeBlock({
  title,
  eyebrow,
  code,
  mode = 'terminal',
  language = 'bash',
}) {
  const [copied, setCopied] = useState(false)
  const lines = highlightCode(code)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="text-xs text-zinc-400">{eyebrow}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-emerald-400/40 hover:bg-emerald-400/10"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="px-5 py-5">
        <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
          {mode === 'terminal' ? 'Terminal' : language}
        </div>
        <pre className="overflow-x-auto text-sm leading-7 text-zinc-200">
          <code>
            {lines.map((line, index) => (
              <div key={`${title}-${index}`} className="flex">
                <span className="mr-4 select-none text-zinc-600">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="min-w-0 flex-1"
                  dangerouslySetInnerHTML={{
                    __html:
                      mode === 'terminal'
                        ? `<span class="text-emerald-300">$</span> ${line.html}`
                        : line.html || '&nbsp;',
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
