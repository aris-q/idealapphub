import { Icon } from "./Brand";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function TickerBadge({ ticker }) {
  return (
    <span style={{
      fontSize: 11, letterSpacing: 1, color: "var(--accent)", border: "1px solid var(--accent)55",
      borderRadius: 3, padding: "2px 6px", whiteSpace: "nowrap"
    }}>
      {ticker}
    </span>
  );
}

function MarketRow({ item }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "baseline", gap: 12, padding: "10px 12px",
      background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
      marginBottom: 8, textDecoration: "none"
    }}>
      <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap", minWidth: 56 }}>
        {formatDate(item.ts)}
      </span>
      <TickerBadge ticker={item.ticker} />
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5 }}>{item.title}</span>
    </a>
  );
}

export default function MarketViewsSection({ items = [] }) {
  return (
    <section id="markets" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="market" size={20} />
        Market Views
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        Analyst and financial-media commentary on AI-adjacent large caps, via{" "}
        <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Yahoo Finance
        </a>
      </p>
      {items.length === 0 && <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Nothing to show right now.</p>}
      {items.map((item) => <MarketRow key={item.id} item={item} />)}
    </section>
  );
}
