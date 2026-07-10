"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { BracketMark } from "../../../components/Brand";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=86400; SameSite=Strict`;
      console.log("[AUTH] Login successful, session cookie set");
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("[AUTH] Login failed:", err.code, err.message);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", background: "#0f1628", border: "1px solid #1a2a4a",
    borderRadius: 4, padding: "10px 12px", color: "#e0e8ff",
    fontSize: 12, fontFamily: "'Courier New', monospace",
    marginBottom: 12, outline: "none"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 8, padding: 40, width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}><BracketMark size={36} /></div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input style={inputStyle} type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <input style={inputStyle} type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          {error && <p style={{ fontSize: 11, color: "#ff4a4a", marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "10px 24px", background: "#4af0ff",
            color: "#060910", fontSize: 12, fontWeight: 700, border: "none",
            borderRadius: 4, cursor: "pointer", letterSpacing: 1
          }}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>
        <a href="/" style={{ display: "block", marginTop: 16, fontSize: 11, color: "#7a9cc8", textDecoration: "none" }}>← Go home</a>
      </div>
    </div>
  );
}
