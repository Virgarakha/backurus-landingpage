import { CodeBlock } from './CodeBlock.jsx'
import { SectionHeader } from './SectionHeader.jsx'

export function CLIExample({ command }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <CodeBlock
            title="CLI workflow"
            eyebrow="Scaffold, migrate, inspect"
            code={command}
            mode="terminal"
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow="CLI Example"
            title="Use the CLI as your development cockpit"
            description="Backurus centers the daily workflow around node urus. Generate files, inspect routes, run migrations, and keep the framework moving with a single consistent command surface."
          />
        </div>
      </div>
    </section>
  )
}
