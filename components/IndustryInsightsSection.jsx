import { Icon } from "./Brand";
import SourceChips from "./SourceChips";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function InsightRow({ item }) {
  return (
    <a href={item.link} target="_blank" rel="noopener noreferrer" style={{
      display: "flex", alignItems: "baseline", gap: 12, padding: "10px 12px", flexWrap: "wrap",
      background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6,
      marginBottom: 8, textDecoration: "none"
    }}>
      <span style={{ fontSize: 12, color: "var(--accent)", whiteSpace: "nowrap", minWidth: 56 }}>
        {formatDate(item.ts)}
      </span>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, flex: "1 1 200px", minWidth: 0 }}>{item.title}</span>
    </a>
  );
}

export default function IndustryInsightsSection({ items = [] }) {
  return (
    <section id="insights" style={{ padding: "40px clamp(16px, 5vw, 32px)", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        <Icon name="insight" size={20} />
        Industry Insights
      </h2>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>
        What companies, founders, and customers are building, hiring for, and struggling with, via{" "}
        <a href="https://techcrunch.com/category/startups/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>
          TechCrunch
        </a>
      </p>
      <SourceChips label="ALSO WORTH FOLLOWING" links={[
        { label: "The Information", href: "https://www.theinformation.com/" },
        { label: "Crunchbase News", href: "https://news.crunchbase.com/" },
      ]} />
      {items.length === 0 && <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Nothing to show right now.</p>}
      {items.map((item) => <InsightRow key={item.id} item={item} />)}
    </section>
  );
}
