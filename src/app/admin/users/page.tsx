"use client";

import { useState } from "react";
import "./users.css";

interface User {
  id: string; name: string; email: string; phone: string;
  role: "Customer" | "Owner" | "Admin";
  joinDate: string; bookings: number; status: "active" | "suspended";
}
type FormData = Omit<User, "id">;

const INIT: User[] = [
  { id: "u1", name: "Ahmed Khan",       email: "ahmed@example.com",    phone: "+92 300 1234567", role: "Customer", joinDate: "2024-01-15", bookings: 12, status: "active" },
  { id: "u2", name: "Fatima Ahmed",     email: "fatima@example.com",   phone: "+92 321 9876543", role: "Customer", joinDate: "2024-02-20", bookings: 8,  status: "active" },
  { id: "u3", name: "Hassan Ali",       email: "hassan@example.com",   phone: "+92 333 5551234", role: "Customer", joinDate: "2024-03-10", bookings: 5,  status: "active" },
  { id: "u4", name: "Zainab Malik",     email: "zainab@example.com",   phone: "+92 345 7778899", role: "Customer", joinDate: "2024-04-05", bookings: 3,  status: "suspended" },
  { id: "u5", name: "Restaurant Owner", email: "owner@restaurant.com", phone: "+92 311 0001111", role: "Owner",    joinDate: "2024-01-01", bookings: 0,  status: "active" },
  { id: "u6", name: "Sara Qureshi",     email: "sara@example.com",     phone: "+92 322 4445566", role: "Customer", joinDate: "2024-05-12", bookings: 7,  status: "active" },
];
const EMPTY: FormData = { name: "", email: "", phone: "", role: "Customer", joinDate: "", bookings: 0, status: "active" };
const COLORS = ["#003580","#10b981","#f59e0b","#ef4444","#6366f1","#ec4899"];

/* ── Icons ── */
const IcoEdit = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoDel  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoEye  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
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
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}>
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

/* ── UserForm — OUTSIDE main component ── */
function UserForm({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Full Name</label>
        <input style={iStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Full name" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Email</label>
          <input style={iStyle} type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@example.com" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Phone</label>
          <input style={iStyle} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+92 300 0000000" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Role</label>
          <select style={iStyle} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value as User["role"] }))}>
            <option>Customer</option><option>Owner</option><option>Admin</option>
          </select>
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Status</label>
          <select style={iStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as User["status"] }))}>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Join Date</label>
        <input style={iStyle} type="date" value={form.joinDate} onChange={e => setForm(p => ({ ...p, joinDate: e.target.value }))} />
      </div>
    </>
  );
}

/* ── Main Page Component ── */
export default function UsersPage() {
  const [users, setUsers]           = useState<User[]>(INIT);
  const [search, setSearch]         = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAdd, setShowAdd]       = useState(false);
  const [showEdit, setShowEdit]     = useState(false);
  const [showView, setShowView]     = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected]     = useState<User | null>(null);
  const [form, setForm]             = useState<FormData>(EMPTY);
  const [toast, setToast]           = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
           (roleFilter === "all" || u.role === roleFilter);
  });

  const handleAdd = () => {
    setUsers(prev => [{ ...form, id: "u" + Date.now() }, ...prev]);
    setShowAdd(false); setForm(EMPTY);
    showToast("✅ User added successfully!");
  };

  const handleEdit = () => {
    setUsers(prev => prev.map(u => u.id === selected!.id ? { ...form, id: u.id } : u));
    setShowEdit(false);
    showToast("✅ User updated successfully!");
  };

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== selected!.id));
    setShowDelete(false);
    showToast("🗑️ User deleted.");
  };

  const openEdit = (u: User) => {
    setSelected(u);
    setForm({ name: u.name, email: u.email, phone: u.phone, role: u.role, joinDate: u.joinDate, bookings: u.bookings, status: u.status });
    setShowEdit(true);
  };

  return (
    <div className="users-page">
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#1a1a2e", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 2000, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>{users.length} total users</p>
        </div>
        <button className="btn-add-user" style={{ display: "flex", alignItems: "center", gap: 7 }} onClick={() => { setForm(EMPTY); setShowAdd(true); }}>
          <IcoPlus /> Add User
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Users", val: users.length,                                     color: "#003580", bg: "#e8eeff" },
          { label: "Active",      val: users.filter(u => u.status === "active").length,   color: "#008009", bg: "#e6f4e7" },
          { label: "Suspended",   val: users.filter(u => u.status === "suspended").length, color: "#cc0000", bg: "#fff0f0" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.label}</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.val}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none" }} />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}
          style={{ padding: "9px 14px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }}>
          <option value="all">All Roles</option>
          <option value="Customer">Customer</option>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Join Date</th><th>Bookings</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `${COLORS[i % COLORS.length]}18`, color: COLORS[i % COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>
                      {u.name.charAt(0)}
                    </div>
                    <strong style={{ fontSize: 14 }}>{u.name}</strong>
                  </div>
                </td>
                <td style={{ fontSize: 13, color: "#6b7280" }}>{u.email}</td>
                <td style={{ fontSize: 13, color: "#6b7280" }}>{u.phone}</td>
                <td>
                  <span style={{ background: u.role === "Admin" ? "#fef3c7" : u.role === "Owner" ? "#e8eeff" : "#f1f5f9", color: u.role === "Admin" ? "#92400e" : u.role === "Owner" ? "#003580" : "#374151", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 700 }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ fontSize: 13, color: "#6b7280" }}>{u.joinDate}</td>
                <td style={{ fontWeight: 700, textAlign: "center" }}>{u.bookings}</td>
                <td><span className={`user-status status-${u.status}`}>{u.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn-table-action" title="View" onClick={() => { setSelected(u); setShowView(true); }}><IcoEye /></button>
                    <button className="btn-table-action" title="Edit" onClick={() => openEdit(u)}><IcoEdit /></button>
                    <button className="btn-table-action delete" title="Delete" onClick={() => { setSelected(u); setShowDelete(true); }}><IcoDel /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && <div style={{ textAlign: "center", padding: "48px 0", color: "#6b7280" }}>No users found</div>}

      {showAdd && (
        <Modal title="Add New User" onClose={() => setShowAdd(false)} onConfirm={handleAdd} confirmLabel="Add User" confirmColor="#003580">
          <UserForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit User" onClose={() => setShowEdit(false)} onConfirm={handleEdit} confirmLabel="Save Changes" confirmColor="#003580">
          <UserForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showView && selected && (
        <Modal title="User Details" onClose={() => setShowView(false)}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f1f5f9" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e8eeff", color: "#003580", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800 }}>
              {selected.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{selected.name}</div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>{selected.role}</div>
            </div>
          </div>
          {[["Email", selected.email],["Phone", selected.phone],["Join Date", selected.joinDate],["Total Bookings", String(selected.bookings)],["Status", selected.status]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 700, textTransform: k === "Status" ? "capitalize" : "none" }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setShowView(false)} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#003580", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Close</button>
          </div>
        </Modal>
      )}

      {showDelete && selected && (
        <Modal title="Delete User" onClose={() => setShowDelete(false)} onConfirm={handleDelete} confirmLabel="Yes, Delete" confirmColor="#dc2626">
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><IcoDel /></div>
            <p style={{ fontSize: 15, color: "#374151", margin: 0 }}>Delete <strong>{selected.name}</strong>? This cannot be undone.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
