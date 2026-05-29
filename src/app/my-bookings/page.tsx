"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState } from "@/store/store";
import type { SavedBooking } from "@/store/slices/reservationsSlice";
import { cancelBooking, modifyBooking } from "@/store/slices/reservationsSlice";
import Navbar from "@/components/Navbar";

const STATUS: Record<string, { bg: string; color: string; dot: string; label: string }> = {
  confirmed: { bg: "#f0fdf4", color: "#16a34a", dot: "#22c55e", label: "Confirmed" },
  cancelled:  { bg: "#fff1f2", color: "#dc2626", dot: "#ef4444", label: "Cancelled" },
  modified:   { bg: "#eff6ff", color: "#2563eb", dot: "#3b82f6", label: "Modified" },
  "no-show":  { bg: "#fff7ed", color: "#ea580c", dot: "#f97316", label: "No-show" },
};

const CUISINE_INITIALS: Record<string, string> = {
  r1: "BB", r2: "SR", r3: "SS", r4: "LD", r5: "CM", r6: "RG",
};
const CUISINE_COLORS: Record<string, string> = {
  r1: "#f59e0b", r2: "#10b981", r3: "#6366f1", r4: "#ef4444", r5: "#ec4899", r6: "#0ea5e9",
};

function isFuture(date: string) {
  return new Date(date) >= new Date(new Date().toDateString());
}
function isWithinCancelWindow(date: string, time: string) {
  if (!date || !time) return false;
  return (new Date(`${date}T${time}`).getTime() - Date.now()) / 3600000 < 2;
}

const IcoCalendar = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoClock   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoUsers   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoPin     = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IcoEdit    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoX       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>;
const IcoWarn    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IcoSearch  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;

export default function MyBookingsPage() {
  const router   = useRouter();
  const dispatch = useDispatch();
  const bookings = useSelector((s: RootState) => s.reservations.bookings);

  const [tab, setTab]               = useState<"upcoming"|"past">("upcoming");
  const [cancelModal, setCancelModal] = useState<SavedBooking|null>(null);
  const [modifyModal, setModifyModal] = useState<SavedBooking|null>(null);
  const [modifyForm, setModifyForm]   = useState({ date:"", time:"", partySize:2 });
  const [warn, setWarn]               = useState<string|null>(null);
  const [search, setSearch]           = useState("");

  const upcoming = bookings.filter(b => b.status !== "cancelled" && isFuture(b.date));
  const past      = bookings.filter(b => b.status === "cancelled" || !isFuture(b.date));
  const list      = (tab === "upcoming" ? upcoming : past)
    .filter(b => !search || b.restaurantName.toLowerCase().includes(search.toLowerCase()));

  const onCancelClick = (b: SavedBooking) => {
    if (isWithinCancelWindow(b.date, b.time)) {
      setWarn(`Booking #${b.ref} is within the 2-hour window. Please contact the restaurant directly.`);
    } else { setCancelModal(b); }
  };

  const F = { fontFamily: "'Poppins', sans-serif" };

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg,#001f4d 0%,#003580 100%)", padding: "36px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <h1 style={{ ...F, fontSize:"clamp(22px,3vw,30px)", fontWeight:800, color:"#fff", margin:0 }}>My Bookings</h1>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:14, marginTop:6 }}>Manage your reservations — modify or cancel anytime</p>
            </div>
            <button onClick={() => router.push("/")} style={{ ...F, background:"rgba(255,255,255,0.1)", border:"1.5px solid rgba(255,255,255,0.25)", color:"#fff", padding:"10px 22px", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer" }}>
              + New Booking
            </button>
          </div>

          {/* Summary chips */}
          <div style={{ display:"flex", gap:12, marginTop:24, flexWrap:"wrap" }}>
            {[
              { label:"Total", val: bookings.length, color:"rgba(255,255,255,0.15)", text:"#fff" },
              { label:"Upcoming", val: upcoming.length, color:"rgba(34,197,94,0.2)", text:"#86efac" },
              { label:"Past / Cancelled", val: past.length, color:"rgba(239,68,68,0.15)", text:"#fca5a5" },
            ].map(c => (
              <div key={c.label} style={{ background:c.color, border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, padding:"8px 18px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ ...F, fontSize:20, fontWeight:800, color:c.text }}>{c.val}</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)", fontWeight:600 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px 60px" }}>

        {/* Toolbar */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, marginBottom:24, flexWrap:"wrap" }}>
          {/* Tabs */}
          <div style={{ display:"flex", background:"#f1f5f9", borderRadius:12, padding:4, gap:2 }}>
            {(["upcoming","past"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ ...F, padding:"9px 24px", borderRadius:9, border:"none", cursor:"pointer", fontWeight:700, fontSize:13,
                background: tab===t ? "#fff" : "transparent",
                color: tab===t ? "#003580" : "#6b7280",
                boxShadow: tab===t ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                transition:"all 0.2s",
              }}>
                {t==="upcoming" ? `Upcoming (${upcoming.length})` : `Past & Cancelled (${past.length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position:"relative", flex:"0 0 260px" }}>
            <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}><IcoSearch /></div>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search restaurant..."
              style={{ width:"100%", padding:"10px 14px 10px 38px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:13, fontFamily:"'Nunito Sans',sans-serif", outline:"none", background:"#fff" }} />
          </div>
        </div>

        {/* Warning banner */}
        {warn && (
          <div style={{ background:"#fff7ed", border:"1.5px solid #fed7aa", borderRadius:12, padding:"14px 18px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <IcoWarn />
              <p style={{ margin:0, fontSize:13, color:"#92400e", fontWeight:600 }}>{warn}</p>
            </div>
            <button onClick={() => setWarn(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#92400e", fontSize:20, lineHeight:1 }}>×</button>
          </div>
        )}

        {/* Empty state */}
        {list.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 20px", background:"#fff", borderRadius:16, border:"1px solid #e2e8f0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <h3 style={{ ...F, color:"#1a1a2e", marginBottom:8 }}>{tab==="upcoming" ? "No upcoming bookings" : "No past bookings"}</h3>
            <p style={{ color:"#94a3b8", marginBottom:24, fontSize:14 }}>{tab==="upcoming" ? "Ready to book your next table?" : "Your booking history will appear here."}</p>
            {tab==="upcoming" && (
              <button onClick={() => router.push("/")} style={{ ...F, padding:"12px 28px", background:"linear-gradient(135deg,#003580,#0055b3)", color:"#fff", border:"none", borderRadius:12, fontSize:14, fontWeight:800, cursor:"pointer" }}>
                Find a restaurant
              </button>
            )}
          </div>
        )}

        {/* Booking cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {list.map(b => {
            const st = STATUS[b.status] ?? STATUS.confirmed;
            const canAct = b.status !== "cancelled" && isFuture(b.date);
            const initials = CUISINE_INITIALS[b.restaurantId] ?? b.restaurantName.slice(0,2).toUpperCase();
            const avatarColor = CUISINE_COLORS[b.restaurantId] ?? "#003580";

            return (
              <div key={b.id} style={{ background:"#fff", borderRadius:16, border:"1px solid #e8edf5", boxShadow:"0 2px 12px rgba(0,0,0,0.05)", overflow:"hidden", transition:"box-shadow 0.2s" }}>
                {/* Top colored accent bar */}
                <div style={{ height:3, background:`linear-gradient(90deg,${avatarColor},${avatarColor}88)` }} />

                <div style={{ padding:"22px 24px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>

                    {/* Left */}
                    <div style={{ display:"flex", gap:16, alignItems:"flex-start", flex:1, minWidth:0 }}>
                      {/* Avatar */}
                      <div style={{ width:52, height:52, borderRadius:14, background:`${avatarColor}18`, border:`2px solid ${avatarColor}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ ...F, fontSize:14, fontWeight:800, color:avatarColor }}>{initials}</span>
                      </div>

                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ ...F, fontWeight:800, fontSize:17, color:"#1a1a2e" }}>{b.restaurantName}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:"#6b7280", marginTop:3, fontWeight:600 }}>
                          <IcoPin /> {b.location} <span style={{ color:"#d1d5db" }}>·</span> {b.cuisine}
                        </div>

                        {/* Details row */}
                        <div style={{ display:"flex", gap:20, marginTop:12, flexWrap:"wrap" }}>
                          {[
                            { ico:<IcoCalendar />, val:b.date },
                            { ico:<IcoClock />,    val:b.time },
                            { ico:<IcoUsers />,    val:`${b.partySize} guest${b.partySize>1?"s":""}` },
                          ].map((r,i) => (
                            <div key={i} style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, color:"#374151", fontWeight:600 }}>
                              <span style={{ color:"#94a3b8" }}>{r.ico}</span> {r.val}
                            </div>
                          ))}
                        </div>

                        {b.specialRequest && (
                          <div style={{ marginTop:10, fontSize:12, color:"#6b7280", background:"#f8fafc", borderRadius:8, padding:"6px 12px", display:"inline-block", border:"1px solid #e2e8f0" }}>
                            {b.specialRequest}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right */}
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:st.bg, borderRadius:20, padding:"5px 14px" }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:st.dot }} />
                        <span style={{ ...F, fontSize:12, fontWeight:800, color:st.color }}>{st.label}</span>
                      </div>
                      <div style={{ fontSize:12, color:"#94a3b8", marginTop:8, fontWeight:600 }}>Ref: #{b.ref}</div>
                      <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Deposit: Rs {b.depositPaid}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  {canAct && (
                    <div style={{ display:"flex", gap:10, marginTop:18, paddingTop:16, borderTop:"1px solid #f1f5f9" }}>
                      <button onClick={() => { setModifyForm({date:b.date,time:b.time,partySize:b.partySize}); setModifyModal(b); }}
                        style={{ ...F, display:"flex", alignItems:"center", gap:7, padding:"9px 20px", background:"#eff6ff", color:"#003580", border:"1.5px solid #bfdbfe", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#003580";e.currentTarget.style.color="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#eff6ff";e.currentTarget.style.color="#003580";}}>
                        <IcoEdit /> Modify
                      </button>
                      <button onClick={() => onCancelClick(b)}
                        style={{ ...F, display:"flex", alignItems:"center", gap:7, padding:"9px 20px", background:"#fff1f2", color:"#dc2626", border:"1.5px solid #fecdd3", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", transition:"all 0.2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background="#dc2626";e.currentTarget.style.color="#fff";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fff1f2";e.currentTarget.style.color="#dc2626";}}>
                        <IcoX /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cancel modal */}
      {cancelModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }} onClick={() => setCancelModal(null)}>
          <div style={{ background:"#fff", borderRadius:20, padding:"36px", maxWidth:420, width:"100%", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }} onClick={e=>e.stopPropagation()}>
            <div style={{ width:56, height:56, borderRadius:"50%", background:"#fff1f2", border:"2px solid #fecdd3", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
              <IcoX />
            </div>
            <h2 style={{ ...F, textAlign:"center", color:"#1a1a2e", marginBottom:10, fontSize:20 }}>Cancel booking?</h2>
            <p style={{ textAlign:"center", color:"#6b7280", fontSize:14, marginBottom:6 }}><strong>{cancelModal.restaurantName}</strong></p>
            <p style={{ textAlign:"center", color:"#6b7280", fontSize:13, marginBottom:28 }}>{cancelModal.date} at {cancelModal.time} · Rs {cancelModal.depositPaid} will be refunded.</p>
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => setCancelModal(null)} style={{ ...F, flex:1, padding:"12px", background:"#f8fafc", color:"#374151", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>Keep booking</button>
              <button onClick={() => { dispatch(cancelBooking(cancelModal.id)); setCancelModal(null); }} style={{ ...F, flex:1, padding:"12px", background:"#dc2626", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>Yes, cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modify modal */}
      {modifyModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 }} onClick={() => setModifyModal(null)}>
          <div style={{ background:"#fff", borderRadius:20, padding:"36px", maxWidth:440, width:"100%", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }} onClick={e=>e.stopPropagation()}>
            <h2 style={{ ...F, color:"#1a1a2e", marginBottom:4, fontSize:20 }}>Modify booking</h2>
            <p style={{ color:"#6b7280", fontSize:13, marginBottom:24 }}>{modifyModal.restaurantName} · #{modifyModal.ref}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:24 }}>
              {[
                { label:"New Date", type:"date", val:modifyForm.date, key:"date" },
                { label:"New Time", type:"time", val:modifyForm.time, key:"time" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ ...F, display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>{f.label}</label>
                  <input type={f.type} value={f.val} onChange={e => setModifyForm(p => ({...p,[f.key]:e.target.value}))}
                    style={{ width:"100%", padding:"12px 14px", border:"2px solid #e2e8f0", borderRadius:10, fontSize:14, outline:"none", fontFamily:"'Nunito Sans',sans-serif" }} />
                </div>
              ))}
              <div>
                <label style={{ ...F, display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6, textTransform:"uppercase" as const, letterSpacing:"0.06em" }}>Party Size</label>
                <select value={modifyForm.partySize} onChange={e => setModifyForm(p => ({...p,partySize:Number(e.target.value)}))}
                  style={{ width:"100%", padding:"12px 14px", border:"2px solid #e2e8f0", borderRadius:10, fontSize:14, outline:"none", background:"#fff", fontFamily:"'Nunito Sans',sans-serif", color:"#1a1a2e" }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} guest{n>1?"s":""}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={() => setModifyModal(null)} style={{ ...F, flex:1, padding:"12px", background:"#f8fafc", color:"#374151", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>Cancel</button>
              <button onClick={() => { dispatch(modifyBooking({id:modifyModal.id,...modifyForm})); setModifyModal(null); }} style={{ ...F, flex:1, padding:"12px", background:"linear-gradient(135deg,#003580,#0055b3)", color:"#fff", border:"none", borderRadius:10, fontSize:14, fontWeight:700, cursor:"pointer" }}>Save changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
