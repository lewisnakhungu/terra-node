"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency, formatNumber } from "@/lib/formatters";

export default function LandingPage() {
  const { projects, stats } = useTerraNode();
  const featured = projects.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="px-4 py-20 sm:py-28 border-b border-border">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-mono text-muted-foreground mb-4">
            AI compute &rarr; land restoration
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1]">
            Every GPU has a footprint.
            <br />
            <span className="text-primary">Fund the fix.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Calculate your data center&apos;s arable land debt, then offset it
            by funding verified restoration projects across Kenya.
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg" asChild>
              <Link href="/calculator">Calculate your debt</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                Browse projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: "Land restored", value: formatArea(stats.totalRestoredSqM) },
            { label: "Backers", value: formatNumber(stats.totalBackers) },
            { label: "Credits issued", value: formatNumber(stats.totalCredits) },
            { label: "Total funded", value: formatCurrency(stats.totalFunded) },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-2xl font-semibold font-[family-name:var(--font-space)]">
                {value}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 border-t border-border">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured projects</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-t border-border scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6">About TerraNode</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              AI data centers consume massive amounts of land, water, and energy.
              TerraNode quantifies this &ldquo;arable land debt&rdquo; and connects
              companies to verified restoration projects that offset it.
            </p>
            <p>
              We work with local communities across Kenya to fund reforestation,
              wetland rehabilitation, and agroforestry initiatives &mdash; tracked
              with D-MRV (digital Measurement, Reporting, and Verification) scoring.
            </p>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Whether you&apos;re an enterprise buying corporate credits or an
              individual micro-funding a project, every contribution translates
              directly to square meters of restored land.
            </p>
            <p>
              TerraNode is a hackathon prototype exploring the intersection of
              AI infrastructure growth and ecological restoration. All payments
              shown are simulated.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 border-t border-border scroll-mt-16">
        <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Interested in partnering, investing, or learning more about
              TerraNode? We&apos;d love to hear from you.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:hello@terranode.earth" className="hover:text-foreground transition-colors">
                  hello@terranode.earth
                </a>
              </div>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
          <div className="rounded-lg border border-border p-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium">Name</label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium">Email</label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm font-medium">Message</label>
              <textarea
                id="contact-message"
                rows={3}
                placeholder="Tell us what you're working on..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <Button className="w-full">Send message</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
