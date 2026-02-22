import { Header } from "@/components/layout/header/Header";

export default function Overview() {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white">
    
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">
        <h1 className="text-6xl font-bold tracking-tight leading-tight">
          Stack UI
        </h1>

        <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          A thoughtfully crafted UI component system built with structure,
          clarity, and scalability in mind. Designed as a playground for
          refining layout architecture and design consistency.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <a
            href="/docs/introduction"
            className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Explore Documentation
          </a>

          <a
            href="https://github.com/sunteang"
            target="_blank"
            className="px-8 py-4 border border-zinc-300 dark:border-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 dark:border-zinc-800 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16">

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Structured Layout System
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Built with a scalable layout architecture separating landing,
              documentation, and component preview environments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Reusable Component Patterns
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Designed to emphasize composability, consistent spacing, and
              predictable behavior across components.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              Dark Mode Ready
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Fully theme-aware layout structure supporting clean transitions
              and consistent UI contrast.
            </p>
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-semibold">
          Start exploring the system
        </h2>

        <div className="mt-8">
          <a
            href="/docs/introduction"
            className="px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-md text-sm font-medium hover:opacity-90 transition"
          >
            Go to Documentation
          </a>
        </div>
      </section>

    </div>
  );
}