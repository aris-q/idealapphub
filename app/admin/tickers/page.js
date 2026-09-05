"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { isAdmin } from "../../../lib/admins";
import { collection, getDocs, addDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AdminTickers() {
  const [user, setUser] = useState(null);
  const [tickers, setTickers] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (!u || !isAdmin(u)) { router.push("/admin/login"); }
      else { setUser(u); fetchTickers(); }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchTickers = async () => {
    console.log("[TICKERS] Fetching...");
    const q = query(collection(db, "tickers"), orderBy("symbol", "asc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    console.log("[TICKERS] Fetched:", data);
    setTickers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const clean = symbol.trim().toUpperCase();
    if (!clean) return;
    if (tickers.some((t) => t.symbol === clean)) {
      setError(`${clean} is already on the list.`);
      return;
    }
    setSaving(true);
    console.log("[TICKERS] Adding:", clean);
    await addDoc(collection(db, "tickers"), { symbol: clean, addedAt: new Date().toISOString() });
    setSymbol("");
    await fetchTickers();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    console.log("[TICKERS] Deleting id:", id);
    await deleteDoc(doc(db, "tickers", id));
    await fetchTickers();
  };

  const inputStyle = {
    width: "100%", background: "#0f1628", border: "1px solid #1a2a4a",
    borderRadius: 4, padding: "10px 12px", color: "#e0e8ff",
    fontSize: 12, fontFamily: "'Courier New', monospace",
    marginBottom: 12, outline: "none", textTransform: "uppercase"
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#4af0ff", fontFamily: "'Courier New', monospace" }}>LOADING...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", fontFamily: "'Courier New', monospace" }}>
      <nav style={{ background: "#060910", borderBottom: "1px solid #1a2a4a", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#4af0ff", fontWeight: 700, letterSpacing: 2 }}>IDEALAPPHUB // TICKERS</span>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/" style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", borderRadius: 4, textDecoration: "none" }}>GO HOME</a>
          <button onClick={() => router.push("/admin/dashboard")} style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", background: "transparent", borderRadius: 4, cursor: "pointer" }}>← BACK</button>
        </div>
      </nav>
      <main style={{ padding: "40px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Add Ticker</h2>
          <p style={{ fontSize: 11, color: "#7a9cc8", marginBottom: 20, lineHeight: 1.6 }}>
            Enter a stock ticker symbol (e.g. NVDA). It'll show up in the "AI Stock Watch" table on the home page with a live-ish quote from Yahoo Finance.
          </p>
          <form onSubmit={handleSubmit}>
            <input style={inputStyle} placeholder="Ticker symbol (e.g. NVDA)" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
            {error && <p style={{ fontSize: 11, color: "#ff4a4a", marginBottom: 12 }}>{error}</p>}
            <button type="submit" disabled={saving} style={{ width: "100%", padding: "10px 24px", background: "#4af0ff", color: "#060910", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1 }}>
              {saving ? "ADDING..." : "ADD TICKER"}
            </button>
          </form>
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Watchlist ({tickers.length})</h2>
          {tickers.length === 0 && <p style={{ fontSize: 12, color: "#7a9cc8" }}>No tickers yet — the home page falls back to a default AI-stock list until you add some.</p>}
          {tickers.map((t) => (
            <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 6, padding: "10px 16px", marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#4af0ff" }}>{t.symbol}</span>
              <button onClick={() => handleDelete(t.id)} style={{ fontSize: 10, padding: "4px 12px", border: "1px solid #ff4a4a", color: "#ff4a4a", background: "transparent", borderRadius: 4, cursor: "pointer" }}>REMOVE</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
