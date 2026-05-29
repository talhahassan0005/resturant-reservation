"use client";
import type { ReactNode } from "react";

const STATS = [
  { val: "500+", label: "Restaurants" },
  { val: "50K+", label: "Happy Diners" },
  { val: "4.9★", label: "Avg Rating" },
  { val: "3 Cities", label: "Covered" },
];

export default function HeroSection({ children }: { children?: ReactNode }) {
  return (
    <section className="rrs-hero">
      {/* Background image */}
      <div className="rrs-hero-bg" />
      {/* Overlay layers */}
      <div className="rrs-hero-overlay" />
      <div className="rrs-hero-overlay2" />

      <div className="rrs-hero-inner">
        {/* Badge */}
        <div className="rrs-hero-badge">
          <span className="rrs-hero-badge-dot" />
          Pakistan&apos;s #1 Restaurant Booking Platform
        </div>

        <h1 className="rrs-hero-title">
          Find &amp; Book the<br />
          <span className="rrs-hero-title-accent">Perfect Table</span>
        </h1>

        <p className="rrs-hero-sub">
          Discover top-rated restaurants in Lahore, Karachi &amp; Islamabad —<br className="rrs-hero-br" />
          instant confirmation, free cancellation, zero booking fees.
        </p>

        {/* Search bar */}
        <div className="rrs-hero-search-wrap">
          {children}
        </div>

        {/* Trust stats */}
        <div className="rrs-hero-stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="rrs-hero-stat">
              <span className="rrs-hero-stat-val">{s.val}</span>
              <span className="rrs-hero-stat-label">{s.label}</span>
              {i < STATS.length - 1 && <div className="rrs-hero-stat-divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
