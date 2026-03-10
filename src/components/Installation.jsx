import { CodeBlock } from './CodeBlock.jsx'
import { SectionHeader } from './SectionHeader.jsx'

export function Installation({ command }) {
  return (
    <section id="installation" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="Installation"
          title="Ship your first Backurus API in minutes"
          description="Backurus keeps the getting-started path short: create a project, step into it, and boot the development server with the same CLI you will use every day."
        />

        <CodeBlock
          title="Bootstrap a new API"
          eyebrow="Backurus quickstart"
          code={command}
          mode="terminal"
        />
      </div>
    </section>
  )
}
