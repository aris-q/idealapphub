import { Icon } from "./Brand";

export default function ProductsSection({ products = [] }) {
  const placeholder = [
    { id: "sample", name: "Coming Soon", description: "Our first product is in the works. Stay tuned!", link: null, image: null },
  ];
  const items = products.length > 0 ? products : placeholder;
  return (
    <section id="products" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>
        <Icon name="products" size={20} />
        Our Products
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {items.map((product) => (
          <div key={product.id} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: 120, background: "#060910", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 32, color: "#1a2a4a" }}>[ ]</span>
              )}
            </div>
            <div style={{ padding: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{product.name}</h3>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 12 }}>{product.description}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                {product.link ? <a href={product.link} style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none", letterSpacing: 1 }}>LEARN MORE →</a> : <span />}
                {product.updatedAt && (
                  <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    Updated {new Date(product.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
