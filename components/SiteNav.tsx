"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Workflow Planner" },
  { href: "/dashboard", label: "Saved drafts" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
          FastProcure AI
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-cyan-300">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/planner" className="rounded-lg bg-cyan-400 px-3 py-1.5 text-sm font-medium text-slate-950" onClick={() => setOpen(false)}>
            Plan
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white"
            aria-expanded={open}
            aria-controls="fastprocure-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="fastprocure-mobile-nav"
          className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-white/10 px-4 sm:px-6 py-3 sm:py-4 md:hidden"
          aria-label="Mobile"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-xl px-3 py-3 text-slate-200 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
