"use client";
import RestaurantCard, { type Restaurant } from "@/components/RestaurantCard";

type Props = {
  restaurants: Restaurant[];
  searched: boolean;
  location: string;
  onPickRestaurant: (r: Restaurant) => void;
  onClearFilters: () => void;
};

export default function RestaurantList({
  restaurants, searched, location, onPickRestaurant, onClearFilters,
}: Props) {
  return (
    <section>
      <div className="rrs-section-head">
        <h2 className="rrs-section-title">
          {searched
            ? `${restaurants.length} result${restaurants.length !== 1 ? "s" : ""}${location ? ` in ${location}` : ""}`
            : "Popular restaurants"}
        </h2>
        {searched && (
          <button className="btn btn-outline btn-sm" type="button" onClick={onClearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {restaurants.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "60px 20px",
          background: "var(--rrs-surface)", borderRadius: "var(--rrs-radius-lg)",
          border: "1.5px solid var(--rrs-border)",
        }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
              <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
            </svg>
          </div>
          <h3 style={{ fontFamily: "'Poppins', sans-serif", marginBottom: 8, color: "#1a1a2e" }}>No restaurants found</h3>
          <p style={{ color: "var(--rrs-muted)", marginBottom: 20 }}>
            Try a different city or remove filters.
          </p>
          <button className="btn btn-accent" type="button" onClick={onClearFilters}>
            Show all restaurants
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {restaurants.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onPick={onPickRestaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
