function ChipLink({ label, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      fontSize: 11, letterSpacing: 0.5, color: "var(--text-muted)",
      border: "1px solid var(--border)", borderRadius: 12, padding: "4px 10px",
      textDecoration: "none", whiteSpace: "nowrap"
    }}>
      {label}
    </a>
  );
}

export default function SourceChips({ label, links }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 11, letterSpacing: 2, color: "var(--text-muted)", marginBottom: 8 }}>{label}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {links.map((l) => <ChipLink key={l.href} {...l} />)}
      </div>
    </div>
  );
}
