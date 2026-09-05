"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PromptMark } from "./Brand";

const LINKS = [
  { label: "News", href: "/#news" },
  { label: "Insights", href: "/#insights" },
  { label: "Investors", href: "/#investors" },
  { label: "Markets", href: "/#markets" },
  { label: "Podcast", href: "/#podcast" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => setHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const isActive = (href) =>
    href === "/products"
      ? pathname === "/products"
      : pathname === "/" && hash === href.slice(1);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="nav-row" style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px clamp(16px, 4vw, 32px)", background: "#060910",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textDecoration: "none" }}>
        <PromptMark size={26} animated />
        IDEALAPP<span style={{ color: "var(--text-primary)" }}>HUB</span>
      </Link>

      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        style={{
          background: "transparent", border: "1px solid var(--border)", borderRadius: 4,
          color: "var(--accent)", fontSize: 16, padding: "4px 10px", cursor: "pointer",
          alignItems: "center", justifyContent: "center"
        }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        {LINKS.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} onClick={() => { setHash(href.startsWith("/#") ? href.slice(1) : ""); closeMenu(); }} style={{
              padding: "6px 12px", borderRadius: 4, textDecoration: "none",
              letterSpacing: 1, fontWeight: active ? 700 : 400,
              color: active ? "#060910" : "var(--text-muted)",
              background: active ? "var(--accent)" : "transparent",
            }}>
              {label}
            </Link>
          );
        })}
        <Link href="/admin/login" onClick={closeMenu} style={{
          fontSize: 11, padding: "6px 14px",
          border: "1px solid var(--accent)", color: "var(--accent)",
          background: "transparent", borderRadius: 4, textDecoration: "none", letterSpacing: 1
        }}>
          Admin Login
        </Link>
      </div>
    </nav>
  );
}
