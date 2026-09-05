import { Icon } from "./Brand";

function formatPrice(n) {
  return n == null ? "—" : `$${n.toFixed(2)}`;
}

function formatChange(n) {
  return n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}`;
}

function formatPercent(n) {
  return n == null ? "—" : `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function formatVolume(n) {
  if (n == null) return "—";
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return String(n);
}

const cellStyle = { padding: "10px 12px", fontSize: 12, whiteSpace: "nowrap" };
const headStyle = { ...cellStyle, color: "var(--text-muted)", letterSpacing: 1, fontWeight: 400, textAlign: "left", borderBottom: "1px solid var(--border)" };

export default function StockTableSection({ quotes = [] }) {
  return (
    <section id="stocks" style={{ padding: "40px clamp(16px, 5vw, 32px)", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="market" size={20} />
        AI Stock Watch
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        Live-ish quotes (15-20 min delayed) for AI-related companies, via{" "}
        <a href="https://finance.yahoo.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Yahoo Finance
        </a>
        . Manage the ticker list from the admin panel.
      </p>

      {quotes.length === 0 && <p style={{ fontSize: 12, color: "var(--text-muted)" }}>No tickers configured yet.</p>}

      {quotes.length > 0 && (
        <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: 6 }}>
          <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", background: "var(--bg-card)" }}>
            <thead>
              <tr>
                <th style={headStyle}>SYMBOL</th>
                <th style={headStyle}>COMPANY</th>
                <th style={{ ...headStyle, textAlign: "right" }}>PRICE</th>
                <th style={{ ...headStyle, textAlign: "right" }}>CHANGE</th>
                <th style={{ ...headStyle, textAlign: "right" }}>% CHANGE</th>
                <th style={{ ...headStyle, textAlign: "right" }}>VOLUME</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const up = q.change != null && q.change >= 0;
                const color = q.error ? "var(--text-muted)" : up ? "#3ddc84" : "#ff4a4a";
                return (
                  <tr key={q.symbol} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ ...cellStyle, color: "var(--accent)", fontWeight: 700 }}>{q.symbol}</td>
                    <td style={{ ...cellStyle, color: "var(--text-primary)", whiteSpace: "normal" }}>{q.error ? "Unavailable" : q.name}</td>
                    <td style={{ ...cellStyle, textAlign: "right", color: "var(--text-primary)" }}>{formatPrice(q.price)}</td>
                    <td style={{ ...cellStyle, textAlign: "right", color }}>{formatChange(q.change)}</td>
                    <td style={{ ...cellStyle, textAlign: "right", color }}>{formatPercent(q.changePercent)}</td>
                    <td style={{ ...cellStyle, textAlign: "right", color: "var(--text-muted)" }}>{formatVolume(q.volume)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
