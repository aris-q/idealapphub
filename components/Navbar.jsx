"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PromptMark } from "./Brand";

const LINKS = [
  { label: "News", href: "/#news" },
  { label: "Podcast", href: "/#podcast" },
  { label: "Hackathons", href: "/#hackathons" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

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

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 32px", background: "#060910",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 18, fontWeight: 700, color: "var(--accent)", letterSpacing: 2, textDecoration: "none" }}>
        <PromptMark size={26} animated />
        IDEALAPP<span style={{ color: "var(--text-primary)" }}>HUB</span>
      </Link>

      <div style={{ display: "flex", gap: 8, fontSize: 12 }}>
        {LINKS.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link key={href} href={href} onClick={() => setHash(href.startsWith("/#") ? href.slice(1) : "")} style={{
              padding: "6px 12px", borderRadius: 4, textDecoration: "none",
              letterSpacing: 1, fontWeight: active ? 700 : 400,
              color: active ? "#060910" : "var(--text-muted)",
              background: active ? "var(--accent)" : "transparent",
            }}>
              {label}
            </Link>
          );
        })}
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
