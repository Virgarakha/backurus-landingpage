import { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'

function normalizeLanguage(language) {
  if (language === 'env') return 'bash'
  if (language === 'text') return 'markup'
  return language
}

export function DocsCodeBlock({ title, code, language = 'javascript', theme = 'dark' }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const prismLanguage = normalizeLanguage(language)

  useEffect(() => {
    Prism.highlightElement(codeRef.current)
  }, [code, prismLanguage, theme])

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
    <div className={`overflow-hidden rounded-3xl border shadow-[0_24px_80px_rgba(0,0,0,0.12)] ${theme === 'dark' ? 'border-white/10 bg-zinc-950/90' : 'border-zinc-200 bg-white'}`}>
      <div className={`flex items-center justify-between border-b px-5 py-4 ${theme === 'dark' ? 'border-white/10' : 'border-zinc-200'}`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-300/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>{title}</p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${theme === 'dark' ? 'border-white/10 bg-white/5 text-zinc-200 hover:border-emerald-400/30 hover:bg-emerald-400/10' : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50'}`}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="px-5 py-5">
        <pre className={`overflow-x-auto rounded-2xl p-4 text-sm leading-7 ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
          <code ref={codeRef} className={`language-${prismLanguage}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
