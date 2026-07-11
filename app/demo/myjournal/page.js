import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "MyJournal — Interactive Demo | IdealAppHub",
  description: "Try the MyJournal Android app in your browser: a private, on-device journal with photos, voice notes, end-to-end encrypted family sharing, and AI-composed memoirs.",
};

export default function MyJournalDemoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          MyJournal — Interactive Demo
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 8 }}>
          A clickable simulation of the MyJournal Android app. Browse a year of memories —
          text, photos, video and voice notes in one timeline — then try the search, open an
          entry, share it end-to-end encrypted with family, and compose an AI-written memoir
          or travel story from the entries you select.
        </p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 24 }}>
          Privacy: everything stays on-device and encrypted by default. AI generation sends
          only the entries you explicitly select. All demo data is sample content.
        </p>
        <iframe
          src="/demos/myjournal.html"
          title="MyJournal interactive demo"
          style={{ width: "100%", height: 900, border: "1px solid var(--border)", borderRadius: 12, background: "#F1EEE6" }}
          loading="lazy"
        />
      </main>
      <Footer />
    </>
  );
}
