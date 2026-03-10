import { CodeBlock } from './CodeBlock.jsx'
import { SectionHeader } from './SectionHeader.jsx'

export function CodeExample({ routeExample, controllerExample }) {
  return (
    <section id="code-example" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeader
        eyebrow="Code Example"
        title="Readability that feels familiar from the first route"
        description="Backurus keeps API code concise. Routes stay expressive, controllers stay focused, and database calls remain straightforward."
        align="center"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CodeBlock
          title="Route definition"
          eyebrow="routes/api.js"
          code={routeExample}
          mode="code"
          language="javascript"
        />
        <CodeBlock
          title="Controller action"
          eyebrow="app/controllers/UserController.js"
          code={controllerExample}
          mode="code"
          language="javascript"
        />
      </div>
    </section>
  )
}
