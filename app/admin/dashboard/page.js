"use client";
import { useEffect, useState } from "react";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        console.log("[AUTH] Admin authenticated:", u.email);
        setUser(u);
      } else {
        console.log("[AUTH] No session, redirecting to login");
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "session=; path=/; max-age=0";
    console.log("[AUTH] Admin logged out");
    router.push("/admin/login");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#4af0ff", fontFamily: "'Courier New', monospace", fontSize: 12 }}>LOADING...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", fontFamily: "'Courier New', monospace" }}>
      <nav style={{ background: "#060910", borderBottom: "1px solid #1a2a4a", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#4af0ff", fontWeight: 700, letterSpacing: 2 }}>IDEALAPPHUB // ADMIN</span>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a href="/" style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #1a2a4a", color: "#7a9cc8", borderRadius: 4, textDecoration: "none" }}>← GO HOME</a>
          <span style={{ fontSize: 11, color: "#7a9cc8" }}>{user?.email}</span>
          <button onClick={handleLogout} style={{ fontSize: 11, padding: "6px 14px", border: "1px solid #ff4a4a", color: "#ff4a4a", background: "transparent", borderRadius: 4, cursor: "pointer" }}>LOGOUT</button>
        </div>
      </nav>
      <main style={{ padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 32 }}>Admin Panel</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 600 }}>
          <div onClick={() => router.push("/admin/news")} style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 8, padding: 24, cursor: "pointer" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>News & Updates</h2>
            <p style={{ fontSize: 11, color: "#7a9cc8" }}>Add, edit or remove news posts</p>
          </div>
          <div onClick={() => router.push("/admin/products")} style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 8, padding: 24, cursor: "pointer" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Products</h2>
            <p style={{ fontSize: 11, color: "#7a9cc8" }}>Add, edit or remove products</p>
          </div>
        </div>
      </main>
    </div>
  );
}
