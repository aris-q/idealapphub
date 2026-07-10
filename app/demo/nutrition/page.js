import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "Nutrition Dev — Interactive Demo | IdealAppHub",
  description: "Try the Nutrition Dev iOS app in your browser: meal logging, calorie estimates, rankings, and peer-to-peer friend sharing.",
};

export default function NutritionDemoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          Nutrition Dev — Interactive Demo
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.7, marginBottom: 8 }}>
          A clickable simulation of the Nutrition Dev iOS app. Walk through the paywall,
          onboarding, meal logging with calorie estimates, rankings, and peer-to-peer
          friend sharing — right in your browser. Free for the first year (App Store
          introductory offer), then $2.99/year, auto-renewing, cancel anytime.
        </p>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.7, marginBottom: 24 }}>
          Privacy: no account, no server — all data stays on the device; friends share
          progress peer-to-peer as files (AirDrop/Messages).
        </p>
        <iframe
          src="/demos/nutrition-dev.html"
          title="Nutrition Dev interactive demo"
          style={{ width: "100%", maxWidth: 1080, height: 860, border: "none", borderRadius: 12, background: "var(--bg-card)" }}
          loading="lazy"
        />
        <p style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.7, marginTop: 16 }}>
          Nutrition and calorie figures are estimates only, not guaranteed — a tracking
          helper, not medical or nutrition advice.
        </p>
      </main>
      <Footer />
    </>
  );
}
