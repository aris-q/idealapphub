"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { isAdmin } from "../../../lib/admins";
import { useRouter } from "next/navigation";
import { BracketMark } from "../../../components/Brand";

export default function AdminLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      if (!isAdmin(credential.user)) {
        console.warn("[AUTH] Not an admin:", credential.user.email);
        await signOut(auth);
        setError(`${credential.user.email} is not an admin account.`);
        return;
      }
      const token = await credential.user.getIdToken();
      document.cookie = `session=${token}; path=/; max-age=86400; SameSite=Strict`;
      console.log("[AUTH] Login successful:", credential.user.email);
      router.push("/admin/dashboard");
    } catch (err) {
      console.error("[AUTH] Login failed:", err.code, err.message);
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#0f1628", border: "1px solid #1a2a4a", borderRadius: 8, padding: 40, width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 16 }}><BracketMark size={36} /></div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Admin Login</h1>
        <p style={{ fontSize: 11, color: "#7a9cc8", marginBottom: 24, lineHeight: 1.6 }}>
          Sign in with an authorized Google account.
        </p>
        {error && <p style={{ fontSize: 11, color: "#ff4a4a", marginBottom: 12 }}>{error}</p>}
        <button onClick={handleGoogleLogin} disabled={loading} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          padding: "10px 24px", background: "#4af0ff", color: "#060910", fontSize: 12,
          fontWeight: 700, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1,
          fontFamily: "'Courier New', monospace"
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#060910" d="M21.35 11.1H12v3.8h5.35c-.5 2.5-2.6 3.9-5.35 3.9a6 6 0 1 1 0-12c1.5 0 2.9.55 4 1.45l2.85-2.85A10 10 0 1 0 22 12c0-.3-.02-.6-.05-.9z"/>
          </svg>
          {loading ? "SIGNING IN..." : "SIGN IN WITH GOOGLE"}
        </button>
        <a href="/" style={{ display: "block", marginTop: 16, fontSize: 11, color: "#7a9cc8", textDecoration: "none" }}>← Go home</a>
      </div>
    </div>
  );
}
