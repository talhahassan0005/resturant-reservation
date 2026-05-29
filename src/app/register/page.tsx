"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters required";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "You must accept the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/"); }, 1800);
  };

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthMeta = [
    { label: "", color: "" },
    { label: "Weak", color: "#ef4444" },
    { label: "Fair", color: "#f59e0b" },
    { label: "Good", color: "#10b981" },
    { label: "Strong", color: "#059669" },
  ][strength];

  const inputStyle = (field: string, extraPaddingRight = false) => ({
    width: "100%",
    padding: `13px 16px 13px 46px`,
    paddingRight: extraPaddingRight ? "46px" : "16px",
    border: `2px solid ${errors[field] ? "#ef4444" : focused === field ? "#003580" : "#e2e8f0"}`,
    borderRadius: 12,
    fontSize: 14,
    color: "#1a1a2e",
    background: focused === field ? "#fff" : "#f8fafc",
    outline: "none",
    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 500,
    boxShadow: focused === field ? "0 0 0 4px rgba(0,53,128,0.08)" : errors[field] ? "0 0 0 4px rgba(239,68,68,0.08)" : "none",
  });

  const iconColor = (field: string) => focused === field ? "#003580" : "#94a3b8";

  const ErrorMsg = ({ msg }: { msg?: string }) => msg ? (
    <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>{msg}</span>
    </div>
  ) : null;

  const EyeBtn = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button type="button" onClick={toggle} style={{
      position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
      background: "none", border: "none", cursor: "pointer", padding: 4,
      color: "#94a3b8", transition: "color 0.2s", display: "flex", alignItems: "center",
    }}
      onMouseEnter={e => e.currentTarget.style.color = "#003580"}
      onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
    >
      {show
        ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      }
    </button>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Nunito Sans', sans-serif" }}>

      {/* Left panel */}
      <div style={{
        flex: "0 0 40%",
        background: "linear-gradient(145deg, #001f4d 0%, #003580 40%, #0055b3 100%)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: "48px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 380, height: 380, borderRadius: "50%", background: "rgba(254,187,2,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div onClick={() => router.push("/")} style={{ cursor: "pointer", display: "inline-block" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
            Table<span style={{ color: "#febb02" }}>Now</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 500 }}>Restaurant Reservations</div>
        </div>

        <div>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(254,187,2,0.15)", border: "1.5px solid rgba(254,187,2,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#febb02" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="#febb02" strokeWidth="2"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 16px", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>
            Join thousands of<br />food lovers
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0, maxWidth: 300 }}>
            Get access to exclusive restaurant deals, priority bookings, and personalized recommendations.
          </p>

          {/* Benefits */}
          <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { title: "Instant Confirmation", desc: "Get real-time booking confirmations" },
              { title: "Exclusive Member Deals", desc: "Save up to 30% on select restaurants" },
              { title: "Priority Reservations", desc: "Skip the queue at top restaurants" },
            ].map(b => (
              <div key={b.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(254,187,2,0.15)", border: "1px solid rgba(254,187,2,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#febb02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{b.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic", margin: 0 }}>
            &ldquo;Signed up in 30 seconds. Best decision for a foodie!&rdquo;
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 8, fontWeight: 700 }}>— Bilal R., Karachi</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "40px 40px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>

          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a2e", margin: "0 0 8px", fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.3px" }}>
              Create your account
            </h1>
            <p style={{ fontSize: 15, color: "#6b7280", margin: 0, fontWeight: 500 }}>
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7, fontFamily: "'Poppins', sans-serif" }}>Full Name</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: iconColor("name"), transition: "color 0.2s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <input type="text" value={form.name} onChange={set("name")} placeholder="Ahmed Khan"
                  style={inputStyle("name") as React.CSSProperties}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
              </div>
              <ErrorMsg msg={errors.name} />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7, fontFamily: "'Poppins', sans-serif" }}>Email Address</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: iconColor("email"), transition: "color 0.2s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"
                  style={inputStyle("email") as React.CSSProperties}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
              </div>
              <ErrorMsg msg={errors.email} />
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7, fontFamily: "'Poppins', sans-serif" }}>Phone Number</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: iconColor("phone"), transition: "color 0.2s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <input type="tel" value={form.phone} onChange={set("phone")} placeholder="03xx-xxxxxxx"
                  style={inputStyle("phone") as React.CSSProperties}
                  onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
              </div>
              <ErrorMsg msg={errors.phone} />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7, fontFamily: "'Poppins', sans-serif" }}>Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: iconColor("password"), transition: "color 0.2s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input type={showPass ? "text" : "password"} value={form.password} onChange={set("password")} placeholder="Min. 8 characters"
                  style={{ ...(inputStyle("password") as React.CSSProperties), paddingRight: "46px" }}
                  onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} />
                <EyeBtn show={showPass} toggle={() => setShowPass(!showPass)} />
              </div>
              {form.password && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 4,
                        background: i <= strength ? strengthMeta.color : "#e2e8f0",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: strengthMeta.color }}>{strengthMeta.label} password</span>
                </div>
              )}
              <ErrorMsg msg={errors.password} />
            </div>

            {/* Confirm password */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 7, fontFamily: "'Poppins', sans-serif" }}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: iconColor("confirm"), transition: "color 0.2s" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <input type={showConfirm ? "text" : "password"} value={form.confirm} onChange={set("confirm")} placeholder="Re-enter your password"
                  style={{ ...(inputStyle("confirm") as React.CSSProperties), paddingRight: "46px" }}
                  onFocus={() => setFocused("confirm")} onBlur={() => setFocused(null)} />
                <EyeBtn show={showConfirm} toggle={() => setShowConfirm(!showConfirm)} />
              </div>
              <ErrorMsg msg={errors.confirm} />
            </div>

            {/* Terms */}
            <div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                  border: `2px solid ${errors.agreed ? "#ef4444" : agreed ? "#003580" : "#d1d5db"}`,
                  background: agreed ? "#003580" : "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }} onClick={() => setAgreed(!agreed)}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize: 13, color: "#374151", fontWeight: 500, lineHeight: 1.5 }}>
                  I agree to the{" "}
                  <span style={{ color: "#003580", fontWeight: 700, cursor: "pointer" }}>Terms of Service</span>
                  {" "}and{" "}
                  <span style={{ color: "#003580", fontWeight: 700, cursor: "pointer" }}>Privacy Policy</span>
                </span>
              </label>
              <ErrorMsg msg={errors.agreed} />
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "#94a3b8" : "linear-gradient(135deg, #febb02 0%, #fcc437 100%)",
                color: loading ? "#fff" : "#001f4d",
                border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.3px",
                boxShadow: loading ? "none" : "0 4px 20px rgba(254,187,2,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(254,187,2,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(254,187,2,0.4)"; }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Free Account
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "#6b7280", fontWeight: 500 }}>
            Already have an account?{" "}
            <button type="button" onClick={() => router.push("/login")} style={{
              background: "none", border: "none", color: "#003580", fontWeight: 800,
              cursor: "pointer", fontSize: 14, fontFamily: "'Poppins', sans-serif", padding: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Sign in
            </button>
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 28, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            {[
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text: "SSL Secured" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, text: "No spam" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: "Free forever" },
            ].map(b => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {b.icon}
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
