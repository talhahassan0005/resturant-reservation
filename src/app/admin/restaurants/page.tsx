"use client";

import { useState, useRef } from "react";
import "./restaurants.css";

interface Restaurant {
  id: string; name: string; location: string; cuisine: string;
  rating: number; status: "active" | "inactive" | "pending";
  hours: string; priceRange: string; image: string;
}
type FormData = Omit<Restaurant, "id">;

const INIT: Restaurant[] = [
  {
    id: "r1", name: "Brisket & Bowls", location: "Lahore", cuisine: "American",
    rating: 9.2, status: "active", hours: "11:00 AM – 11:00 PM", priceRange: "$$",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "r2", name: "Spice Route", location: "Karachi", cuisine: "Pakistani",
    rating: 9.6, status: "active", hours: "12:00 PM – 12:00 AM", priceRange: "$$",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "r3", name: "Sushi Station", location: "Islamabad", cuisine: "Japanese",
    rating: 8.8, status: "active", hours: "10:00 AM – 10:00 PM", priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "r4", name: "Lahori Darbar", location: "Lahore", cuisine: "Pakistani",
    rating: 9.1, status: "pending", hours: "8:00 AM – 2:00 AM", priceRange: "$",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "r5", name: "Casa Milano", location: "Karachi", cuisine: "Italian",
    rating: 8.9, status: "active", hours: "12:00 PM – 11:00 PM", priceRange: "$$$",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80",
  },
  {
    id: "r6", name: "The Rooftop Grill", location: "Islamabad", cuisine: "Continental",
    rating: 9.0, status: "active", hours: "5:00 PM – 12:00 AM", priceRange: "$$",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&q=80",
  },
];

const EMPTY: FormData = { name: "", location: "", cuisine: "", rating: 8.0, status: "active", hours: "", priceRange: "$", image: "" };

/* ── Icons ── */
const IcoEdit   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoDel    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>;
const IcoPlus   = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcoEye    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoX      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;

const iStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 8, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
const lStyle: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" };

/* ── Modal ── */
function Modal({ title, onClose, onConfirm, confirmLabel, confirmColor, children }: {
  title: string; onClose: () => void; onConfirm?: () => void;
  confirmLabel?: string; confirmColor?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", maxHeight: "92vh", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 4 }}><IcoX /></button>
        </div>
        <div style={{ padding: "20px 22px", overflowY: "auto", flex: 1 }}>{children}</div>
        {onConfirm && (
          <div style={{ display: "flex", gap: 10, padding: "14px 22px", borderTop: "1px solid #f1f5f9", justifyContent: "flex-end", flexShrink: 0 }}>
            <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>Cancel</button>
            <button onClick={onConfirm} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: confirmColor || "#003580", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>{confirmLabel || "Confirm"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── RestaurantForm ── */
function RestaurantForm({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setForm(p => ({ ...p, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Image Upload */}
      <div style={{ marginBottom: 16 }}>
        <label style={lStyle}>Restaurant Image</label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: "2px dashed #e5e7eb", borderRadius: 10, cursor: "pointer",
            overflow: "hidden", height: 160, display: "flex", alignItems: "center",
            justifyContent: "center", background: "#f9fafb", position: "relative",
            transition: "border-color .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#003580")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
        >
          {form.image ? (
            <>
              <img src={form.image} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", gap: 6 }}>
                <IcoUpload />
                <span style={{ fontSize: 12, fontWeight: 600 }}>Click to change image</span>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#9ca3af" }}>
              <IcoUpload />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Click to upload image</span>
              <span style={{ fontSize: 11 }}>JPG, PNG, WEBP supported</span>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Restaurant Name</label>
        <input style={iStyle} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Brisket & Bowls" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Location</label>
          <input style={iStyle} value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Lahore" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Cuisine</label>
          <input style={iStyle} value={form.cuisine} onChange={e => setForm(p => ({ ...p, cuisine: e.target.value }))} placeholder="e.g. Pakistani" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Rating (0–10)</label>
          <input style={iStyle} type="number" min={0} max={10} step={0.1} value={form.rating} onChange={e => setForm(p => ({ ...p, rating: parseFloat(e.target.value) }))} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lStyle}>Price Range</label>
          <select style={iStyle} value={form.priceRange} onChange={e => setForm(p => ({ ...p, priceRange: e.target.value }))}>
            {["$", "$$", "$$$", "$$$$"].map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Hours</label>
        <input style={iStyle} value={form.hours} onChange={e => setForm(p => ({ ...p, hours: e.target.value }))} placeholder="e.g. 11:00 AM – 11:00 PM" />
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={lStyle}>Status</label>
        <select style={iStyle} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as Restaurant["status"] }))}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </>
  );
}

/* ── Main Page ── */
export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INIT);
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdd, setShowAdd]         = useState(false);
  const [showEdit, setShowEdit]       = useState(false);
  const [showView, setShowView]       = useState(false);
  const [showDelete, setShowDelete]   = useState(false);
  const [selected, setSelected]       = useState<Restaurant | null>(null);
  const [form, setForm]               = useState<FormData>(EMPTY);
  const [toast, setToast]             = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const filtered = restaurants.filter(r => {
    const q = search.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.location.toLowerCase().includes(q)) &&
           (statusFilter === "all" || r.status === statusFilter);
  });

  const handleAdd = () => {
    setRestaurants(prev => [{ ...form, id: "r" + Date.now() }, ...prev]);
    setShowAdd(false); setForm(EMPTY);
    showToast("✅ Restaurant added successfully!");
  };

  const handleEdit = () => {
    setRestaurants(prev => prev.map(r => r.id === selected!.id ? { ...form, id: r.id } : r));
    setShowEdit(false);
    showToast("✅ Restaurant updated successfully!");
  };

  const handleDelete = () => {
    setRestaurants(prev => prev.filter(r => r.id !== selected!.id));
    setShowDelete(false);
    showToast("🗑️ Restaurant deleted.");
  };

  const openEdit = (r: Restaurant) => {
    setSelected(r);
    setForm({ name: r.name, location: r.location, cuisine: r.cuisine, rating: r.rating, status: r.status, hours: r.hours, priceRange: r.priceRange, image: r.image });
    setShowEdit(true);
  };

  return (
    <div className="restaurants-page">
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "#1a1a2e", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600, zIndex: 2000, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      <div className="page-header">
        <div>
          <h1>Restaurant Management</h1>
          <p style={{ color: "#6b7280", fontSize: 14, margin: "4px 0 0" }}>{restaurants.length} restaurants total</p>
        </div>
        <button className="btn-add-restaurant" style={{ display: "flex", alignItems: "center", gap: 7 }} onClick={() => { setForm(EMPTY); setShowAdd(true); }}>
          <IcoPlus /> Add New Restaurant
        </button>
      </div>

      <div className="filters-bar">
        <input type="text" placeholder="Search by name or location..." className="search-input" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="status-filter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="restaurants-grid">
        {filtered.map(r => (
          <div key={r.id} className="restaurant-card">
            {/* Real image */}
            <div className="restaurant-image" style={{ padding: 0, fontSize: 0 }}>
              {r.image ? (
                <img src={r.image} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#9ca3af", fontSize: 13, fontWeight: 600 }}>
                  No Image
                </div>
              )}
            </div>
            <div className="restaurant-info">
              <h3>{r.name}</h3>
              <p className="location">📍 {r.location}</p>
              <p className="cuisine">{r.cuisine} · {r.priceRange}</p>
              <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 8px" }}>🕐 {r.hours}</p>
              <div className="restaurant-meta">
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>★ {r.rating}</span>
                <span className={`status status-${r.status}`}>{r.status}</span>
              </div>
              <div className="restaurant-actions">
                <button className="action-btn-view" style={{ display: "flex", alignItems: "center", gap: 5 }} onClick={() => { setSelected(r); setShowView(true); }}><IcoEye /> View</button>
                <button className="action-btn-edit" style={{ display: "flex", alignItems: "center", gap: 5 }} onClick={() => openEdit(r)}><IcoEdit /> Edit</button>
                <button className="action-btn-delete" style={{ display: "flex", alignItems: "center", gap: 5 }} onClick={() => { setSelected(r); setShowDelete(true); }}><IcoDel /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty-state"><h3>No restaurants found</h3><p>Try adjusting your search or filters</p></div>}

      {showAdd && (
        <Modal title="Add New Restaurant" onClose={() => setShowAdd(false)} onConfirm={handleAdd} confirmLabel="Add Restaurant" confirmColor="#003580">
          <RestaurantForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showEdit && (
        <Modal title="Edit Restaurant" onClose={() => setShowEdit(false)} onConfirm={handleEdit} confirmLabel="Save Changes" confirmColor="#003580">
          <RestaurantForm form={form} setForm={setForm} />
        </Modal>
      )}

      {showView && selected && (
        <Modal title="Restaurant Details" onClose={() => setShowView(false)}>
          {selected.image && (
            <img src={selected.image} alt={selected.name} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />
          )}
          {[["Name", selected.name], ["Location", selected.location], ["Cuisine", selected.cuisine], ["Price Range", selected.priceRange], ["Rating", `${selected.rating} / 10`], ["Hours", selected.hours], ["Status", selected.status]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setShowView(false)} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: "#003580", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Close</button>
          </div>
        </Modal>
      )}

      {showDelete && selected && (
        <Modal title="Delete Restaurant" onClose={() => setShowDelete(false)} onConfirm={handleDelete} confirmLabel="Yes, Delete" confirmColor="#dc2626">
          <div style={{ textAlign: "center", padding: "8px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><IcoDel /></div>
            <p style={{ fontSize: 15, color: "#374151", margin: 0 }}>Delete <strong>{selected.name}</strong>? This cannot be undone.</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
