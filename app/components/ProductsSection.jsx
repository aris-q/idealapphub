export default function ProductsSection({ products = [] }) {
  const placeholder = [
    { id: 1, name: "AppCore", description: "Core infrastructure tool for modern app development.", link: "#", image: null },
    { id: 2, name: "DataViz Pro", description: "Real-time analytics and visualization dashboard.", link: "#", image: null },
    { id: 3, name: "SecureKit", description: "End-to-end security suite for web applications.", link: "#", image: null },
  ];

  const items = products.length > 0 ? products : placeholder;

  return (
    <section id="products" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <p style={{ fontSize: 10, letterSpacing: 4, color: "var(--accent)", marginBottom: 8 }}>// PRODUCTS</p>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Our Products</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {items.map((product) => (
          <div key={product.id} style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 6, overflow: "hidden"
          }}>
            <div style={{
              height: 120, background: "#060910",
              borderBottom: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 32, color: "#1a2a4a" }}>[ ]</span>
              )}
            </div>

            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{product.name}</h3>
              <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>{product.description}</p>
              <a href={product.link} style={{ fontSize: 10, color: "var(--accent)", textDecoration: "none", letterSpacing: 1 }}>
                LEARN MORE →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}