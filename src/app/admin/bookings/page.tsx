"use client";

import { useState } from "react";
import "./bookings.css";

interface Booking {
  id: string; customer: string; email: string; restaurant: string;
  date: string; time: string; guests: number;
  status: "confirmed" | "pending" | "cancelled"; notes: string;
}
type FormData = Omit<Booking, "id">;

const RESTAURANTS = ["Brisket & Bowls","Spice Route","Sushi Station","Casa Milano","Lahori Darbar","The Rooftop Grill"];

const INIT: Booking[] = [
  { id: "b1", customer: "Ahmed Khan",   email: "ahmed@example.com",   restaurant: "Brisket & Bowls",  date: "2025-05-25", time: "7:30 PM", guests: 4, status: "confirmed", notes: "Window seating preferred" },
  { id: "b2", customer: "Fatima Ahmed", email: "fatima@example.com",  restaurant: "Spice Route",      date: "2025-05-26", time: "8:00 PM", guests: 2, status: "pending",   notes: "" },
  { id: "b3", customer: "Hassan Ali",   email: "hassan@example.com",  restaurant: "Sushi Station",    date: "2025-05-25", time: "6:00 PM", guests: 6, status: "confirmed", notes: "Birthday celebration" },
  { id: "b4", customer: "Zainab Malik", email: "zainab@example.com",  restaurant: "Casa Milano",      date: "2025-05-27", time: "9:00 PM", guests: 3, status: "cancelled", notes: "Cancelled by customer" },
  { id: "b5", customer: "Usman Tariq",  email: "usman@example.com",   restaurant: "Lahori Darbar",    date: "2025-05-28", time: "1:00 PM", guests: 5, status: "pending",   notes: "Outdoor table requested" },
  { id: "b6", customer: "Sara Qureshi", email: "sara@example.com",    restaurant: "The Rooftop Grill",date: "2025-05-29", time: "8:30 PM", guests: 2, status: "confirmed", notes: "Anniversary dinner" },
];
const EMPTY: FormData = { customer: "", email: "", restaurant: RESTAURANTS[0], date: "", time: "", guests: 2, status: "pending", notes: "" };

/* ── Icons ── */
const IcoEye  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoEdit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoDel  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoPlus = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcoX    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const iStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
const lStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" };

/* ── Modal — OUTSIDE main component ── */
function Modal({ title, onClose, onConfirm, confirmLabel, confirmColor, children }: {
  title: string; onClose: () => void; onConfirm?: () => void;
  confirmLabel?: string; confirmColor?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 500, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid #f1f5f9", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}><IcoX /></button>
        </div>
        <div style={{ padding: "20px 22px" }}>{children}</div>
        {onConfirm && (
          <div style={{ display: "flex", gap: 10, padding: "0 22px 20px", justifyContent: "flex-end" }}>
            <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Cancel</button>
            <button onClick={onConfirm} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: confirmColor || "#003580", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>{confirmLabel || "Confirm"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── BookingForm — OUTSIDE main component ── */
function BookingForm({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Customer Name</label>
          <input style={iStyle} value={form.customer} onChange={e => setForm(p => ({ ...p, customer: e.target.value }))} placeholder="Full name" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Email</label>
          <input style={iStyle} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" />
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Restaurant</label>
        <select style={iStyle} value={form.restaurant} onChange={e => setForm(p => ({ ...p, restaurant: e.target.value }))}>
          {RESTAURANTS.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Date</label>
          <input style={iStyle} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Time</label>
          <input style={iStyle} value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} placeholder="7:30 PM" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Guests</label>
          <input style={iStyle} type="number" min={1} max={20} value={form.guests} onChange={e => setForm(p => ({ ...p, guests: parseInt(e.target.value) }))} />
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Status</label>
        <select style={iStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Booking["status"] }))}>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Notes</label>
        <textarea style={{ ...iStyle, resize: "vertical", minHeight: 70 }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Special requests..." />
      </div>
    </>
  );
}

/* ── Main Page Component ── */
export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(INIT);
  const [filter, setFilter]     = useState("all");
  const [search, setSearch]     = useState("");
  const [showAdd, setShowAdd]       = useState(false);
  const [showView, setShowView]     = useState(false);
  const [showEdit, setShowEdit]     = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected]     = useState<Booking | null>(null);
  const [form, setForm]             = useState<FormData>(EMPTY);
  const [toast, setToast]           = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (filter === "all" || b.status === filter) &&
           (b.customer.toLowerCase().includes(q) || b.restaurant.toLowerCase().includes(q));
  });

  const stats = {
    total:     bookings.length,
    confirmed: bookings.filter(b => b.status === "confirmed").length,
    pending:   bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  const handleAdd = () => {
    setBookings(prev => [{ ...form, id: "b" + Date.now() }, ...prev]);
    setShowAdd(false); setForm(EMPTY);
    showToast("✅ Booking added successfully!");
  };

  const handleEdit = () => {
    setBookings(prev => prev.map(b => b.id === selected!.id ? { ...form, id: b.id } : b));
    setShowEdit(false);
    showToast("✅ Booking updated successfully!");
  };

  const handleDelete = () => {
    setBookings(prev => prev.filter(b => b.id !== selected!.id));
    setShowDelete(false);
    showToast("🗑️ Booking deleted.");
  };

  const openEdit = (b: Booking) => {
    setSelected(b);
    setForm({ customer: b.customer, email: b.email, restaurant: b.restaurant, date: b.date, time: b.time, guests: b.guests, status: b.status, notes: b.notes });
    setShowEdit(true);
  };

  return (
    <div className="bookings-page">
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#1a1a2e", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 2000, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1>Booking Management</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>{bookings.length} total bookings</p>
        </div>
        <button className="btn-add-restaurant" style={{ display: "flex", alignItems: "center", gap: 7 }} onClick={() => { setForm(EMPTY); setShowAdd(true); }}>
          <IcoPlus /> Add Booking
        </button>
      </div>

      <div className="booking-stats">
        {[
          { label: "Total",     val: stats.total,     cls: "",          filter: "all" },
          { label: "Confirmed", val: stats.confirmed, cls: "confirmed", filter: "confirmed" },
          { label: "Pending",   val: stats.pending,   cls: "pending",   filter: "pending" },
          { label: "Cancelled", val: stats.cancelled, cls: "cancelled", filter: "cancelled" },
        ].map(s => (
          <div key={s.label} className={`booking-stat-card ${s.cls}`} style={{ cursor: "pointer" }} onClick={() => setFilter(s.filter)}>
            <span className="stat-number">{s.val}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input type="text" placeholder="Search customer or restaurant..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
        <select className="status-filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Bookings</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bookings-table-container">
        <table className="bookings-table">
          <thead>
            <tr><th>Customer</th><th>Restaurant</th><th>Date & Time</th><th>Guests</th><th>Status</th><th>Notes</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id}>
                <td><div><strong>{b.customer}</strong></div><div style={{ fontSize: 12, color: "#6b7280" }}>{b.email}</div></td>
                <td>{b.restaurant}</td>
                <td><div className="date-time"><span className="date">{b.date}</span><span className="time">{b.time}</span></div></td>
                <td>{b.guests}</td>
                <td><span className={`booking-status booking-status-${b.status}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                <td style={{ maxWidth: 140, fontSize: 13, color: "#6b7280" }}>{b.notes || "—"}</td>
                <td>
                  <div className="action-buttons-table">
                    <button className="btn-view" title="View" onClick={() => { setSelected(b); setShowView(true); }}><IcoEye /></button>
                    <button className="btn-edit" title="Edit" onClick={() => openEdit(b)}><IcoEdit /></button>
                    <button className="btn-delete" title="Delete" onClick={() => { setSelected(b); setShowDelete(true); }}><IcoDel /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "48px 0", color: "#6b7280" }}>No bookings found</div>}

      {showAdd && (
        <Modal title="Add New Booking" onClose={() => setShowAdd(false)} onConfirm={handleAdd} confirmLabel="Add Booking" confirmColor="#003580">
          <BookingForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit Booking" onClose={() => setShowEdit(false)} onConfirm={handleEdit} confirmLabel="Save Changes" confirmColor="#003580">
          <BookingForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showView && selected && (
        <Modal title="Booking Details" onClose={() => setShowView(false)}>
          {[["Customer", selected.customer],["Email", selected.email],["Restaurant", selected.restaurant],["Date", selected.date],["Time", selected.time],["Guests", String(selected.guests)],["Status", selected.status],["Notes", selected.notes || "—"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 700, textAlign: "right", maxWidth: "60%" }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setShowView(false)} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#003580", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Close</button>
          </div>
        </Modal>
      )}

      {showDelete && selected && (
        <Modal title="Delete Booking" onClose={() => setShowDelete(false)} onConfirm={handleDelete} confirmLabel="Yes, Delete" confirmColor="#dc2626">
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><IcoDel /></div>
            <p style={{ fontSize: 15, color: "#374151", margin: 0 }}>Delete booking for <strong>{selected.customer}</strong> at <strong>{selected.restaurant}</strong>?</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
