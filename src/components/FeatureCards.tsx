"use client";

const features = [
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "Instant Confirmation",
    desc: "Confirmed the moment you book — no waiting, no calls.",
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    color: "#003580",
    bg: "#eff6ff",
    title: "Top-Rated Only",
    desc: "Every venue is curated and reviewed by real diners.",
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: "#10b981",
    bg: "#f0fdf4",
    title: "Free Cancellation",
    desc: "Cancel up to 2 hours before with no charge.",
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: "#e11d48",
    bg: "#fff1f2",
    title: "Special Occasions",
    desc: "Add birthday or anniversary notes when you book.",
  },
];

export default function FeatureCards() {
  return (
    <div className="rrs-feature-strip">
      {features.map((f, idx) => (
        <div key={f.title} className="rrs-feature-item" style={{ animationDelay: `${idx * 80}ms` }}>
          <div className="rrs-feature-icon-wrap" style={{ background: f.bg, color: f.color }}>
            {f.svg}
          </div>
          <div>
            <div className="rrs-feature-text-title">{f.title}</div>
            <div className="rrs-feature-text-desc">{f.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
