import { useEffect, useMemo, useState } from 'react'
import logo from './assets/img/favicon.png'
import { docsSections, repoHighlights } from './docsData.js'
import { Navbar } from './components/Navbar.jsx'
import { Hero } from './components/Hero.jsx'
import { StackMarquee } from './components/StackMarquee.jsx'
import { Installation } from './components/Installation.jsx'
import { Features } from './components/Features.jsx'
import { CLIExample } from './components/CLIExample.jsx'
import { CodeExample } from './components/CodeExample.jsx'
import { Workflow } from './components/Workflow.jsx'
import { Documentation } from './components/Documentation.jsx'
import { Footer } from './components/Footer.jsx'
import { DocsCodeBlock } from './components/DocsCodeBlock.jsx'
import { Routes, Route } from "react-router-dom"

const installationCommand = `npx create-backurus-app my-api
cd my-api
node urus serve`

const cliCommand = `node urus make:model User
node urus make:controller UserController
node urus migrate
node urus route:list`

const routeExample = `Route.get('/users', 'UserController@index')`

const controllerExample = `import User from '../models/User'

export default class UserController {
  async index(req, res) {
    const users = await User.all()
    return res.success(users)
  }
}`

const features = [
  {
    icon: 'terminal',
    title: 'Laravel-like CLI',
    description:
      'Scaffold models, controllers, migrations, middleware, and more with the familiar node urus workflow.',
  },
  {
    icon: 'routes',
    title: 'Expressive Routing',
    description:
      'Define routes with controller actions that stay readable as APIs grow from prototype to production.',
  },
  {
    icon: 'database',
    title: 'Built-in ORM',
    description:
      'Query with an Eloquent-style API, relationships, pagination, and a compact model layer out of the box.',
  },
  {
    icon: 'layers',
    title: 'Migration System',
    description:
      'Manage schema changes with Laravel-inspired migrations, seeders, and clear database lifecycle commands.',
  },
  {
    icon: 'shield',
    title: 'Request Validation',
    description:
      'Keep request rules close to your business logic with dedicated validation classes and structured responses.',
  },
  {
    icon: 'lock',
    title: 'JWT Authentication',
    description:
      'Protect APIs with token-based authentication that fits modern frontend and mobile application flows.',
  },
  {
    icon: 'stack',
    title: 'Middleware Support',
    description:
      'Compose request pipelines with middleware aliases for auth, access control, and reusable concerns.',
  },
  {
    icon: 'spark',
    title: 'Hot Reload Dev Server',
    description:
      'Move fast with file watching, automatic restarts, and a smooth local development experience.',
  },
]

const workflowSteps = [
  'Create model',
  'Create controller',
  'Create migration',
  'Run migrate',
  'Start server',
]

function matchesSection(section, query) {
  if (!query) return true
  const haystack = [
    section.title,
    section.summary,
    ...(section.content || []),
    ...(section.bullets || []),
    ...(section.keywords || []),
    ...(section.sourceFiles || []),
  ]
    .join(' ')
    .toLowerCase()

  return haystack.includes(query)
}

function Section({ section, theme }) {
  const panelClass =
    theme === 'dark'
      ? 'border-white/10 bg-white/5 text-zinc-200'
      : 'border-zinc-200 bg-white text-zinc-700'

  const badgeClass =
    theme === 'dark'
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  const subtleClass = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-zinc-950'

  return (
    <section id={section.id} className={`scroll-mt-28 rounded-[2rem] border p-8 sm:p-10 ${panelClass}`}>
      <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${badgeClass}`}>
        {section.eyebrow}
      </div>
      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${titleClass}`}>
            {section.title}
          </h2>
          <p className={`mt-4 text-base leading-8 ${subtleClass}`}>{section.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {section.sourceFiles.map((file) => (
            <span
              key={file}
              className={`rounded-full border px-3 py-1 text-xs ${theme === 'dark' ? 'border-white/10 bg-zinc-950/80 text-zinc-300' : 'border-zinc-200 bg-zinc-50 text-zinc-600'}`}
            >
              {file}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="space-y-4">
            {section.content.map((paragraph) => (
              <p key={paragraph} className={`text-sm leading-7 sm:text-[15px] ${subtleClass}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {section.bullets.length ? (
            <div className="mt-6 grid gap-3">
              {section.bullets.map((bullet) => (
                <div
                  key={bullet}
                  className={`rounded-2xl border px-4 py-3 text-sm leading-7 ${theme === 'dark' ? 'border-white/10 bg-zinc-950/70 text-zinc-300' : 'border-zinc-200 bg-zinc-50 text-zinc-700'}`}
                >
                  {bullet}
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          {section.codeExamples.map((example) => (
            <div key={`${section.id}-${example.title}`} className="space-y-2">
              <DocsCodeBlock
                title={example.title}
                code={example.code}
                language={example.language}
                theme={theme}
              />
              {example.note ? (
                <p className={`text-xs leading-6 ${subtleClass}`}>{example.note}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingPage() {
  useEffect(() => {
    document.documentElement.dataset.theme = 'dark'
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_30%),linear-gradient(180deg,_#06110c_0%,_#08130f_35%,_#030806_100%)] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[linear-gradient(180deg,rgba(74,222,128,0.12),transparent)]" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      <Navbar logo={logo} />

      <main>
        <Hero logo={logo} />
        <StackMarquee />
        <Installation command={installationCommand} />
        <Features items={features} />
        <CLIExample command={cliCommand} />
        <CodeExample routeExample={routeExample} controllerExample={controllerExample} />
        <Workflow steps={workflowSteps} />
        <Documentation />
      </main>

      <Footer logo={logo} />
    </div>
  )
}

function DocumentationPage() {
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredSections = useMemo(
    () => docsSections.filter((section) => matchesSection(section, normalizedQuery)),
    [normalizedQuery],
  )

  const shellClass =
    theme === 'dark'
      ? 'bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,_#04100b_0%,_#06110d_35%,_#020504_100%)] text-zinc-100'
      : 'bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_24%),linear-gradient(180deg,_#f4fbf6_0%,_#eef7f1_38%,_#f8fafc_100%)] text-zinc-900'

  const cardClass =
    theme === 'dark'
      ? 'border-white/10 bg-white/5'
      : 'border-zinc-200 bg-white/90'

  const subtleClass = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-zinc-950'
  const inputClass =
    theme === 'dark'
      ? 'w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500'
      : 'w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400'

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${theme === 'dark' ? 'bg-emerald-400/10' : 'bg-emerald-300/30'}`} />
      </div>

      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${theme === 'dark' ? 'border-white/10 bg-[#07110d]/80' : 'border-zinc-200 bg-white/85'}`}>
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className={`rounded-3xl border p-2 transition ${theme === 'dark' ? 'border-emerald-400/20 bg-emerald-400/10 hover:border-emerald-400/40' : 'border-emerald-200 bg-emerald-50 hover:border-emerald-300'}`}
            >
              <img src={logo} alt="Backurus logo" className="h-11 w-11 object-contain" />
            </a>
            <div>
              <p className={`text-lg font-semibold tracking-tight ${titleClass}`}>Backurus Docs</p>
              <p className={`text-sm ${subtleClass}`}>
                Repository-derived documentation for the Laravel-inspired Node.js framework
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label
              className={`flex min-w-0 items-center gap-3 rounded-full border px-4 py-3 sm:min-w-[320px] ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-zinc-200 bg-white'}`}
            >
              <svg viewBox="0 0 24 24" className={`h-4 w-4 ${subtleClass}`} fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections, features, files, or commands"
                className={inputClass}
              />
            </label>

            <button
              type="button"
              onClick={() => setTheme((value) => (value === 'dark' ? 'light' : 'dark'))}
              className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${theme === 'dark' ? 'border-white/10 bg-white/5 text-white hover:border-emerald-400/30' : 'border-zinc-200 bg-white text-zinc-900 hover:border-emerald-300'}`}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>

            <a
              href="https://github.com/Virgarakha/backurus"
              target="_blank"
              rel="noreferrer"
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${theme === 'dark' ? 'bg-emerald-400 text-emerald-950 hover:bg-emerald-300' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
            >
              Open Repository
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)] lg:overflow-auto">
          <div className={`rounded-[2rem] border p-5 ${cardClass}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'}`}>
              Navigation
            </p>
            <div className="mt-4 space-y-2">
              {filteredSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block rounded-2xl px-3 py-2 text-sm transition ${theme === 'dark' ? 'text-zinc-300 hover:bg-zinc-950/80 hover:text-white' : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950'}`}
                >
                  {section.title}
                </a>
              ))}
              {!filteredSections.length ? (
                <p className={`rounded-2xl px-3 py-2 text-sm ${subtleClass}`}>No sections match that search.</p>
              ) : null}
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <section className={`rounded-[2rem] border p-8 sm:p-10 ${cardClass}`}>
            <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div>
                <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${theme === 'dark' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                  Source Of Truth
                </div>
                <h1 className={`mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl ${titleClass}`}>
                  Professional framework documentation generated from the real Backurus repository
                </h1>
                <p className={`mt-5 max-w-3xl text-base leading-8 sm:text-lg ${subtleClass}`}>
                  This site is based on the public repository structure, README, and framework source code from{' '}
                  <span className={`rounded-full px-2 py-1 text-sm ${theme === 'dark' ? 'bg-zinc-950/80 text-zinc-200' : 'bg-zinc-100 text-zinc-900'}`}>
                    Virgarakha/backurus
                  </span>
                  . The sections below reflect the current CLI, router, ORM, migrations, config system, queue runtime, scheduler, plugins, and example application files implemented in the repository.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {repoHighlights.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-3xl border p-5 ${theme === 'dark' ? 'border-white/10 bg-zinc-950/70' : 'border-zinc-200 bg-zinc-50'}`}
                  >
                    <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${theme === 'dark' ? 'text-emerald-200' : 'text-emerald-700'}`}>
                      {item.label}
                    </p>
                    <p className={`mt-3 text-lg font-semibold ${titleClass}`}>{item.value}</p>
                    <p className={`mt-2 text-sm leading-7 ${subtleClass}`}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 space-y-8">
            {filteredSections.map((section) => (
              <Section key={section.id} section={section} theme={theme} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/docs" element={<DocumentationPage />} />
    </Routes>
  )
}
export default App
