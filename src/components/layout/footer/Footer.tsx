import Link from "next/link";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-semibold text-lg mb-3">
              Stack UI
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A personal component showcase built with
              Next.js and Tailwind CSS.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-3">Documentation</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/introduction" className="hover:text-foreground transition-colors">
                  Introduction
                </Link>
              </li>
              <li>
                <Link href="/development" className="hover:text-foreground transition-colors">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/components" className="hover:text-foreground transition-colors">
                  Components
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-3">Project</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Version 1.0.0</li>
              <li>Built with Next.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <span>
            © {year} Stack UI. All rights reserved.
          </span>
          <span>
            Designed & built by SEREY Sunteang.
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;