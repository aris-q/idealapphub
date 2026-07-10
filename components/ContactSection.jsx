"use client";
import { useState } from "react";
import { Icon } from "./Brand";
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => { setStatus("sent"); setForm({ name: "", email: "", message: "" }); }, 1000);
  };
  const inputStyle = { width: "100%", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4, padding: "10px 12px", color: "var(--text-primary)", fontSize: 12, fontFamily: "'Courier New', monospace", marginBottom: 10, outline: "none" };
  return (
    <section id="contact" style={{ padding: "40px 32px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <div>
          <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            <Icon name="contact" size={20} />
            Get In Touch
          </h2>
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.8 }}>Have questions about our products or want to collaborate? Send us a message.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <textarea style={{ ...inputStyle, height: 80, resize: "none" }} placeholder="Your message..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button type="submit" disabled={status === "sending"} style={{ width: "100%", padding: "10px 24px", background: "var(--accent)", color: "#060910", fontSize: 12, fontWeight: 700, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1 }}>
            {status === "sending" ? "SENDING..." : status === "sent" ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
          </button>
        </form>
      </div>
    </section>
  );
}
