"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/"); }, 1600);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: `2px solid ${errors[field] ? "#ef4444" : focused === field ? "#003580" : "#e2e8f0"}`,
    borderRadius: 12,
    fontSize: 15,
    color: "#1a1a2e",
    background: focused === field ? "#fff" : "#f8fafc",
    outline: "none",
    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 500,
    boxShadow: focused === field ? "0 0 0 4px rgba(0,53,128,0.08)" : errors[field] ? "0 0 0 4px rgba(239,68,68,0.08)" : "none",
  });

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      fontFamily: "'Nunito Sans', sans-serif",
    }}>
      {/* Left panel */}
      <div style={{
        flex: "0 0 45%",
        background: "linear-gradient(145deg, #001f4d 0%, #003580 40%, #0055b3 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "rgba(254,187,2,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "40%", left: "60%", width: 200, height: 200, borderRadius: "50%", background: "rgba(254,187,2,0.05)", pointerEvents: "none" }} />

        {/* Logo */}
        <div onClick={() => router.push("/")} style={{ cursor: "pointer", display: "inline-block" }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px" }}>
            Table<span style={{ color: "#febb02" }}>Now</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, fontWeight: 500 }}>Restaurant Reservations</div>
        </div>

        {/* Center content */}
        <div>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: "rgba(254,187,2,0.15)",
            border: "1.5px solid rgba(254,187,2,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 28,
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#febb02"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 0 16px", fontFamily: "'Poppins', sans-serif", lineHeight: 1.2 }}>
            Book the best<br />tables in town
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0, maxWidth: 320 }}>
            Discover top-rated restaurants, make instant reservations, and enjoy exclusive member deals.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {[{ val: "500+", label: "Restaurants" }, { val: "50K+", label: "Bookings" }, { val: "4.9", label: "Rating" }].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#febb02", fontFamily: "'Poppins', sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontStyle: "italic", margin: 0 }}>
            &ldquo;TableNow made dining out effortless. Best app for foodies!&rdquo;
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 8, fontWeight: 700 }}>— Ayesha M., Lahore</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "48px 40px",
      }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {/* Header */}
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", margin: "0 0 8px", fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.3px" }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 15, color: "#6b7280", margin: 0, fontWeight: 500 }}>
              Sign in to your TableNow account
            </p>
          </div>

          {/* Social login */}
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Google", icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
              { label: "Facebook", icon: <svg width="18" height="18" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg> },
            ].map(s => (
              <button key={s.label} type="button" style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: 12, background: "#fff",
                fontSize: 14, fontWeight: 700, color: "#1a1a2e",
                cursor: "pointer", transition: "all 0.2s",
                fontFamily: "'Poppins', sans-serif",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#003580"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,53,128,0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
            <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.06em" }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Email field */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8, fontFamily: "'Poppins', sans-serif", letterSpacing: "0.01em" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: focused === "email" ? "#003580" : "#94a3b8", transition: "color 0.2s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle("email") as React.CSSProperties}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              {errors.email && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  <p style={{ color: "#ef4444", fontSize: 12, margin: 0, fontWeight: 600 }}>{errors.email}</p>
                </div>
              )}
            </div>

            {/* Password field */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", fontFamily: "'Poppins', sans-serif", letterSpacing: "0.01em" }}>
                  Password
                </label>
                <button type="button" style={{ background: "none", border: "none", fontSize: 12, color: "#003580", fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif", padding: 0, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: focused === "password" ? "#003580" : "#94a3b8", transition: "color 0.2s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ ...(inputStyle("password") as React.CSSProperties), paddingRight: 48 }}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused(null)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 4,
                  color: "#94a3b8", transition: "color 0.2s", display: "flex", alignItems: "center",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "#003580"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  {showPass
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {errors.password && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  <p style={{ color: "#ef4444", fontSize: 12, margin: 0, fontWeight: 600 }}>{errors.password}</p>
                </div>
              )}
            </div>

            {/* Remember me */}
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <div style={{
                width: 18, height: 18, borderRadius: 5,
                border: `2px solid ${remember ? "#003580" : "#d1d5db"}`,
                background: remember ? "#003580" : "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s", flexShrink: 0,
              }} onClick={() => setRemember(!remember)}>
                {remember && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize: 14, color: "#374151", fontWeight: 600 }}>Keep me signed in</span>
            </label>

            {/* Submit button */}
            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "#94a3b8" : "linear-gradient(135deg, #003580 0%, #0055b3 100%)",
                color: "#fff", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "0.3px",
                boxShadow: loading ? "none" : "0 4px 20px rgba(0,53,128,0.35)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,53,128,0.45)"; } }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = loading ? "none" : "0 4px 20px rgba(0,53,128,0.35)"; }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Register link */}
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#6b7280", fontWeight: 500 }}>
            Don&apos;t have an account?{" "}
            <button type="button" onClick={() => router.push("/register")} style={{
              background: "none", border: "none", color: "#003580", fontWeight: 800,
              cursor: "pointer", fontSize: 14, fontFamily: "'Poppins', sans-serif",
              padding: 0, transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              Create free account
            </button>
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 32, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
            {[
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, text: "SSL Secured" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>, text: "No spam" },
              { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, text: "Privacy protected" },
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
        @media (max-width: 768px) {
          .login-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
