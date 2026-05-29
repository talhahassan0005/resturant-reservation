"use client";

import { useState } from "react";

const MONTHLY = [
  { month: "Jan", revenue: 38400, bookings: 124 },
  { month: "Feb", revenue: 42100, bookings: 138 },
  { month: "Mar", revenue: 39800, bookings: 131 },
  { month: "Apr", revenue: 51200, bookings: 167 },
  { month: "May", revenue: 48600, bookings: 158 },
  { month: "Jun", revenue: 56300, bookings: 184 },
  { month: "Jul", revenue: 61200, bookings: 201 },
  { month: "Aug", revenue: 58900, bookings: 193 },
  { month: "Sep", revenue: 53400, bookings: 175 },
  { month: "Oct", revenue: 64800, bookings: 212 },
  { month: "Nov", revenue: 71200, bookings: 234 },
  { month: "Dec", revenue: 78500, bookings: 258 },
];

const TOP_RESTAURANTS = [
  { name: "Spice Route",        bookings: 528, revenue: 142600, rating: 9.6, pct: 100 },
  { name: "The Rooftop Grill",  bookings: 389, revenue: 118400, rating: 9.0, pct: 83  },
  { name: "Lahori Darbar",      bookings: 445, revenue: 98200,  rating: 9.1, pct: 69  },
  { name: "Brisket & Bowls",    bookings: 312, revenue: 87500,  rating: 9.2, pct: 61  },
  { name: "Casa Milano",        bookings: 267, revenue: 76300,  rating: 8.9, pct: 54  },
  { name: "Sushi Station",      bookings: 194, revenue: 61800,  rating: 8.8, pct: 43  },
];

const CUISINE_DATA = [
  { label: "Pakistani",    pct: 38, color: "#003580" },
  { label: "American",     pct: 22, color: "#2563eb" },
  { label: "Italian",      pct: 16, color: "#0891b2" },
  { label: "Japanese",     pct: 13, color: "#6366f1" },
  { label: "Continental",  pct: 11, color: "#64748b" },
];

const ACTIVITY = [
  { text: "New booking by Ahmed Khan at Spice Route",          time: "2 min ago",  dot: "#16a34a" },
  { text: "Booking cancelled by Zainab Malik",                 time: "15 min ago", dot: "#dc2626" },
  { text: "New restaurant Desi Dhaba added",                   time: "1 hr ago",   dot: "#003580" },
  { text: "New user registered: Sara Qureshi",                 time: "2 hrs ago",  dot: "#6366f1" },
  { text: "Booking confirmed for Hassan Ali at Sushi Station", time: "3 hrs ago",  dot: "#16a34a" },
  { text: "New review submitted on The Rooftop Grill",         time: "5 hrs ago",  dot: "#d97706" },
];

export default function AnalyticsPage() {
  const [tab, setTab] = useState<"revenue" | "bookings">("revenue");

  const values = MONTHLY.map(d => tab === "revenue" ? d.revenue : d.bookings);
  const max = Math.max(...values);

  const totalRevenue  = MONTHLY.reduce((s, d) => s + d.revenue, 0);
  const totalBookings = MONTHLY.reduce((s, d) => s + d.bookings, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#111827" }}>Analytics</h1>
          <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 14 }}>Jan – Dec 2024 overview</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["This Year", "Last Year"].map((l, i) => (
            <button key={l} style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #e5e7eb", background: i === 0 ? "#003580" : "#fff", color: i === 0 ? "#fff" : "#374151", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Total Revenue",      value: `Rs ${totalRevenue.toLocaleString()}`, sub: "+18% vs last year",   color: "#003580" },
          { label: "Total Bookings",     value: totalBookings.toLocaleString(),         sub: "+24% vs last year",   color: "#16a34a" },
          { label: "Avg Order Value",    value: "Rs 3,512",                             sub: "+6% vs last month",   color: "#7c3aed" },
          { label: "Cancellation Rate",  value: "3.2%",                                sub: "-1.1% vs last month", color: "#dc2626" },
        ].map(k => (
          <div key={k.label} style={{ background: "#fff", borderRadius: 10, padding: "16px 18px", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{k.label}</p>
            <p style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: k.color }}>{k.value}</p>
            <p style={{ margin: 0, fontSize: 12, color: k.sub.startsWith("-") ? "#dc2626" : "#16a34a", fontWeight: 500 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Bar chart + Cuisine */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20 }}>

        {/* Bar chart */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>Monthly Overview</h2>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: "#6b7280" }}>
                {tab === "revenue" ? `Rs ${totalRevenue.toLocaleString()} total` : `${totalBookings} total bookings`}
              </p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {(["revenue", "bookings"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #e5e7eb", background: tab === t ? "#003580" : "#fff", color: tab === t ? "#fff" : "#374151", fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 160 }}>
            {MONTHLY.map((d, i) => {
              const val = tab === "revenue" ? d.revenue : d.bookings;
              const h = Math.max(4, Math.round((val / max) * 140));
              return (
                <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div
                    title={tab === "revenue" ? `Rs ${val.toLocaleString()}` : `${val} bookings`}
                    style={{ width: "100%", height: h, borderRadius: "3px 3px 0 0", background: "#003580", cursor: "pointer", transition: "background .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#0055b3")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#003580")}
                  />
                  <span style={{ fontSize: 10, color: "#9ca3af" }}>{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cuisine breakdown */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Bookings by Cuisine</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CUISINE_DATA.map(d => (
              <div key={d.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{d.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>{d.pct}%</span>
                </div>
                <div style={{ height: 6, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${d.pct}%`, height: "100%", background: d.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top restaurants + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* Top restaurants */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Top Restaurants</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {TOP_RESTAURANTS.map((r, i) => (
              <div key={r.name}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#374151", flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{r.name}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#003580" }}>Rs {r.revenue.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af" }}>{r.bookings} bookings</div>
                  </div>
                </div>
                <div style={{ height: 4, background: "#f1f5f9", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${r.pct}%`, height: "100%", background: "#003580", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "20px 22px", border: "1px solid #e5e7eb" }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "#111827" }}>Recent Activity</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "11px 0", borderBottom: i < ACTIVITY.length - 1 ? "1px solid #f9fafb" : "none" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.dot, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{a.text}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9ca3af" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ background: "#003580", borderRadius: 10, padding: "20px 28px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {[
          { label: "Best Month",        value: "December", sub: "Rs 78,500 revenue" },
          { label: "Peak Day",          value: "Saturday", sub: "42% of all bookings" },
          { label: "Avg Party Size",    value: "3.4",      sub: "guests per booking" },
          { label: "Repeat Customers",  value: "68%",      sub: "return within 30 days" },
        ].map((s, i) => (
          <div key={s.label} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <p style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 700, color: "#fff" }}>{s.value}</p>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
