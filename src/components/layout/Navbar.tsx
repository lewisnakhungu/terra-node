"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/calculator", label: "Calculator" },
  { href: "/corporate", label: "Corporate" },
  { href: "/projects", label: "Projects" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold font-[family-name:var(--font-space)]">
          <Leaf className="h-6 w-6 text-primary" />
          <span>TerraNode</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                pathname === l.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/projects">Fund Restoration</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/calculator">Calculate Debt</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
