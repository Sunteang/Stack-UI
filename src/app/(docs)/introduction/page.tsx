import { IntroductionLayout } from "@/app/(docs)/introduction/Layout";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <IntroductionLayout>
      <div className="max-w-6xl mx-auto px-6 py-20 bg-background text-foreground">

        {/* Hero Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              Introduction
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
              A collection of thoughtfully crafted UI components that I design
              and build. This space showcases my approach to layout structure,
              component architecture, styling consistency, and interaction design.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <Link
              href="/components/input"
              className="px-6 py-3 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition"
            >
              Explore Components
            </Link>

            <Link
              href="/previews"
              className="px-6 py-3 border border-border rounded-md text-sm font-medium hover:bg-muted transition"
            >
              View Previews
            </Link>

            <Link
              href="https://github.com/sunteang"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition text-sm"
            >
              GitHub →
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="my-24 border-t border-border" />

        {/* Philosophy Section */}
        <section className="grid md:grid-cols-2 gap-16">

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Why I Built This
            </h2>

            <p className="text-muted-foreground leading-relaxed">
              I created Stack UI as a personal design system playground —
              a place to experiment, refine, and document the way I build user
              interfaces. Every component reflects my focus on structure,
              reusability, and clean visual hierarchy.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Instead of just writing code, I focus on crafting consistent
              spacing, scalable architecture, and intuitive interaction patterns.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              What You’ll Find Here
            </h2>

            <ul className="space-y-4 text-muted-foreground">
              <li>• Fully structured layout components</li>
              <li>• Form elements with real-world patterns</li>
              <li>• Clean and reusable design tokens</li>
              <li>• Component previews with usage examples</li>
              <li>• My evolving UI thinking and experiments</li>
            </ul>
          </div>

        </section>

        <div className="h-24" />
      </div>
    </IntroductionLayout>
  );
}