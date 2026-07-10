"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../../../lib/admins";
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", link: "", videoUrl: "", image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u || !isAdmin(u)) {
        console.log("[AUTH] No admin session, redirecting");
        router.push("/admin/login");
      } else {
        setUser(u);
        fetchProducts();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProducts = async () => {
    console.log("[PRODUCTS] Fetching...");
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log("[PRODUCTS] Fetched:", data);
    setProducts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, image: form.image.trim() || null };
      console.log("[PRODUCTS] Saving:", payload);
      const docRef = await addDoc(collection(db, "products"), payload);
      console.log("[PRODUCTS] Saved id:", docRef.id);
      setForm({ name: "", description: "", link: "", videoUrl: "", image: "" });
      await fetchProducts();
    } catch (err) {
      console.error("[PRODUCTS] Save error:", err.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    console.log("[PRODUCTS] Deleting id:", id);
    await deleteDoc(doc(db, "products", id));
    await fetchProducts();
  };

  const inputStyle = {
    width: "100%", background: "#0f1628", border: "1px solid #1a2a4a",
    borderRadius: 4, padding: "10px 12px", color: "#e0e8ff",
    fontSize: 12, fontFamily: "'Courier New', monospace",
    marginBottom: 12, outline: "none"
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#4af0ff", fontFamily: "'Courier New', monospace" }}>LOADING...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", fontFamily: "'Courier New', monospace" }}>
      <nav style={{ background: "#060910", borderBottom: "1px solid #1a2a4a", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#4af0ff", fontWeight: 700, letterSpacing: 2 }}>IDEALAPPHUB // PRODUCTS</span>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/" style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", borderRadius: 4, textDecoration: "none" }}>GO HOME</a>
          <button onClick={() => router.push("/admin/dashboard")} style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", background: "transparent", borderRadius: 4, cursor: "pointer" }}>← BACK</button>
        </div>
      </nav>

      <main style={{ padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>New Product</h2>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <textarea style={{ ...inputStyle, height: 80, resize: "none" }} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input style={inputStyle} placeholder="Product link (https://...)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
            <input style={inputStyle} placeholder="YouTube video URL (optional)" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
            <input style={inputStyle} placeholder="Image URL (optional, https://...)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            {form.image.trim() && (
              <img src={form.image} alt="Preview" style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4, marginBottom: 12, border: "1px solid #1a2a4a" }} />
            )}
            <button type="submit" disabled={saving} style={{ width: "100%", padding: "10px 24px", background: "#4af0ff", color: "#060910", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1 }}>
              {saving ? "SAVING..." : "ADD PRODUCT"}
            </button>
          </form>
        </div>

        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>All Products</h2>
          {products.length === 0 && <p style={{ fontSize: 12, color: "#7a9cc8" }}>No products yet.</p>}
          {products.map((product) => (
            <div key={product.id} style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 6, padding: 16, marginBottom: 12 }}>
              {product.image && <img src={product.image} alt={product.name} style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 8 }} />}
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e8ff", marginBottom: 4 }}>{product.name}</h3>
              <p style={{ fontSize: 11, color: "#7a9cc8", marginBottom: 8, lineHeight: 1.6 }}>{product.description}</p>
              {product.videoUrl && <p style={{ fontSize: 10, color: "#4af0ff", marginBottom: 8 }}>📹 Video linked</p>}
              <button onClick={() => handleDelete(product.id)} style={{ fontSize: 10, padding: "4px 12px", border: "1px solid #ff4a4a", color: "#ff4a4a", background: "transparent", borderRadius: 4, cursor: "pointer" }}>DELETE</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
