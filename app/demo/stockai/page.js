import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Stock.AI — Interactive Demo | IdealAppHub",
  description: "Tour the Stock.AI paper-trading pipeline: 689-ticker daily scan, AI shortlist, Gemini scoring, four layered stop-losses, and a market-day scheduler.",
};

export default function StockAIDemoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Stock.AI — Interactive Demo
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 8 }}>
          A guided tour of Stock.AI&apos;s paper-trading pipeline on a simulated $100k account:
          a daily Dream Scan scoring 689 tickers, an AI shortlist of 20 names across
          Momentum / Reversal / SmartMoney buckets, Google Gemini assessments (~20 calls/day),
          four layered stop-losses, and a US-Eastern market-day scheduler. Explore the tabs —
          the price-refresh button works (simulated).
        </p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 24 }}>
          Data sources: Yahoo Finance, Google Gemini, FRED. Holdings shown are a July 10, 2026 snapshot.
        </p>
        <iframe
          src="/demos/stockai.html"
          title="Stock.AI interactive demo"
          style={{ width: "100%", height: 900, border: "1px solid #2a2a3a", borderRadius: 12, background: "#0a0a0f" }}
          loading="lazy"
        />
        <p style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginTop: 16 }}>
          Stock.AI is a paper-trading simulation — no real orders are placed. Nothing here is
          investment advice; figures shown are from a simulation snapshot.
        </p>
      </main>
      <Footer />
    </>
  );
}
