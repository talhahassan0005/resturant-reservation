"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const bookings = useSelector((s: RootState) => s.reservations.bookings);

  const [form, setForm] = useState({ name: "Ahmed Khan", email: "ahmed@example.com", phone: "0312-3456789" });
  const [focused, setFocused] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const onSave = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const totalBookings = bookings.length;
  const confirmed = bookings.filter(b => b.status === "confirmed" || b.status === "modified").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;

  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%", padding: "13px 16px 13px 46px",
    border: `2px solid ${focused === field ? "#003580" : "#e2e8f0"}`,
    borderRadius: 10, fontSize: 14, color: "#1a1a2e",
    background: focused === field ? "#fff" : "#f8fafc",
    outline: "none", transition: "all 0.2s",
    fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500,
    boxShadow: focused === field ? "0 0 0 4px rgba(0,53,128,0.08)" : "none",
  });

  const card: React.CSSProperties = {
    background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "28px",
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #001f4d 0%, #003580 100%)", color: "#fff", padding: "28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(254,187,2,0.2)", border: "2px solid rgba(254,187,2,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#febb02", fontFamily: "'Poppins', sans-serif", flexShrink: 0 }}>
            {form.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif" }}>
              {form.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 4 }}>{form.email}</p>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

          {/* Left: Edit profile form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={card}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 22, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>
                Personal information
              </h2>

              {saved && (
                <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#10b981" opacity="0.2"/><polyline points="8,12 11,15 16,9" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#065f46" }}>Profile updated successfully!</span>
                </div>
              )}

              <form onSubmit={onSave} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Ahmed Khan", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "03xx-xxxxxxx", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Poppins', sans-serif" }}>
                      {f.label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: focused === f.key ? "#003580" : "#94a3b8", transition: "color 0.2s", pointerEvents: "none" }}>
                        {f.icon}
                      </div>
                      <input type={f.type} value={(form as Record<string, string>)[f.key]} onChange={set(f.key)} placeholder={f.placeholder}
                        style={inputStyle(f.key)}
                        onFocus={() => setFocused(f.key)} onBlur={() => setFocused(null)} />
                    </div>
                  </div>
                ))}

                <button type="submit" style={{
                  padding: "13px 28px", background: "linear-gradient(135deg, #003580 0%, #0055b3 100%)",
                  color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800,
                  cursor: "pointer", fontFamily: "'Poppins', sans-serif", alignSelf: "flex-start",
                  boxShadow: "0 4px 14px rgba(0,53,128,0.3)", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,53,128,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,53,128,0.3)"; }}
                >
                  Save changes
                </button>
              </form>
            </div>

            {/* Change password section */}
            <div style={card}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Password & security</h2>
              <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 16 }}>Keep your account secure with a strong password.</p>
              <button type="button" style={{
                padding: "10px 20px", background: "#f8fafc", color: "#003580",
                border: "1.5px solid #bfdbfe", borderRadius: 10, fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Poppins', sans-serif",
              }}>
                🔒 Change password
              </button>
            </div>
          </div>

          {/* Right sidebar: stats + quick links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Stats */}
            <div style={card}>
              <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Booking stats</h2>
              {[
                { label: "Total bookings", val: totalBookings, color: "#003580" },
                { label: "Active", val: confirmed, color: "#16a34a" },
                { label: "Cancelled", val: cancelled, color: "#dc2626" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: s.color, fontFamily: "'Poppins', sans-serif" }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={card}>
              <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 16, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Quick links</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "📋 My bookings", path: "/my-bookings" },
                  { label: "🍽 Find restaurants", path: "/" },
                ].map(l => (
                  <button key={l.path} type="button" onClick={() => router.push(l.path)} style={{
                    padding: "11px 16px", background: "#f8fafc", color: "#003580",
                    border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 13, fontWeight: 700,
                    cursor: "pointer", textAlign: "left", fontFamily: "'Poppins', sans-serif",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
