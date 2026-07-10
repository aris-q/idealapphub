export default function Hero() {
  return (
    <section id="hero" style={{
      padding: "64px 32px 48px", textAlign: "center",
      borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(#1a2a4a22 1px, transparent 1px), linear-gradient(90deg, #1a2a4a22 1px, transparent 1px)",
        backgroundSize: "40px 40px", zIndex: 0
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: 10, letterSpacing: 4, color: "var(--accent)", marginBottom: 16 }}>
          {"> "}NEXT-GEN APP PLATFORM<span className="brand-blink" style={{ marginLeft: 6 }}>▮</span>
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, color: "#fff", marginBottom: 12 }}>
          Your Hub for <span style={{ color: "var(--accent)" }}>Ideal Apps</span>
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.7 }}>
          Discover cutting-edge apps, stay updated with the latest news, and explore our growing product ecosystem.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <a href="#products" style={{ padding: "10px 24px", background: "var(--accent)", color: "#060910", fontSize: 12, fontWeight: 700, borderRadius: 4, textDecoration: "none", letterSpacing: 1 }}>EXPLORE PRODUCTS</a>
          <a href="#news" style={{ padding: "10px 24px", background: "transparent", color: "var(--accent)", fontSize: 12, border: "1px solid var(--accent)", borderRadius: 4, textDecoration: "none", letterSpacing: 1 }}>LATEST NEWS</a>
        </div>
      </div>
    </section>
  );
}
