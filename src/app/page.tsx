"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, Leaf, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/shared/StatCard";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useTerraNode } from "@/context/TerraNodeContext";
import { formatArea, formatCurrency, formatNumber } from "@/lib/formatters";

export default function LandingPage() {
  const { projects, stats } = useTerraNode();
  const featured = projects.slice(0, 3);

  const tickerItems = [
    `${formatArea(stats.totalRestoredSqM)} restored`,
    `${formatNumber(stats.totalBackers)} backers`,
    `${formatNumber(stats.totalCredits)} credits issued`,
    `${formatCurrency(stats.totalFunded)} funded`,
    `${stats.activeProjects} active projects`,
  ];

  return (
    <div>
      <section className="gradient-hero relative overflow-hidden px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl font-[family-name:var(--font-space)]"
          >
            Every GPU Has a Footprint.
            <span className="block text-primary mt-2">Restore It.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            TerraNode bridges AI infrastructure growth and land restoration — calculate your arable land debt,
            purchase verified credits, or crowdfund local projects across Kenya.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/calculator">
                <Calculator className="h-5 w-5" />
                Calculate Your Debt
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                Fund Restoration
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-card/30 py-3">
        <div className="ticker flex whitespace-nowrap gap-12">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-sm font-mono text-muted-foreground flex items-center gap-2">
              <Leaf className="h-3 w-3 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Land Restored"
            value={<AnimatedCounter value={stats.totalRestoredSqM} format={formatArea} />}
            icon={Leaf}
          />
          <StatCard
            label="Total Backers"
            value={<AnimatedCounter value={stats.totalBackers} />}
            icon={Shield}
          />
          <StatCard
            label="Credits Issued"
            value={<AnimatedCounter value={stats.totalCredits} />}
            icon={Zap}
          />
          <StatCard
            label="Total Funded"
            value={<AnimatedCounter value={stats.totalFunded} format={formatCurrency} />}
            icon={Calculator}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-space)]">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { step: "01", title: "Calculate", desc: "Quantify your AI cluster's arable land and water debt.", icon: Calculator },
            { step: "02", title: "Fund", desc: "Purchase corporate credits or micro-fund community projects.", icon: Leaf },
            { step: "03", title: "Verify", desc: "Track D-MRV scores and restoration outcomes on-chain ready data.", icon: Shield },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="glass rounded-xl p-6 text-center">
              <span className="text-xs font-mono text-primary">{step}</span>
              <Icon className="h-10 w-10 text-primary mx-auto my-4" />
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-space)]">Featured Projects</h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
