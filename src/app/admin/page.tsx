"use client";

import { useState } from "react";
import "./dashboard.css";

const STATS = [
  { label: "Total Restaurants", value: "24",    trend: 12, color: "blue",
    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg> },
  { label: "Active Bookings",   value: "156",   trend: 8,  color: "green",
    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: "Total Users",       value: "3,240", trend: 24, color: "purple",
    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: "Revenue (Month)",   value: "Rs 42,580", trend: 18, color: "orange",
    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
];

const BOOKINGS = [
  { id:1, customer:"Ahmed Khan",    restaurant:"Brisket & Bowls", date:"2025-05-25", time:"7:30 PM", guests:4, status:"Confirmed" },
  { id:2, customer:"Fatima Ahmed",  restaurant:"Spice Route",     date:"2025-05-26", time:"8:00 PM", guests:2, status:"Pending" },
  { id:3, customer:"Hassan Ali",    restaurant:"Sushi Station",   date:"2025-05-25", time:"6:00 PM", guests:6, status:"Confirmed" },
  { id:4, customer:"Zainab Malik",  restaurant:"Casa Milano",     date:"2025-05-27", time:"9:00 PM", guests:3, status:"Cancelled" },
];

const ACTIONS = [
  { label:"Add New Restaurant", color:"blue",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> },
  { label:"Send Newsletter", color:"green",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label:"Generate Report", color:"purple",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { label:"Settings", color:"orange",
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
];

export default function AdminDashboard() {
  const [stats] = useState(STATS);
  const [recentBookings] = useState(BOOKINGS);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map(s => (
          <div key={s.label} className={`stat-card stat-${s.color}`}>
            <div className="stat-icon">{s.svg}</div>
            <div className="stat-content">
              <p className="stat-label">{s.label}</p>
              <h3 className="stat-value">{s.value}</h3>
              <p className="stat-trend"><span className="trend-icon">↑</span><span>{s.trend}% this month</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Bookings</h2>
            <a href="/admin/bookings" className="see-all">View All →</a>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead><tr><th>Customer</th><th>Restaurant</th><th>Date & Time</th><th>Guests</th><th>Status</th></tr></thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.customer}</td>
                    <td>{b.restaurant}</td>
                    <td>{b.date} at {b.time}</td>
                    <td>{b.guests}</td>
                    <td><span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header"><h2>Quick Stats</h2></div>
          <div className="quick-stats">
            {[
              { label:"Avg Booking Value",    val:"Rs 85.50" },
              { label:"Cancellation Rate",    val:"3.2%" },
              { label:"Customer Satisfaction",val:"4.8 / 5" },
              { label:"Occupancy Rate",       val:"87.5%" },
            ].map(s => (
              <div key={s.label} className="quick-stat-item">
                <span className="quick-stat-label">{s.label}</span>
                <span className="quick-stat-value">{s.val}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="dashboard-section">
        <div className="section-header"><h2>Quick Actions</h2></div>
        <div className="action-buttons">
          {ACTIONS.map(a => (
            <button key={a.label} className={`action-btn action-${a.color}`}>
              <span className="btn-icon">{a.svg}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
