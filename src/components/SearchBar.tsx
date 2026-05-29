"use client";

type Props = {
  location: string; setLocation: (v: string) => void;
  cuisine: string; setCuisine: (v: string) => void;
  date: string; setDate: (v: string) => void;
  time: string; setTime: (v: string) => void;
  partySize: number; setPartySize: (v: number) => void;
  onSearch: () => void;
};

const CITIES = ["", "Lahore", "Karachi", "Islamabad"];
const CUISINES = ["", "Pakistani", "American", "Italian", "Japanese", "Continental"];
const TIMES = [
  "", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconCuisine = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/>
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
  </svg>
);
const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export default function SearchBar({
  location, setLocation, cuisine, setCuisine, date, setDate,
  time, setTime, partySize, setPartySize, onSearch,
}: Props) {
  return (
    <div className="rrs-searchbar">
      {/* City */}
      <div className="rrs-sb-field">
        <div className="rrs-sb-icon"><IconPin /></div>
        <div className="rrs-sb-content">
          <span className="rrs-sb-label">City</span>
          <select value={location} onChange={e => setLocation(e.target.value)} className="rrs-sb-input">
            {CITIES.map(c => <option key={c} value={c}>{c || "Any city"}</option>)}
          </select>
        </div>
      </div>

      <div className="rrs-sb-divider" />

      {/* Cuisine */}
      <div className="rrs-sb-field">
        <div className="rrs-sb-icon"><IconCuisine /></div>
        <div className="rrs-sb-content">
          <span className="rrs-sb-label">Cuisine</span>
          <select value={cuisine} onChange={e => setCuisine(e.target.value)} className="rrs-sb-input">
            {CUISINES.map(c => <option key={c} value={c}>{c || "Any cuisine"}</option>)}
          </select>
        </div>
      </div>

      <div className="rrs-sb-divider" />

      {/* Date */}
      <div className="rrs-sb-field">
        <div className="rrs-sb-icon"><IconCalendar /></div>
        <div className="rrs-sb-content">
          <span className="rrs-sb-label">Date</span>
          <input
            type="date" value={date} onChange={e => setDate(e.target.value)}
            className="rrs-sb-input" min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>

      <div className="rrs-sb-divider" />

      {/* Time */}
      <div className="rrs-sb-field">
        <div className="rrs-sb-icon"><IconClock /></div>
        <div className="rrs-sb-content">
          <span className="rrs-sb-label">Time</span>
          <select value={time} onChange={e => setTime(e.target.value)} className="rrs-sb-input">
            {TIMES.map(t => <option key={t} value={t}>{t || "Any time"}</option>)}
          </select>
        </div>
      </div>

      <div className="rrs-sb-divider" />

      {/* Guests */}
      <div className="rrs-sb-field rrs-sb-field--sm">
        <div className="rrs-sb-icon"><IconUsers /></div>
        <div className="rrs-sb-content">
          <span className="rrs-sb-label">Guests</span>
          <select value={partySize} onChange={e => setPartySize(Number(e.target.value))} className="rrs-sb-input">
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search button */}
      <button className="rrs-sb-btn" type="button" onClick={onSearch}>
        <IconSearch />
        <span>Search</span>
      </button>
    </div>
  );
}
