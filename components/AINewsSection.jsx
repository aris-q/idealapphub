import { Icon, LiveBadge } from "./Brand";

const SOURCE_COLORS = {
  IdealAppHub: "var(--accent)",
  "Hacker News": "#ff6600",
  "All-In Podcast": "#ff4a4a",
};

function SourceBadge({ source }) {
  const color = SOURCE_COLORS[source] || "var(--text-muted)";
  return (
    <span style={{
      fontSize: 9, letterSpacing: 1, color, border: `1px solid ${color}55`,
      borderRadius: 3, padding: "2px 6px", whiteSpace: "nowrap"
    }}>
      {source.toUpperCase()}
    </span>
  );
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short", day: "numeric", timeZone: "UTC"
  });
}

function NewsRow({ item }) {
  return (
    <a href={item.link || "#"} target={item.link ? "_blank" : undefined} rel="noopener noreferrer" style={{
      display: "flex", alignItems: "baseline", gap: 12, padding: "10px 12px",
      background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
      marginBottom: 8, textDecoration: "none"
    }}>
      <span style={{ fontSize: 10, color: "var(--text-muted)", whiteSpace: "nowrap", minWidth: 46 }}>
        {formatDate(item.ts)}
      </span>
      <SourceBadge source={item.source} />
      <span style={{ fontSize: 12, color: "var(--text-primary)", lineHeight: 1.5 }}>{item.title}</span>
    </a>
  );
}

export default function AINewsSection({ highlights = [], today = [], week = [] }) {
  return (
    <section id="news" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>
        <Icon name="news" size={20} />
        AI News & Updates
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, letterSpacing: 2, color: "var(--text-muted)", fontWeight: 400 }}>
          <LiveBadge size={14} /> LIVE
        </span>
      </h2>

      {highlights.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: 3, color: "var(--accent)", marginBottom: 12 }}>
            <Icon name="highlight" size={14} /> HIGHLIGHTS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {highlights.map((item) => (
              <a key={item.id} href={item.link || "#"} target={item.link ? "_blank" : undefined} rel="noopener noreferrer" style={{
                background: "var(--bg-card)", border: "1px solid #4af0ff44", borderRadius: 6,
                padding: 16, textDecoration: "none", display: "block"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: "var(--accent)" }}>{formatDate(item.ts)}</span>
                  <SourceBadge source={item.source} />
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.4 }}>{item.title}</h3>
                {item.body && <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>{item.body}</p>}
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, color: "var(--text-muted)", marginBottom: 12 }}>TODAY</p>
        {today.length === 0 && <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Nothing yet today — check back soon.</p>}
        {today.map((item) => <NewsRow key={item.id} item={item} />)}
      </div>

      <div>
        <p style={{ fontSize: 11, letterSpacing: 3, color: "var(--text-muted)", marginBottom: 12 }}>THIS WEEK</p>
        {week.length === 0 && <p style={{ fontSize: 11, color: "var(--text-muted)" }}>No items this week.</p>}
        {week.map((item) => <NewsRow key={item.id} item={item} />)}
      </div>
    </section>
  );
}
