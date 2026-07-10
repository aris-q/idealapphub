"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../../../lib/admins";
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminNews() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", date: "", link: "", highlight: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u || !isAdmin(u)) { router.push("/admin/login"); }
      else { setUser(u); fetchNews(); }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchNews = async () => {
    console.log("[NEWS] Fetching...");
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log("[NEWS] Fetched:", data);
    setNews(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    console.log("[NEWS] Saving:", form);
    const docRef = await addDoc(collection(db, "news"), form);
    console.log("[NEWS] Saved id:", docRef.id);
    setForm({ title: "", body: "", date: "", link: "", highlight: false });
    await fetchNews();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    console.log("[NEWS] Deleting id:", id);
    await deleteDoc(doc(db, "news", id));
    await fetchNews();
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
        <span style={{ color: "#4af0ff", fontWeight: 700, letterSpacing: 2 }}>IDEALAPPHUB // NEWS</span>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/" style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", borderRadius: 4, textDecoration: "none" }}>GO HOME</a>
          <button onClick={() => router.push("/admin/dashboard")} style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", background: "transparent", borderRadius: 4, cursor: "pointer" }}>← BACK</button>
        </div>
      </nav>
      <main style={{ padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>New Post</h2>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <input style={inputStyle} type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            <textarea style={{ ...inputStyle, height: 120, resize: "none" }} placeholder="Body" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
            <input style={inputStyle} placeholder="Link (optional, https://...)" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#e0e8ff", marginBottom: 12, cursor: "pointer" }}>
              <input type="checkbox" checked={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.checked })} />
              ★ Highlight (featured on home page)
            </label>
            <button type="submit" disabled={saving} style={{ width: "100%", padding: "10px 24px", background: "#4af0ff", color: "#060910", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1 }}>
              {saving ? "SAVING..." : "ADD POST"}
            </button>
          </form>
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>All Posts</h2>
          {news.length === 0 && <p style={{ fontSize: 12, color: "#7a9cc8" }}>No posts yet.</p>}
          {news.map((item) => (
            <div key={item.id} style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 6, padding: 16, marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: "#4af0ff", marginBottom: 4 }}>{item.date}{item.highlight ? " · ★ HIGHLIGHT" : ""}</p>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#e0e8ff", marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 11, color: "#7a9cc8", marginBottom: 12, lineHeight: 1.6 }}>{item.body}</p>
              <button onClick={() => handleDelete(item.id)} style={{ fontSize: 10, padding: "4px 12px", border: "1px solid #ff4a4a", color: "#ff4a4a", background: "transparent", borderRadius: 4, cursor: "pointer" }}>DELETE</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
