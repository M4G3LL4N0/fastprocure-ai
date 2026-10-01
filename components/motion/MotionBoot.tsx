"use client";

import { useEffect } from "react";

/**
 * Portfolio-wide scroll reveal + page-ready motion boot.
 * Observes [data-reveal] and [data-stagger]; respects prefers-reduced-motion.
 */
export function MotionBoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("premium-motion-ready");

    const onScroll = () => {
      document.documentElement.classList.toggle("motion-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduced) {
      document.querySelectorAll("[data-reveal], [data-stagger]").forEach((el) => {
        el.classList.add("is-visible");
      });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-80px 0px", threshold: 0.08 },
    );

    document.querySelectorAll("[data-reveal], [data-stagger]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div className="motion-ambient" aria-hidden="true" />
  );
}
