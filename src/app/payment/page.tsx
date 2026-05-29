"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { confirmBooking } from "@/store/slices/reservationsSlice";
import type { RootState } from "@/store/store";
import Navbar from "@/components/Navbar";
import StepBar from "@/components/StepBar";

const RESTAURANT_NAMES: Record<string, string> = {
  r1: "Brisket & Bowls", r2: "Spice Route", r3: "Sushi Station",
  r4: "Lahori Darbar", r5: "Casa Milano", r6: "The Rooftop Grill",
};

type PayMethod = "card" | "easypaisa" | "jazzcash";

const IconLock = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const IconCard = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IconMobile = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const IconShield = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IconArrowLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const IconSpin = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
const IconCalendar = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconClock = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IconUsers = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconUser = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const draft = useSelector((s: RootState) => s.reservations.draft);

  const [method, setMethod] = useState<PayMethod>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [processing, setProcessing] = useState(false);
  const [payFail, setPayFail] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);

  const restaurantName = RESTAURANT_NAMES[draft.restaurantId ?? ""] ?? "Restaurant";

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

  const validate = () => {
    const e: Record<string, string> = {};
    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) e.card = "Enter a valid 16-digit card number";
      if (expiry.length < 5) e.expiry = "Enter valid expiry (MM/YY)";
      if (cvv.length < 3) e.cvv = "Enter valid CVV";
      if (!cardName.trim()) e.cardName = "Cardholder name is required";
    } else {
      if (mobileNum.replace(/\D/g, "").length < 11) e.mobile = "Enter a valid mobile number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onPay = () => {
    if (!validate()) return;
    setProcessing(true); setPayFail(false);
    setTimeout(() => { setProcessing(false); dispatch(confirmBooking()); router.push("/confirm"); }, 2000);
  };

  const inputBase = (field: string, noPadLeft = false): React.CSSProperties => ({
    width: "100%", padding: noPadLeft ? "13px 16px" : "13px 16px 13px 44px",
    border: `2px solid ${errors[field] ? "#ef4444" : focused === field ? "#003580" : "#e2e8f0"}`,
    borderRadius: 10, fontSize: 14, color: "#1a1a2e",
    background: focused === field ? "#fff" : "#f8fafc",
    outline: "none", transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
    fontFamily: "'Nunito Sans', sans-serif", fontWeight: 500,
    boxShadow: focused === field ? "0 0 0 4px rgba(0,53,128,0.08)" : errors[field] ? "0 0 0 4px rgba(239,68,68,0.08)" : "none",
  });

  const iconColor = (f: string) => focused === f ? "#003580" : "#94a3b8";

  const ErrorMsg = ({ msg }: { msg?: string }) => msg ? (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>{msg}</span>
    </div>
  ) : null;

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 7, textTransform: "uppercase" as const, letterSpacing: "0.05em", fontFamily: "'Poppins', sans-serif" }}>
      {children}
    </label>
  );

  const sectionCard: React.CSSProperties = {
    background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)", padding: "28px",
  };

  const methods = [
    { id: "card" as PayMethod, label: "Credit / Debit Card", sub: "Visa, Mastercard, UnionPay", icon: <IconCard /> },
    { id: "easypaisa" as PayMethod, label: "Easypaisa", sub: "Mobile wallet", icon: <IconMobile /> },
    { id: "jazzcash" as PayMethod, label: "JazzCash", sub: "Mobile wallet", icon: <IconMobile /> },
  ];

  return (
    <>
      <Navbar />
      <StepBar current={4} />

      <div style={{ background: "linear-gradient(135deg, #001f4d 0%, #003580 100%)", color: "#fff", padding: "24px 28px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <button type="button" onClick={() => router.back()} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.85)", cursor: "pointer", fontSize: 13, fontWeight: 700,
            marginBottom: 14, display: "flex", alignItems: "center", gap: 8,
            padding: "7px 14px", borderRadius: 8, transition: "all 0.2s", fontFamily: "'Poppins', sans-serif",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
          >
            <IconArrowLeft /> Back to details
          </button>
          <h1 style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, margin: 0, fontFamily: "'Poppins', sans-serif" }}>Secure payment</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 6 }}>
            Complete your reservation at <strong style={{ color: "#febb02" }}>{restaurantName}</strong>
          </p>
        </div>
      </div>

      <main className="rrs-page">
        {payFail && (
          <div style={{ background: "#fff1f2", border: "1.5px solid #fecdd3", borderRadius: 12, padding: "16px 20px", marginBottom: 20, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 800, color: "#dc2626", fontSize: 14, fontFamily: "'Poppins', sans-serif" }}>Payment failed</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>Your card was declined. Please check your details or try another method.</div>
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

          {/* LEFT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* SSL badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 12, padding: "14px 18px" }}>
              <div style={{ flexShrink: 0 }}><IconShield /></div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#065f46", fontFamily: "'Poppins', sans-serif" }}>256-bit SSL Secured Payment</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Your payment information is fully encrypted and secure.</div>
              </div>
            </div>

            {/* Method select */}
            <div style={sectionCard}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Payment method</h2>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {methods.map(m => (
                  <button key={m.id} type="button" onClick={() => setMethod(m.id)} style={{
                    flex: "1 1 150px", padding: "16px",
                    border: `2px solid ${method === m.id ? "#003580" : "#e2e8f0"}`,
                    borderRadius: 12,
                    background: method === m.id ? "#eff6ff" : "#fff",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                    boxShadow: method === m.id ? "0 0 0 4px rgba(0,53,128,0.08)" : "none",
                  }}
                    onMouseEnter={e => { if (method !== m.id) { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.background = "#f8fafc"; } }}
                    onMouseLeave={e => { if (method !== m.id) { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; } }}
                  >
                    <div style={{ color: method === m.id ? "#003580" : "#94a3b8", marginBottom: 10, transition: "color 0.2s" }}>{m.icon}</div>
                    <div style={{ fontWeight: 800, fontSize: 13, color: method === m.id ? "#003580" : "#1a1a2e", fontFamily: "'Poppins', sans-serif" }}>{m.label}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{m.sub}</div>
                    {method === m.id && (
                      <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#003580" }} />
                        <span style={{ fontSize: 11, color: "#003580", fontWeight: 700 }}>Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Card fields */}
            {method === "card" && (
              <div style={sectionCard}>
                <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 22, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Card details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <Label>Cardholder name</Label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("cardName"), transition: "color 0.2s", pointerEvents: "none" }}><IconUser /></div>
                      <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Name as on card"
                        style={inputBase("cardName")} onFocus={() => setFocused("cardName")} onBlur={() => setFocused(null)} />
                    </div>
                    <ErrorMsg msg={errors.cardName} />
                  </div>

                  <div>
                    <Label>Card number</Label>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("card"), transition: "color 0.2s", pointerEvents: "none" }}><IconCard /></div>
                      <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19}
                        style={inputBase("card")} onFocus={() => setFocused("card")} onBlur={() => setFocused(null)} />
                    </div>
                    <ErrorMsg msg={errors.card} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <Label>Expiry date</Label>
                      <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5}
                        style={inputBase("expiry", true)} onFocus={() => setFocused("expiry")} onBlur={() => setFocused(null)} />
                      <ErrorMsg msg={errors.expiry} />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <input type="password" value={cvv} onChange={e => setCvv(e.target.value.slice(0, 4))} placeholder="•••"
                        style={inputBase("cvv", true)} onFocus={() => setFocused("cvv")} onBlur={() => setFocused(null)} />
                      <ErrorMsg msg={errors.cvv} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 20, alignItems: "center" }}>
                  <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600 }}>Accepted:</span>
                  {["Visa", "Mastercard", "UnionPay"].map(c => (
                    <span key={c} style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#374151" }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {(method === "easypaisa" || method === "jazzcash") && (
              <div style={sectionCard}>
                <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>
                  {method === "easypaisa" ? "Easypaisa" : "JazzCash"} details
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>Enter your registered mobile number. You&apos;ll receive a confirmation PIN.</p>
                <Label>Mobile number</Label>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: iconColor("mobile"), transition: "color 0.2s", pointerEvents: "none" }}><IconMobile /></div>
                  <input type="tel" value={mobileNum} onChange={e => setMobileNum(e.target.value)} placeholder="03xx-xxxxxxx"
                    style={inputBase("mobile")} onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)} />
                </div>
                <ErrorMsg msg={errors.mobile} />
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ ...sectionCard, padding: "24px" }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 18, fontFamily: "'Poppins', sans-serif", color: "#1a1a2e" }}>Order summary</h2>

              <div style={{ background: "#f8fafc", borderRadius: 12, padding: "16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e", marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>{restaurantName}</div>
                {[
                  { icon: <IconCalendar />, label: "Date", val: draft.date || "—" },
                  { icon: <IconClock />, label: "Time", val: draft.time || "—" },
                  { icon: <IconUsers />, label: "Guests", val: draft.partySize ? `${draft.partySize} guest${draft.partySize > 1 ? "s" : ""}` : "—" },
                  { icon: <IconUser />, label: "Name", val: draft.name || "—" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ color: "#94a3b8", flexShrink: 0 }}>{r.icon}</div>
                    <span style={{ color: "#94a3b8", fontSize: 13, flex: 1, fontWeight: 600 }}>{r.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#1a1a2e" }}>{r.val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "Refundable deposit", val: "Rs 500", color: "#1a1a2e" },
                  { label: "Taxes & charges", val: "Included", color: "#10b981" },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "#6b7280" }}>{r.label}</span>
                    <span style={{ fontWeight: 700, fontSize: 13, color: r.color }}>{r.val}</span>
                  </div>
                ))}
                <div style={{ height: 1, background: "#e2e8f0", margin: "4px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 800, fontSize: 15, color: "#1a1a2e" }}>Total due now</span>
                  <span style={{ fontWeight: 800, fontSize: 18, color: "#003580" }}>Rs 500</span>
                </div>
              </div>

              <button type="button" onClick={onPay} disabled={processing} style={{
                width: "100%", padding: "14px",
                background: processing ? "#94a3b8" : "linear-gradient(135deg, #febb02 0%, #fcc437 100%)",
                color: processing ? "#fff" : "#001f4d",
                border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: processing ? "not-allowed" : "pointer",
                transition: "all 0.25s", fontFamily: "'Poppins', sans-serif",
                boxShadow: processing ? "none" : "0 4px 16px rgba(254,187,2,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
                onMouseEnter={e => { if (!processing) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(254,187,2,0.45)"; } }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = processing ? "none" : "0 4px 16px rgba(254,187,2,0.35)"; }}
              >
                {processing ? <><IconSpin /> Processing...</> : <>Pay Rs 500 <IconArrowRight /></>}
              </button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12 }}>
                <IconLock size={12} color="#94a3b8" />
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>256-bit SSL secure payment</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
