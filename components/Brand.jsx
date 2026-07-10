// Inline SVG brand marks and icons. Animation classes (brand-blink,
// brand-pulse, brand-spin) are defined in globals.css and respect
// prefers-reduced-motion. Standalone SVG files live in /public/brand
// and /public/icons.

export function PromptMark({ size = 28, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="4" width="56" height="56" rx="10" fill="none" stroke="var(--accent)" strokeWidth="4" />
      <path d="M16 22 L28 32 L16 42" fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect className={animated ? "brand-blink" : undefined} x="34" y="37" width="14" height="6" rx="1" fill="var(--accent)" />
    </svg>
  );
}

export function HubMark({ size = 28, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <g stroke="var(--accent)" strokeWidth="2" opacity=".5">
        <line x1="32" y1="32" x2="32" y2="8" /><line x1="32" y1="32" x2="32" y2="56" />
        <line x1="32" y1="32" x2="10" y2="19" /><line x1="32" y1="32" x2="54" y2="19" />
        <line x1="32" y1="32" x2="10" y2="45" /><line x1="32" y1="32" x2="54" y2="45" />
      </g>
      <g fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2">
        <rect x="27" y="3" width="10" height="10" rx="2" /><rect x="27" y="51" width="10" height="10" rx="2" />
        <rect x="5" y="14" width="10" height="10" rx="2" /><rect x="49" y="14" width="10" height="10" rx="2" />
        <rect x="5" y="40" width="10" height="10" rx="2" /><rect x="49" y="40" width="10" height="10" rx="2" />
      </g>
      {animated && <circle className="brand-pulse" cx="32" cy="32" r="12" fill="var(--accent)" opacity=".25" />}
      <circle cx="32" cy="32" r="7" fill="var(--accent)" />
    </svg>
  );
}

export function BracketMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M16 8 H6 V56 H16" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 8 H58 V56 H48" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
      <path d="M24 18 V46 M40 18 V46 M24 32 H40" fill="none" stroke="var(--text-primary)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// Radar sweep used as a "live feed" indicator.
export function LiveBadge({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border)" strokeWidth="4" />
      <circle className="brand-spin" cx="30" cy="30" r="24" fill="none" stroke="var(--accent)" strokeWidth="4" strokeDasharray="30 121" strokeLinecap="round" />
      <circle cx="30" cy="30" r="6" fill="var(--accent)" />
    </svg>
  );
}

const ICON_PATHS = {
  news: <><path d="M4 5h13v14H6a2 2 0 0 1-2-2z" /><path d="M17 8h3v9a2 2 0 0 1-2 2" /><path d="M7 9h7M7 12h7M7 15h4" /></>,
  products: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><path d="M17 14v6M14 17h6" /></>,
  contact: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  highlight: <path d="M12 3l2.4 5.3L20 9l-4 4.2 1 5.8-5-2.9-5 2.9 1-5.8L4 9l5.6-.7z" />,
  admin: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></>,
  podcast: <><circle cx="12" cy="10" r="3.5" /><path d="M6 10a6 6 0 0 0 12 0" /><path d="M12 16v5M9 21h6" /></>,
  event: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 11h18" /></>,
};

export function Icon({ name, size = 18, color = "var(--accent)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}
