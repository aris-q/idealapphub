"use client";
import { useState } from "react";
import { Icon } from "./Brand";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const selectStyle = {
  background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4,
  padding: "8px 12px", color: "var(--text-primary)", fontSize: 12,
  fontFamily: "'Courier New', monospace", outline: "none", cursor: "pointer"
};

export default function HackathonSection({ events = [] }) {
  const [year, setYear] = useState("all");
  const [month, setMonth] = useState("all");

  const years = [...new Set(events.map((e) => new Date(e.start).getUTCFullYear()))].sort();
  const filtered = events.filter((e) => {
    const d = new Date(e.start);
    if (year !== "all" && d.getUTCFullYear() !== +year) return false;
    if (month !== "all" && d.getUTCMonth() !== +month) return false;
    return true;
  });

  return (
    <section id="hackathons" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="event" size={20} />
        Hackathons
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        In-person events in the USA and Canada over the next 6 months, via <a href="https://devpost.com/hackathons" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>Devpost</a>
      </p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <select style={selectStyle} value={year} onChange={(e) => setYear(e.target.value)} aria-label="Filter by year">
          <option value="all">All years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select style={selectStyle} value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Filter by month">
          <option value="all">All months</option>
          {MONTH_NAMES.map((m, i) => <option key={m} value={i}>{m}</option>)}
        </select>
        <span style={{ alignSelf: "center", fontSize: 12, color: "var(--text-muted)" }}>
          {filtered.length} event{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {filtered.length === 0 && (
        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
          No events match this filter — try another month or year.
        </p>
      )}
      {filtered.map((e) => (
        <a key={e.id} href={e.url} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "baseline", gap: 14, padding: "12px 14px",
          background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
          marginBottom: 8, textDecoration: "none", flexWrap: "wrap"
        }}>
          <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap", minWidth: 150 }}>{e.dates}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, flex: 1, minWidth: 200 }}>{e.title}</span>
          <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>📍 {e.location}</span>
        </a>
      ))}
    </section>
  );
}
