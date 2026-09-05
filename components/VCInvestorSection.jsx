import { Icon } from "./Brand";
import SourceChips from "./SourceChips";

const SOURCE_COLORS = {
  "Sequoia Capital": "var(--accent)",
  TechCrunch: "#0abf53",
};

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function SourceBadge({ source }) {
  const color = SOURCE_COLORS[source] || "var(--text-muted)";
  return (
    <span style={{
      fontSize: 11, letterSpacing: 1, color, border: `1px solid ${color}55`,
      borderRadius: 3, padding: "2px 6px", whiteSpace: "nowrap"
    }}>
      {source.toUpperCase()}
    </span>
  );
}

function InvestorRow({ item }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "baseline", gap: 12, padding: "10px 12px", flexWrap: "wrap",
      background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
      marginBottom: 8, textDecoration: "none"
    }}>
      <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap", minWidth: 56 }}>
        {formatDate(item.ts)}
      </span>
      <SourceBadge source={item.source} />
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, flex: "1 1 200px", minWidth: 0 }}>{item.title}</span>
    </a>
  );
}

export default function VCInvestorSection({ items = [] }) {
  return (
    <section id="investors" style={{ padding: "40px clamp(16px, 5vw, 32px)", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="investor" size={20} />
        VC & Investor News
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        Who top investors are backing and what trends they're calling, via{" "}
        <a href="https://www.sequoiacap.com/stories/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
          Sequoia Capital
        </a>{" "}
        and{" "}
        <a href="https://techcrunch.com/tag/venture-capital/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
          TechCrunch
        </a>
      </p>
      <SourceChips label="MORE VC & FUNDING COVERAGE" links={[
        { label: "Newcomer", href: "https://www.newcomer.co/" },
        { label: "StrictlyVC", href: "https://www.strictlyvc.com/" },
        { label: "Crunchbase News", href: "https://news.crunchbase.com/" },
      ]} />
      <SourceChips label="VC FIRMS TO WATCH" links={[
        { label: "a16z", href: "https://a16z.com/" },
        { label: "Sequoia", href: "https://www.sequoiacap.com/" },
        { label: "General Catalyst", href: "https://www.generalcatalyst.com/" },
        { label: "Benchmark", href: "https://www.benchmark.com/" },
        { label: "Founders Fund", href: "https://foundersfund.com/" },
        { label: "Lightspeed", href: "https://lsvp.com/" },
        { label: "Index Ventures", href: "https://www.indexventures.com/" },
        { label: "Greylock", href: "https://greylock.com/" },
        { label: "Khosla Ventures", href: "https://www.khoslaventures.com/" },
        { label: "Thrive Capital", href: "https://thrivecap.com/" },
        { label: "Coatue", href: "https://www.coatue.com/" },
        { label: "NEA", href: "https://www.nea.com/" },
        { label: "IVP", href: "https://www.ivp.com/" },
        { label: "Radical Ventures", href: "https://radical.vc/" },
        { label: "Lux Capital", href: "https://www.luxcapital.com/" },
      ]} />
      {items.length === 0 && <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Nothing to show right now.</p>}
      {items.map((item) => <InvestorRow key={item.id} item={item} />)}
    </section>
  );
}
