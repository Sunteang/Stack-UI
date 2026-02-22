import { DevelopmentLayout } from "@/app/(docs)/development/Layout";

export default function DevelopmentPage() {
  return (
    <DevelopmentLayout>
      <div className="max-w-6xl mx-auto px-6 py-20 bg-background text-foreground">
        <h1 className="text-4xl font-bold mb-6">Development</h1>

          <p className="text-lg text-muted-foreground mb-10">
            This page explains how this component showcase website was built,
            including the technologies used and architectural decisions.
          </p>

          {/* Project Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website is a personal component showcase built to document,
              preview, and reference reusable UI components. It is not a
              downloadable component library but a structured reference system
              for internal development and portfolio demonstration.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Next.js (App Router)</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Component-driven architecture</li>
              <li>• File-based routing</li>
            </ul>
          </section>

          {/* Architecture */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Architecture</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The application uses section-based layouts. All documentation pages
              share a common layout that includes a sidebar and content container.
            </p>

            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
              {`app/
                (docs)/
                  layout.tsx
                  development/
                  introduction/
              components/
                docs/
              lib/
                sidebar/`}
            </pre>
          </section>

          {/* Design Philosophy */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Design Philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              The focus of this project is clarity, scalability, and clean
              separation of concerns. Layout controls structure, sidebar is
              data-driven, and pages remain content-focused.
            </p>
          </section>
        <div className="h-24" />
      </div>
    </DevelopmentLayout>
  );
}