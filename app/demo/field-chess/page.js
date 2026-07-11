import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Field Chess — Play in Browser | IdealAppHub",
  description: "Play Field Chess (Luzhanqi, Chinese military chess) in your browser — hidden-information strategy with an AI opponent, two-player hot-seat mode, and full game replay.",
};

export default function FieldChessDemoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Field Chess — Play in Browser
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 24 }}>
          A fully playable English edition of Luzhanqi (Chinese military chess). Capture the
          enemy Flag while your pieces stay hidden from your opponent — combat reveals only
          results, never identities. Play against the built-in AI or pass-and-play with a
          friend, then watch the full battle replay with all pieces revealed. Rules are
          built in — click &quot;Full Rules&quot; inside the game.
        </p>
        <iframe
          src="/demos/field-chess.html"
          title="Field Chess — playable Luzhanqi game"
          style={{ width: "100%", height: 940, border: "1px solid #3a4130", borderRadius: 12, background: "#141810" }}
          loading="lazy"
        />
      </main>
      <Footer />
    </>
  );
}
