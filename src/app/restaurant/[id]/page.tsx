"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import type { BookingDraft } from "@/store/slices/reservationsSlice";
import { updateDraft } from "@/store/slices/reservationsSlice";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import StepBar from "@/components/StepBar";

type Restaurant = {
  id: string; name: string; location: string; cuisine: string;
  rating: number; reviewCount: number; reviewLabel: string;
  priceRange: string; hours: string; menu: string[];
  tags: string[]; desc: string; fullDesc: string;
  mapQuery: string; image: string;
};

const RESTAURANTS: Restaurant[] = [
  {
    id: "r1", name: "Brisket & Bowls", location: "Lahore", cuisine: "American",
    rating: 9.2, reviewCount: 312, reviewLabel: "Superb", priceRange: "$$",
    hours: "11:00 AM – 11:00 PM",
    menu: ["Smash Burger – Rs 1,200", "BBQ Ribs (half rack) – Rs 2,800", "Caesar Salad – Rs 850", "Truffle Fries – Rs 650", "Chocolate Lava Cake – Rs 700"],
    tags: ["Halal", "Dine-in", "Takeaway", "Outdoor seating", "Parking"],
    desc: "Award-winning smash burgers and slow-smoked ribs.",
    fullDesc: "Lahore's most-talked-about American BBQ spot. Our brisket is smoked low and slow for 14 hours over hickory wood. Every burger is hand-pressed to order, every sauce made in-house. The outdoor terrace seats up to 60 and is perfect for family outings.",
    mapQuery: "Lahore,Pakistan",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=500&fit=crop&q=80",
  },
  {
    id: "r2", name: "Spice Route", location: "Karachi", cuisine: "Pakistani",
    rating: 9.6, reviewCount: 528, reviewLabel: "Exceptional", priceRange: "$$",
    hours: "12:00 PM – 12:00 AM",
    menu: ["Dum Biryani – Rs 950", "Peshwari Handi – Rs 1,800", "Karahi (serves 2) – Rs 2,200", "Chapli Kabab – Rs 600", "Doodh Soda – Rs 200"],
    tags: ["Halal", "Family-friendly", "Dine-in", "Private rooms", "Live Qawwali Fri"],
    desc: "Authentic Peshwari recipes, legendary Karahi.",
    fullDesc: "Three generations of the Qureshi family have perfected these recipes. The secret? Fresh-ground spices, a 100-year-old family masala blend, and clay karahi pots fired over open wood flame. The private dining rooms seat up to 20 — ideal for corporate lunches and family dinners.",
    mapQuery: "Karachi,Pakistan",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=900&h=500&fit=crop&q=80",
  },
  {
    id: "r3", name: "Sushi Station", location: "Islamabad", cuisine: "Japanese",
    rating: 8.8, reviewCount: 194, reviewLabel: "Fabulous", priceRange: "$$$",
    hours: "10:00 AM – 10:00 PM",
    menu: ["Salmon Roll – Rs 1,400", "Dragon Roll – Rs 1,600", "Gyoza (6 pcs) – Rs 900", "Miso Ramen – Rs 1,100", "Matcha Ice Cream – Rs 650"],
    tags: ["Fine dining", "Reservation required", "Bar", "Parking", "WiFi"],
    desc: "Islamabad's premier Japanese dining experience.",
    fullDesc: "Chef Tanaka brings 22 years of Tokyo experience to Islamabad. Fish is flown in twice weekly from Tokyo's Tsukiji market. The omakase set menu (12 courses, Rs 8,500/person) is bookable in advance and is the city's most sought-after dining experience.",
    mapQuery: "Islamabad,Pakistan",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=900&h=500&fit=crop&q=80",
  },
  {
    id: "r4", name: "Lahori Darbar", location: "Lahore", cuisine: "Pakistani",
    rating: 9.1, reviewCount: 445, reviewLabel: "Superb", priceRange: "$",
    hours: "8:00 AM – 2:00 AM",
    menu: ["Nihari – Rs 450", "Paye – Rs 500", "Halwa Puri (set) – Rs 350", "Lassi – Rs 180", "Channay – Rs 250"],
    tags: ["Halal", "Open late", "Traditional", "Budget-friendly", "Takeaway"],
    desc: "A Lahore institution since 1962.",
    fullDesc: "Since 1962, Lahori Darbar has been the city's breakfast institution. The Nihari slow-cooks overnight in massive handis. The old city location, the bustling atmosphere, the naan straight from the tandoor — this is Lahore on a plate.",
    mapQuery: "Lahore Old City,Pakistan",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=900&h=500&fit=crop&q=80",
  },
  {
    id: "r5", name: "Casa Milano", location: "Karachi", cuisine: "Italian",
    rating: 8.9, reviewCount: 267, reviewLabel: "Fabulous", priceRange: "$$$",
    hours: "12:00 PM – 11:00 PM",
    menu: ["Margherita Pizza – Rs 1,600", "Truffle Risotto – Rs 2,400", "Pasta Carbonara – Rs 1,800", "Tiramisu – Rs 850", "Bruschetta – Rs 700"],
    tags: ["Fine dining", "Romantic", "Private events", "Wine selection", "Valet parking"],
    desc: "Karachi's finest Italian dining.",
    fullDesc: "An intimate 40-seat restaurant modelled on a Milanese trattoria. Chef Marco Ricci imports his dough flour and San Marzano tomatoes directly from Italy. The wine cellar holds over 200 labels. Ideal for anniversaries, proposals, and business dinners.",
    mapQuery: "DHA Karachi,Pakistan",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&h=500&fit=crop&q=80",
  },
  {
    id: "r6", name: "The Rooftop Grill", location: "Islamabad", cuisine: "Continental",
    rating: 9.0, reviewCount: 389, reviewLabel: "Superb", priceRange: "$$",
    hours: "5:00 PM – 12:00 AM",
    menu: ["Grilled Sirloin 250g – Rs 3,200", "Seafood Platter – Rs 3,800", "Mushroom Soup – Rs 650", "Crème Brûlée – Rs 750", "Mocktail of the Day – Rs 400"],
    tags: ["Rooftop", "City views", "Sunset dining", "Live music Sat", "Dress code"],
    desc: "Islamabad's best rooftop dining.",
    fullDesc: "On the 9th floor of the Capital Center, The Rooftop Grill offers unobstructed views of the Margalla Hills. The open-air grill stations cook over charcoal. Every Saturday, a live jazz duo plays from 8 PM. Smart casual dress code enforced.",
    mapQuery: "Blue Area Islamabad,Pakistan",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=500&fit=crop&q=80",
  },
];

const REVIEWS = [
  { name: "Ayesha K.", score: 10, text: "Absolutely incredible food and service. Will definitely be coming back!", date: "May 2026" },
  { name: "Omar R.", score: 9, text: "One of the best meals I've had in the city. Loved the ambiance.", date: "Apr 2026" },
  { name: "Sara M.", score: 9, text: "Great experience! Booking was super easy and table was ready on time.", date: "Apr 2026" },
];

export default function RestaurantProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useDispatch();
  const draft = useSelector((s: RootState) => s.reservations.draft);

  const restaurant = useMemo(() => RESTAURANTS.find((r) => r.id === params?.id), [params]);

  const onContinue = () => {
    const nextDraft: Partial<BookingDraft> = {
      restaurantId: restaurant?.id,
      location: draft.location || restaurant?.location,
      cuisine: draft.cuisine || restaurant?.cuisine,
      date: draft.date,
      time: draft.time,
      partySize: draft.partySize,
    };
    dispatch(updateDraft(nextDraft));
    router.push("/booking");
  };

  if (!restaurant) {
    return (
      <>
        <Navbar />
        <main className="rrs-page" style={{ textAlign: "center", paddingTop: 80 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🍽</div>
          <h2 style={{ marginBottom: 12 }}>Restaurant not found</h2>
          <p style={{ color: "var(--rrs-muted)", marginBottom: 24 }}>This restaurant doesn&apos;t exist or was removed.</p>
          <button type="button" className="btn btn-primary" onClick={() => router.push("/")}>← Back to search</button>
        </main>
      </>
    );
  }

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(restaurant.mapQuery)}&output=embed&z=14`;

  return (
    <>
      <Navbar />
      <StepBar current={2} />

      {/* ── HEADER STRIP ── */}
      <div style={{ background: "var(--rrs-blue)", color: "#fff", padding: "20px 28px 32px", position: "relative" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <button
            type="button"
            onClick={() => router.push("/")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", cursor: "pointer", fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 20, marginBottom: 16, transition: "all .2s" }}
          >
            ← Back to results
          </button>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, marginBottom: 8, letterSpacing: "-0.5px" }}>
                {restaurant.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                <span>📍 {restaurant.location}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
                <span>{restaurant.cuisine}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
                <span style={{ background: "rgba(254,187,2,0.2)", color: "#febb02", padding: "2px 8px", borderRadius: 4, fontWeight: 700 }}>{restaurant.priceRange}</span>
                <span style={{ color: "rgba(255,255,255,0.35)" }}>·</span>
                <span>🕐 {restaurant.hours}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{restaurant.reviewLabel}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{restaurant.reviewCount} reviews</div>
              </div>
              <div style={{ width: 52, height: 52, borderRadius: "12px 12px 12px 0", background: "#007a45", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}>
                {restaurant.rating}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="rrs-page">
        {/* Tags */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {restaurant.tags.map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", background: "#fff", border: "1.5px solid var(--rrs-border)", borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600, transition: "all .2s" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* ── LEFT COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Photo Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 4, height: 300, borderRadius: 16, overflow: "hidden", boxShadow: "var(--rrs-shadow-lg)" }}>
              <div style={{ position: "relative", gridRow: "span 2" }}>
                <Image src={restaurant.image} alt={restaurant.name} fill style={{ objectFit: "cover" }} />
              </div>
              <div style={{ position: "relative" }}>
                <Image src={restaurant.image} alt={restaurant.name} fill style={{ objectFit: "cover", objectPosition: "center 30%", filter: "brightness(0.85)" }} />
              </div>
              <div style={{ position: "relative" }}>
                <Image src={restaurant.image} alt={restaurant.name} fill style={{ objectFit: "cover", objectPosition: "center 70%", filter: "brightness(0.75)" }} />
              </div>
            </div>

            {/* About */}
            <div className="card" style={{ padding: "24px 28px" }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>About {restaurant.name}</h2>
              <p style={{ color: "var(--rrs-muted)", lineHeight: 1.75, fontSize: 15 }}>{restaurant.fullDesc}</p>
            </div>

            {/* Menu Highlights */}
            <div className="card" style={{ padding: "24px 28px" }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 16 }}>Menu highlights</h2>
              {restaurant.menu.map((item, i) => {
                const [name, price] = item.split("–").map(s => s.trim());
                return (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < restaurant.menu.length - 1 ? "1px solid var(--rrs-border)" : "none" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--rrs-accent)", flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{name}</span>
                    <span style={{ color: "var(--rrs-blue)", fontWeight: 800, fontSize: 15, whiteSpace: "nowrap" }}>{price}</span>
                  </div>
                );
              })}
            </div>

            {/* Guest Reviews */}
            <div className="card" style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0 }}>Guest reviews</h2>
                <div style={{ width: 40, height: 40, borderRadius: "8px 8px 8px 0", background: "#007a45", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff" }}>{restaurant.rating}</div>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{restaurant.reviewLabel}</span>
                <span style={{ color: "var(--rrs-muted)", fontSize: 13 }}>· {restaurant.reviewCount} reviews</span>
              </div>
              {REVIEWS.map((rv) => (
                <div key={rv.name} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--rrs-border)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,var(--rrs-blue-light),#d0dcf5)", color: "var(--rrs-blue)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                    {rv.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <strong style={{ fontSize: 14 }}>{rv.name}</strong>
                      <span style={{ background: "var(--rrs-blue-light)", color: "var(--rrs-blue)", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 12 }}>{rv.score}/10</span>
                      <span style={{ color: "var(--rrs-muted)", fontSize: 12, marginLeft: "auto" }}>{rv.date}</span>
                    </div>
                    <p style={{ fontSize: 14, color: "var(--rrs-muted)", lineHeight: 1.6, margin: 0 }}>{rv.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Booking Widget */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--rrs-border)", boxShadow: "0 4px 20px rgba(0,53,128,0.1)", overflow: "hidden" }}>
              <div style={{ background: "linear-gradient(135deg,var(--rrs-blue),var(--rrs-blue-mid))", padding: "20px 22px 18px" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Reserve a table</h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>Free cancellation up to 2 hrs before</p>
              </div>

              <div style={{ background: "var(--rrs-bg)", margin: "16px 22px", borderRadius: 10, border: "1px solid var(--rrs-border)", overflow: "hidden" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: "var(--rrs-muted)", textTransform: "uppercase", letterSpacing: "0.6px", padding: "10px 14px 6px" }}>Your search</div>
                {[
                  { icon: "📅", label: "Date", val: draft.date || "Select a date", filled: !!draft.date },
                  { icon: "⏰", label: "Time", val: draft.time || "Select a time", filled: !!draft.time },
                  { icon: "👥", label: "Guests", val: draft.partySize ? `${draft.partySize} guest${draft.partySize > 1 ? "s" : ""}` : "2 guests", filled: !!draft.partySize },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderTop: "1px solid var(--rrs-border)" }}>
                    <span style={{ fontSize: 15 }}>{row.icon}</span>
                    <span style={{ color: "var(--rrs-muted)", fontSize: 13, width: 44, flexShrink: 0 }}>{row.label}</span>
                    <span style={{ fontWeight: 600, fontSize: 14, color: row.filled ? "var(--rrs-text)" : "var(--rrs-muted)" }}>{row.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 22px 16px" }}>
                {["Free cancellation before 2 hrs", "Instant confirmation", "No booking fee"].map((perk, i) => (
                  <div key={perk} style={{ display: "flex", gap: 8, fontSize: 14 }}>
                    <span style={{ color: "var(--rrs-success)", fontWeight: 700 }}>✓</span>
                    <span>{i === 0 ? <><strong>Free cancellation</strong> before 2 hrs</> : perk}</span>
                  </div>
                ))}
              </div>

              <button type="button" className="btn btn-accent btn-lg" onClick={onContinue} style={{ margin: "0 22px 4px", width: "calc(100% - 44px)", borderRadius: 10 }}>
                Reserve now →
              </button>
              <p style={{ textAlign: "center", color: "var(--rrs-muted)", fontSize: 12, padding: "0 22px 18px", margin: 0 }}>
                You won&apos;t be charged yet
              </p>
            </div>

            {/* Map Card — Real Google Maps */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid var(--rrs-border)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", overflow: "hidden" }}>
              <iframe
                title={`Map of ${restaurant.name}`}
                src={mapSrc}
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--rrs-blue)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {restaurant.location}
                </div>
                <p style={{ fontSize: 12, color: "var(--rrs-muted)", margin: 0 }}>Exact address provided after booking</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
