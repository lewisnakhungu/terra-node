import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-semibold font-[family-name:var(--font-space)]">
              <Leaf className="h-5 w-5 text-primary" />
              TerraNode
            </div>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Hackathon prototype — simulated payments only. Tokenizing land restoration to offset AI compute footprint.
            </p>
          </div>
          <div className="flex gap-12 text-sm">
            <div className="space-y-2">
              <p className="font-medium">Platform</p>
              <Link href="/calculator" className="block text-muted-foreground hover:text-primary">Calculator</Link>
              <Link href="/corporate" className="block text-muted-foreground hover:text-primary">Corporate</Link>
              <Link href="/projects" className="block text-muted-foreground hover:text-primary">Projects</Link>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Legal</p>
              <p className="text-muted-foreground">Demo only — no real funds</p>
              <p className="text-muted-foreground">© 2026 TerraNode</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
