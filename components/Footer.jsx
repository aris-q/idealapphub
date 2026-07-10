import { HubMark } from "./Brand";

export default function Footer() {
  return (
    <footer style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#060910", borderTop: "1px solid var(--border)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--accent)", fontWeight: 700, letterSpacing: 2 }}>
        <HubMark size={24} animated />
        IDEALAPPHUB
      </span>
      <span style={{ fontSize: 10, color: "#3a5080" }}>© 2026 IdealAppHub. All rights reserved.</span>
    </footer>
  );
}
