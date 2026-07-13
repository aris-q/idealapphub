import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export const metadata = {
  title: "idealDesign — Interactive Demos | IdealAppHub",
  description: "Two idealDesign prototypes: a circuit workbench with live component calculators and BOM, and a plain-language requirement-to-breadboard designer.",
};

export default function IdealDesignDemoPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "40px 32px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
          idealDesign — Interactive Demos
        </h1>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 32 }}>
          A circuit design tool for makers, previewed in two prototypes. Values are computed
          from real design formulas and snapped to standard (E12) parts you can actually buy.
          Concept previews — values illustrative.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          Prototype 1 — Circuit Workbench
        </h2>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 16 }}>
          Three live calculators (LED resistor, 555 astable blinker, linear regulator with
          heatsink check), a component library from resistors to ICs, and a running bill of
          materials with budget tracking. Adjust the sliders — everything recomputes live.
        </p>
        <iframe
          src="/demos/idealdesign-workbench.html"
          title="idealDesign circuit workbench demo"
          style={{ width: "100%", height: 860, border: "1px solid #2e363c", borderRadius: 12, background: "#14181b", marginBottom: 40 }}
          loading="lazy"
        />

        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
          Prototype 2 — Requirement to Breadboard
        </h2>
        <p style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 680, lineHeight: 1.7, marginBottom: 16 }}>
          Type what you want in plain language — &quot;blink an LED every 0.5 seconds&quot;,
          &quot;turn on an LED when it gets dark&quot; — and get a wired breadboard diagram,
          step-by-step wiring instructions, the computed component values, and the bill of
          materials. Try the example chips.
        </p>
        <iframe
          src="/demos/idealdesign-breadboard.html"
          title="idealDesign requirement-to-breadboard demo"
          style={{ width: "100%", height: 900, border: "1px solid #2e363c", borderRadius: 12, background: "#14181b" }}
          loading="lazy"
        />
      </main>
      <Footer />
    </>
  );
}
