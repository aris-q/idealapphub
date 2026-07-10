import { Icon } from "./Brand";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short", day: "numeric", timeZone: "UTC"
  });
}

export default function PodcastSection({ episodes = [] }) {
  const latest = episodes.slice(0, 4);
  return (
    <section id="podcast" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="podcast" size={20} />
        Podcast
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 24 }}>
        Latest episodes from the <a href="https://www.youtube.com/@allin" target="_blank" rel="noopener noreferrer" style={{ color: "#ff4a4a", textDecoration: "none" }}>All-In Podcast</a>
      </p>
      {latest.length === 0 && <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Episodes are loading — check back shortly.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {latest.map((ep) => (
          <a key={ep.id} href={ep.link} target="_blank" rel="noopener noreferrer" style={{
            background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
            overflow: "hidden", textDecoration: "none", display: "block"
          }}>
            {ep.thumbnail && (
              <img src={ep.thumbnail} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", borderBottom: "1px solid var(--border)" }} />
            )}
            <div style={{ padding: 14 }}>
              <p style={{ fontSize: 12, color: "#ff4a4a", marginBottom: 6 }}>{formatDate(ep.ts)} · ALL-IN</p>
              <h3 style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5 }}>{ep.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
