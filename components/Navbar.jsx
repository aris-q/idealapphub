"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 32px", background: "#060910",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textDecoration: "none" }}>
        IDEALAPPHUB
      </Link>

      <div style={{ display: "flex", gap: 24, fontSize: 12, color: "var(--text-muted)" }}>
        <Link href="#news" style={{ color: "var(--text-muted)", textDecoration: "none" }}>News</Link>
        <Link href="#products" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Products</Link>
        <Link href="#about" style={{ color: "var(--text-muted)", textDecoration: "none" }}>About</Link>
        <Link href="#contact" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Contact</Link>
      </div>

      <Link href="/admin/login" style={{
        fontSize: 11, padding: "6px 14px",
        border: "1px solid var(--accent)", color: "var(--accent)",
        background: "transparent", borderRadius: 4, textDecoration: "none", letterSpacing: 1
      }}>
        Admin Login
      </Link>
    </nav>
  );
}