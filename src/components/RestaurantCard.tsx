"use client";

export type Restaurant = {
  id: string; name: string; location: string; cuisine: string;
  rating: number; reviewCount: number; reviewLabel: string;
  priceRange: string; hours: string; menu: string[];
  tags: string[]; emoji: string; desc: string; fullDesc: string;
  image: string;
};

type Props = { restaurant: Restaurant; onPick: (r: Restaurant) => void; };

const IconPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function RestaurantCard({ restaurant: r, onPick }: Props) {
  return (
    <div className="rrs-rc rrs-card-anim" onClick={() => onPick(r)}>
      {/* Thumbnail */}
      <div
        className="rrs-rc-thumb"
        style={{ backgroundImage: `url('${r.image}')`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <span className="rrs-rc-thumb-badge">{r.priceRange}</span>
      </div>

      {/* Body */}
      <div className="rrs-rc-body">
        <div className="rrs-rc-header">
          <div>
            <div className="rrs-rc-name">{r.name}</div>
            <div className="rrs-rc-meta" style={{ marginTop: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <IconPin /> {r.location}
              </span>
              <span className="rrs-rc-meta-dot">·</span>
              <span>{r.cuisine}</span>
            </div>
          </div>
          <div className="rrs-rc-score-wrap">
            <div style={{ textAlign: "right" }}>
              <div className="rrs-rc-score-label">{r.reviewLabel}</div>
              <div className="rrs-rc-score-sub">{r.reviewCount} reviews</div>
            </div>
            <div className="rrs-rc-score">{r.rating}</div>
          </div>
        </div>

        <p className="rrs-rc-desc">{r.desc}</p>

        <div className="rrs-rc-tags">
          {r.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rrs-rc-tag">{tag}</span>
          ))}
        </div>

        <div className="rrs-rc-footer">
          <span className="rrs-rc-hours">
            <IconClock /> {r.hours}
          </span>
          <button
            className="rrs-rc-cta"
            type="button"
            onClick={(e) => { e.stopPropagation(); onPick(r); }}
          >
            Reserve a Table <IconArrow />
          </button>
        </div>
      </div>
    </div>
  );
}
