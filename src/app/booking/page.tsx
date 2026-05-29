"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import { confirmBooking, updateDraft } from "@/store/slices/reservationsSlice";
import Navbar from "@/components/Navbar";
import StepBar from "@/components/StepBar";

const RESTAURANT_NAMES: Record<string, string> = {
  r1: "Brisket & Bowls", r2: "Spice Route", r3: "Sushi Station",
  r4: "Lahori Darbar", r5: "Casa Milano", r6: "The Rooftop Grill",
};

const IconUser = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconPhone = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconMail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconCheck = ({ color = "#10b981" }: { color?: string }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill={color} opacity="0.15"/><polyline points="8,12 11,15 16,9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconWarn = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#f59e0b" opacity="0.15"/><line x1="12" y1="8" x2="12" y2="13" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="16" r="1" fill="#f59e0b"/></svg>;
const IconX = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#ef4444" opacity="0.15"/><line x1="8" y1="8" x2="16" y2="16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/><line x1="16" y1="8" x2="8" y2="16" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/></svg>;
const IconCalendar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconClock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconUsers = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconUtensils = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>;
const IconLock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconArrowLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

export default function BookingPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const draft = useSelector((s: RootState) => s.reservations.draft);

  const [name, setName] = useState(draft.name ?? "");
  const [phone, setPhone] = useState(draft.phone ?? "");
  const [email, setEmail] = useState(draft.email ?? "");
  const [specialRequest, setSpecialRequest] = useState(draft.specialRequest ?? "");
  const [depositRequired] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const restaurantName = useMemo(() =>
    RESTAURANT_NAMES[draft.restaurantId ?? ""] ?? draft.restaurantId ?? "Restaurant",
    [draft.restaurantId]
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!phone.trim()) e.phone = "Phone number is required";
    if (!email.trim()) e.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onContinue = () => {
    if (!validate()) return;
    dispatch(updateDraft({ name, phone, email, specialRequest: specialRequest || undefined }));
    if (depositRequired) router.push("/payment");
    else { dispatch(confirmBooking()); router.push("/confirm"); }
  };

  const inputBase = (field: string): React.CSSProperties => ({
    width: "100%", padding: "13px 16px 13px 44px",
    border: `2px solid ${errors[field] ? "#ef4444" : focused === field ? "#003580" : "#e2e8f0"}`,
    borderRadius: 10, fontSize: 14, color: "#1a1a2e",
    background: focused === field ? "#fff" : "#f8fafc",
    outline: "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
    fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500,
    boxShadow: focused === field ? "0 0 0 4px rgba(0,53,128,0.08)" : errors[field] ? "0 0 0 4px rgba(239,68,68,0.08)" : "none",
  });

  const iconColor = (field: string) => focused === field ? "#003580" : "#94a3b8";

  const ErrorMsg = ({ msg }: { msg?: string }) => msg ? (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>{msg}</span>
    </div>
  ) : null;

  const sectionCard: React.CSSProperties = {
    background: "#fff", borderRadius: 16,
    border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
    padding: "28px",
  };

  return (
    <>
      <Navbar />
      <StepBar current={3} />

      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg, #001f4d 0%, #003580 100%)", color: "#fff", padding: "24px 28px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <button type="button" onClick={() => router.back()} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.85)", cursor: "pointer", fontSize: 13, fontWeight: 700,
            marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
            padding: "7px 14px", borderRadius: 8, transition: "all 0.2s",
            fontFamily: "'Poppins', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            <IconArrowLeft /> Back to restaurant
          </button>
          <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif" }}>
            Enter your details
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6 }}>
            Complete your reservation at <strong style={{ color: "#febb02" }}>{restaurantName}</strong>
          </p>
        </div>
      </div>

      <main className="rrs-page">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Contact info */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#003580" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Contact information</h2>
                  <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Confirmation will be sent to your email</p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Poppins', sans-serif" }}>Full Name</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("name"), transition: "color 0.2s", pointerEvents: "none" }}><IconUser /></div>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ahmed Khan"
                      style={inputBase("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  </div>
                  <ErrorMsg msg={errors.name} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Poppins', sans-serif" }}>Phone Number</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("phone"), transition: "color 0.2s", pointerEvents: "none" }}><IconPhone /></div>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="03xx-xxxxxxx"
                      style={inputBase("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                  </div>
                  <ErrorMsg msg={errors.phone} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "'Poppins', sans-serif" }}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("email"), transition: "color 0.2s", pointerEvents: "none" }}><IconMail /></div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                      style={inputBase("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  </div>
                  <ErrorMsg msg={errors.email} />
                </div>
              </div>
            </div>

            {/* Special requests */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fffbeb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Special requests</h2>
                  <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>We&apos;ll do our best to accommodate</p>
                </div>
              </div>
              <textarea rows={4} value={specialRequest} onChange={e => setSpecialRequest(e.target.value)}
                placeholder="e.g. Window seat, birthday celebration, halal-only, wheelchair access..."
                style={{
                  width: "100%", padding: "13px 16px", border: "2px solid #e2e8f0", borderRadius: 10,
                  fontSize: 14, color: "#1a1a2e", background: "#f8fafc", outline: "none",
                  resize: "vertical", fontFamily: "'Nunito Sans', sans-serif", transition: "all 0.2s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#003580"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(0,53,128,0.08)"; e.currentTarget.style.background = "#fff"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#f8fafc"; }}
              />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {["Halal only", "Window seat", "Birthday celebration", "Wheelchair accessible", "High chair needed"].map(tag => (
                  <button key={tag} type="button" onClick={() => setSpecialRequest(p => p ? `${p}, ${tag}` : tag)}
                    style={{
                      background: "#f0f4ff", color: "#003580", border: "1.5px solid #c7d7f5",
                      borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 700,
                      cursor: "pointer", transition: "all 0.2s", fontFamily: "'Poppins', sans-serif",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#003580"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#f0f4ff"; e.currentTarget.style.color = "#003580"; }}
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Cancellation policy */}
            <div style={sectionCard}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Cancellation policy</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { icon: <IconCheck />, title: "Free cancellation", desc: "Cancel up to 2 hours before your reservation for a full refund.", bg: "#f0fdf4", border: "#bbf7d0" },
                  { icon: <IconWarn />, title: "Late cancellation fee", desc: "Cancellations within 2 hours may incur a 25% deposit retention.", bg: "#fffbeb", border: "#fde68a" },
                  { icon: <IconX />, title: "No-show policy", desc: "No-shows forfeit the full deposit amount.", bg: "#fff1f2", border: "#fecdd3" },
                ].map((item, i) => (
                  <div key={item.title} style={{
                    display: "flex", gap: 14, padding: "16px",
                    background: item.bg, borderRadius: 10,
                    border: `1px solid ${item.border}`,
                    marginBottom: i < 2 ? 10 : 0,
                  }}>
                    <div style={{ marginTop: 2, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 3 }}>{item.title}</div>
                      <div style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ ...sectionCard, padding: "24px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Booking summary</h2>

              <div style={{
                background: "linear-gradient(135deg, #001f4d 0%, #003580 100%)",
                borderRadius: 12, padding: "16px 18px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(254,187,2,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IconUtensils />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "#fff", fontFamily: "'Poppins', sans-serif" }}>{restaurantName}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{draft.location || "Pakistan"}</div>
                </div>
              </div>

              {[
                { icon: <IconCalendar />, label: "Date", val: draft.date || "—" },
                { icon: <IconClock />, label: "Time", val: draft.time || "—" },
                { icon: <IconUsers />, label: "Guests", val: draft.partySize ? `${draft.partySize} guest${draft.partySize > 1 ? "s" : ""}` : "—" },
                { icon: <IconUtensils />, label: "Cuisine", val: draft.cuisine || "—" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ color: "#94a3b8", flexShrink: 0 }}>{row.icon}</div>
                  <span style={{ color: "#94a3b8", fontSize: 13, flex: 1, fontWeight: 600 }}>{row.label}</span>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>{row.val}</span>
                </div>
              ))}

              <div style={{ marginTop: 18, background: "#f8fafc", borderRadius: 10, padding: "14px 16px", border: "1px solid #e2e8f0" }}>
                {[
                  { label: "Refundable deposit", val: "Rs 500", valColor: "#1a1a2e" },
                  { label: "Booking fee", val: "Free", valColor: "#10b981" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{r.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: r.valColor }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "#e2e8f0", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>Due now</span>
                  <span style={{ fontWeight: 800, fontSize: 16, color: "#003580" }}>Rs 500</span>
                </div>
              </div>

              <button type="button" onClick={onContinue} style={{
                width: "100%", marginTop: 18, padding: "14px",
                background: "linear-gradient(135deg, #febb02 0%, #fcc437 100%)",
                color: "#001f4d", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: "pointer",
                transition: "all 0.25s", fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 4px 16px rgba(254,187,2,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(254,187,2,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(254,187,2,0.35)"; }}
              >
                Continue to payment <IconArrowRight />
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
                <div style={{ color: "#94a3b8" }}><IconLock /></div>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Secure booking — SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
