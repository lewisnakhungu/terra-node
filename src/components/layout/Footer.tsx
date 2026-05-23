import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium text-foreground font-[family-name:var(--font-space)]">
              TerraNode
            </span>
            <span className="mx-2">&middot;</span>
            Hackathon prototype &mdash; simulated payments only
          </div>
          <div className="flex gap-4">
            <Link href="/calculator" className="hover:text-foreground transition-colors">
              Calculator
            </Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="/corporate" className="hover:text-foreground transition-colors">
              Corporate
            </Link>
            <Link href="/#about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
