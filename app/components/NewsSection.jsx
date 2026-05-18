export default function NewsSection({ news = [] }) {
  const placeholder = [
    { id: 1, title: "Platform v2.0 Launched", body: "Major update with new features and performance improvements.", date: "May 15, 2026" },
    { id: 2, title: "New Product Added", body: "Introducing our latest tool built for developers and power users.", date: "May 10, 2026" },
    { id: 3, title: "Community Update", body: "We're growing! Stay tuned for more exciting announcements.", date: "May 1, 2026" },
  ];

  const items = news.length > 0 ? news : placeholder;

  return (
    <section id="news" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <p style={{ fontSize: 10, letterSpacing: 4, color: "var(--accent)", marginBottom: 8 }}>// UPDATES</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>News & Updates</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {items.map((item, i) => (
          <div key={item.id} style={{
            background: "var(--bg-card)", border: `1px solid ${i === 0 ? "#4af0ff44" : "var(--border)"}`,
            borderRadius: 6, padding: 16
          }}>
            <p style={{ fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>{item.date}</p>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6, lineHeight: 1.4 }}>{item.title}</h3>
            <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}