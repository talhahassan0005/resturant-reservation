"use client";

import { useState } from "react";

const iStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "#fff" };
const lStyle: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid #f1f5f9" }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111827" }}>{title}</h2>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: "#6b7280" }}>{desc}</p>
      </div>
      <div style={{ padding: "20px 22px" }}>{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 42, height: 22, borderRadius: 11, background: checked ? "#003580" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 23 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

export default function SettingsPage() {
  const [toast, setToast] = useState("");
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  /* General */
  const [siteName,  setSiteName]  = useState("TableNow");
  const [siteEmail, setSiteEmail] = useState("admin@tablenow.pk");
  const [sitePhone, setSitePhone] = useState("+92 300 0000000");
  const [currency,  setCurrency]  = useState("PKR");
  const [timezone,  setTimezone]  = useState("Asia/Karachi");
  const [language,  setLanguage]  = useState("English");

  /* Booking Rules */
  const [maxGuests,      setMaxGuests]      = useState("20");
  const [cancelWindow,   setCancelWindow]   = useState("2");
  const [advanceBooking, setAdvanceBooking] = useState("30");
  const [autoConfirm,    setAutoConfirm]    = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#111827", color: "#fff", padding: "11px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, zIndex: 2000, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#111827" }}>Settings</h1>
        <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: 14 }}>Manage your platform configuration</p>
      </div>

      {/* General */}
      <Section title="General Settings" desc="Basic platform information and regional preferences">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={lStyle}>Platform Name</label>
            <input style={iStyle} value={siteName} onChange={e => setSiteName(e.target.value)} />
          </div>
          <div>
            <label style={lStyle}>Contact Email</label>
            <input style={iStyle} type="email" value={siteEmail} onChange={e => setSiteEmail(e.target.value)} />
          </div>
          <div>
            <label style={lStyle}>Contact Phone</label>
            <input style={iStyle} value={sitePhone} onChange={e => setSitePhone(e.target.value)} />
          </div>
          <div>
            <label style={lStyle}>Currency</label>
            <select style={iStyle} value={currency} onChange={e => setCurrency(e.target.value)}>
              <option value="PKR">PKR — Pakistani Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="AED">AED — UAE Dirham</option>
            </select>
          </div>
          <div>
            <label style={lStyle}>Timezone</label>
            <select style={iStyle} value={timezone} onChange={e => setTimezone(e.target.value)}>
              <option value="Asia/Karachi">Asia/Karachi (PKT +5:00)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label style={lStyle}>Language</label>
            <select style={iStyle} value={language} onChange={e => setLanguage(e.target.value)}>
              <option>English</option>
              <option>Urdu</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={() => showToast("General settings saved.")} style={{ padding: "9px 22px", borderRadius: 7, border: "none", background: "#003580", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Save Changes
          </button>
        </div>
      </Section>

      {/* Booking Rules */}
      <Section title="Booking Rules" desc="Configure reservation policies and limits">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={lStyle}>Max Guests per Booking</label>
            <input style={iStyle} type="number" min={1} max={100} value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
          </div>
          <div>
            <label style={lStyle}>Cancellation Window (hrs)</label>
            <input style={iStyle} type="number" min={0} max={72} value={cancelWindow} onChange={e => setCancelWindow(e.target.value)} />
          </div>
          <div>
            <label style={lStyle}>Max Advance Booking (days)</label>
            <input style={iStyle} type="number" min={1} max={365} value={advanceBooking} onChange={e => setAdvanceBooking(e.target.value)} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid #f1f5f9", marginBottom: 16 }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" }}>Auto-confirm Bookings</p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>Automatically confirm new bookings without manual review</p>
          </div>
          <Toggle checked={autoConfirm} onChange={() => setAutoConfirm(p => !p)} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={() => showToast("Booking rules saved.")} style={{ padding: "9px 22px", borderRadius: 7, border: "none", background: "#003580", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            Save Changes
          </button>
        </div>
      </Section>

      {/* Danger Zone */}
      <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #fca5a5", overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid #fca5a5", background: "#fef2f2" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#dc2626" }}>Danger Zone</h2>
          <p style={{ margin: "3px 0 0", fontSize: 13, color: "#6b7280" }}>These actions are irreversible. Proceed with caution.</p>
        </div>
        <div style={{ padding: "4px 22px" }}>
          {[
            { label: "Clear All Bookings",  desc: "Permanently delete all booking records",     btn: "Clear Bookings"  },
            { label: "Reset Analytics",     desc: "Wipe all analytics and reporting history",   btn: "Reset Analytics" },
            { label: "Delete All Users",    desc: "Remove all user accounts from the platform", btn: "Delete Users"    },
          ].map((a, i) => (
            <div key={a.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: i < 2 ? "1px solid #fef2f2" : "none", gap: 16 }}>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111827" }}>{a.label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9ca3af" }}>{a.desc}</p>
              </div>
              <button
                onClick={() => showToast(`${a.btn} is disabled in demo mode.`)}
                style={{ padding: "7px 16px", borderRadius: 7, border: "1px solid #dc2626", background: "#fff", color: "#dc2626", fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {a.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
