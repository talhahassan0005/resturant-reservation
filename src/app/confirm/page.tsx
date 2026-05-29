"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import { resetBooking } from "@/store/slices/reservationsSlice";
import Navbar from "@/components/Navbar";
import StepBar from "@/components/StepBar";

const RESTAURANT_NAMES: Record<string, string> = {
  r1: "Brisket & Bowls", r2: "Spice Route", r3: "Sushi Station",
  r4: "Lahori Darbar", r5: "Casa Milano", r6: "The Rooftop Grill",
};

function randomRef() { return "TN" + Math.floor(1000000 + Math.random() * 9000000); }

const IconCheck = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#10b981"/><polyline points="6,12 10,16 18,8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconCheckSm = ({ color = "#10b981" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={color} opacity="0.15"/><polyline points="8,12 11,15 16,9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconWarn = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f59e0b" opacity="0.15"/><line x1="12" y1="8" x2="12" y2="13" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#f59e0b"/></svg>;
const IconXSm = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.15"/><line x1="8" y1="8" x2="16" y2="16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/><line x1="16" y1="8" x2="8" y2="16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003580" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconSms = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003580" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconUtensils = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003580" strokeWidth="2" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>;
const IconCancel = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003580" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const IconUser = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconPhone = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconMailSm = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconCalendar = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconClock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconUsers = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconArrowRight = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

export default function ConfirmPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const draft = useSelector((s: RootState) => s.reservations.draft);
  const confirmed = useSelector((s: RootState) => s.reservations.bookingConfirmed);
  const restaurantName = RESTAURANT_NAMES[draft.restaurantId ?? ""] ?? draft.restaurantId ?? "Restaurant";
  const ref = randomRef();

  const onDone = () => { dispatch(resetBooking()); router.push("/"); };

  const sectionCard: React.CSSProperties = {
    background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)", padding: "28px",
  };

  if (!confirmed) {
    return (
      <>
        <Navbar />
        <main className="rrs-page" style={{ textAlign: "center", paddingTop: 80 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#fff7ed", border: "2px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h2 style={{ marginBottom: 12, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>No booking found</h2>
          <p style={{ color: "#94a3b8", marginBottom: 24 }}>Please complete the booking flow from the start.</p>
          <button type="button" className="btn btn-primary" onClick={() => router.push("/")}>Go home</button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <StepBar current={5} />

      {/* Success banner */}
      <div style={{ background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)", borderBottom: "2px solid #6ee7b7", padding: "24px 28px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <div style={{ animation: "popIn 0.4s ease both", flexShrink: 0 }}><IconCheck /></div>
          <div style={{ animation: "fadeUp 0.4s ease both 0.1s backwards" }}>
            <h1 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 800, color: "#065f46", margin: 0, fontFamily: "'Poppins', sans-serif" }}>
              Booking confirmed!
            </h1>
            <p style={{ color: "#047857", fontSize: 14, marginTop: 5 }}>
              Your table at <strong>{restaurantName}</strong> is reserved. Confirmation sent to <strong>{draft.email || "your email"}</strong>.
            </p>
          </div>
        </div>
      </div>

      <main className="rrs-page">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Booking card */}
            <div style={sectionCard}>
              <div style={{
                background: "linear-gradient(135deg, #001f4d 0%, #003580 100%)",
                borderRadius: 12, padding: "22px 24px", marginBottom: 28,
                display: "flex", alignItems: "center", gap: 18,
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(254,187,2,0.2)", border: "1.5px solid rgba(254,187,2,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#febb02" strokeWidth="2" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "'Poppins', sans-serif" }}>{restaurantName}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 4 }}>
                    Booking reference: <span style={{ color: "#febb02", fontWeight: 800, letterSpacing: "1px" }}>#{ref}</span>
                  </div>
                </div>
              </div>

              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Reservation details</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { icon: <IconUser />, label: "Guest name", val: draft.name || "—" },
                  { icon: <IconPhone />, label: "Phone", val: draft.phone || "—" },
                  { icon: <IconMailSm />, label: "Email", val: draft.email || "—" },
                  { icon: <IconCalendar />, label: "Date", val: draft.date || "—" },
                  { icon: <IconClock />, label: "Time", val: draft.time || "—" },
                  { icon: <IconUsers />, label: "Party size", val: draft.partySize ? `${draft.partySize} guest${draft.partySize > 1 ? "s" : ""}` : "—" },
                ].map(row => (
                  <div key={row.label} style={{ background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94a3b8", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <span style={{ color: "#94a3b8" }}>{row.icon}</span> {row.label}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e" }}>{row.val}</div>
                  </div>
                ))}
              </div>

              {draft.specialRequest && (
                <div style={{ marginTop: 14, background: "#eff6ff", borderRadius: 10, padding: "14px 16px", border: "1px solid #bfdbfe" }}>
                  <div style={{ fontSize: 11, color: "#003580", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Special request</div>
                  <div style={{ fontSize: 14, color: "#1a1a2e" }}>{draft.specialRequest}</div>
                </div>
              )}
            </div>

            {/* What happens next */}
            <div style={sectionCard}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>What happens next?</h2>
              {[
                { icon: <IconMail />, title: "Confirmation email sent", desc: `A booking confirmation has been sent to ${draft.email || "your email"}.` },
                { icon: <IconSms />, title: "SMS reminder", desc: "You'll receive an SMS reminder 2 hours before your reservation." },
                { icon: <IconUtensils />, title: "Arrive on time", desc: "Your table will be held for 15 minutes past your booking time." },
                { icon: <IconCancel />, title: "Need to cancel?", desc: "Free cancellation up to 2 hours before. Manage via your email link." },
              ].map((item, i) => (
                <div key={item.title} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: i < 3 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "#1a1a2e", fontFamily: "'Poppins', sans-serif" }}>{item.title}</div>
                    <div style={{ color: "#6b7280", fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button type="button" onClick={onDone} style={{
                padding: "13px 24px", background: "linear-gradient(135deg, #003580 0%, #0055b3 100%)",
                color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 800,
                cursor: "pointer", transition: "all 0.2s", fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 4px 14px rgba(0,53,128,0.3)",
                display: "flex", alignItems: "center", gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,53,128,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,53,128,0.3)"; }}
              >
                Make another reservation <IconArrowRight />
              </button>
              <button type="button" onClick={() => router.push("/my-bookings")} style={{
                padding: "13px 20px", background: "#fff", color: "#003580",
                border: "2px solid #e2e8f0", borderRadius: 12, fontSize: 14, fontWeight: 700,
                cursor: "pointer", transition: "all 0.2s", fontFamily: "'Poppins', sans-serif",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#003580"; e.currentTarget.style.background = "#eff6ff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; }}
              >
                View my bookings
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 80, display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Payment summary */}
            <div style={{ ...sectionCard, padding: "24px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Payment summary</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Deposit paid", val: "Rs 500", color: "#1a1a2e" },
                  { label: "Booking fee", val: "Free", color: "#10b981" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{r.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: r.color }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "#e2e8f0", margin: "4px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>Total paid</span>
                  <span style={{ fontWeight: 800, fontSize: 16, color: "#003580" }}>Rs 500</span>
                </div>
              </div>
              <div style={{ marginTop: 14, background: "#f0fdf4", borderRadius: 10, padding: "12px 14px", border: "1px solid #bbf7d0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#065f46", fontWeight: 700 }}>
                  <IconCheckSm color="#10b981" /> Refundable deposit
                </div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Full refund if cancelled 2+ hrs before.</div>
              </div>
            </div>

            {/* Cancellation policy */}
            <div style={{ ...sectionCard, padding: "24px" }}>
              <h2 style={{ fontSize: 15, fontWeight: 800, marginBottom: 14, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Cancellation policy</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: <IconCheckSm />, text: "Free if cancelled 2+ hrs before" },
                  { icon: <IconWarn />, text: "25% fee within 2 hrs" },
                  { icon: <IconXSm />, text: "Full deposit forfeited for no-show" },
                ].map(item => (
                  <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, color: "#374151" }}>
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
