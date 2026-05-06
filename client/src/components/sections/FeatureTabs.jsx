import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import ScrollReveal from '../ui/ScrollReveal';
import { Scan, Palette, FileText, PenTool, ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'analyzer',
    icon: Scan,
    label: 'Site Analyzer',
    title: 'Crawl and capture every page automatically',
    desc: 'Sites are complex — dozens of pages, multiple states, responsive breakpoints. Webimic\'s crawler navigates the entire site structure so you can focus on analysis, not manual screenshots.',
    bullets: [
      'Recursive crawling with Crawlee + Puppeteer for reliable rendering',
      'Configurable depth, domain constraints, and page limits',
      'Multi-device viewport captures: desktop, tablet, and mobile',
      'Parallel processing across worker instances for speed at scale',
    ],
    link: '/product/analyzer',
    linkLabel: 'Webimic Site Analyzer',
    accent: '#00E8C6',
    mockTitle: 'Crawl Progress',
    mockItems: ['Homepage', 'About', 'Products', 'Blog', 'Contact'],
  },
  {
    id: 'tokens',
    icon: Palette,
    label: 'Design Tokens',
    title: 'Extract complete design systems from any site',
    desc: 'Understanding a site\'s visual language means capturing colors, typography, spacing, and motion. Webimic reverse-engineers the full token set from computed styles and pixel analysis.',
    bullets: [
      'K-means color clustering on screenshots for dominant palette extraction',
      'Typography sampling: font families, sizes, weights, and line heights',
      'Spacing and layout pattern detection from computed CSS values',
      'Animation and transition property recording from stylesheets and DevTools',
    ],
    link: '/product/tokens',
    linkLabel: 'Webimic Design Tokens',
    accent: '#38BDF8',
    mockTitle: 'Extracted Tokens',
    mockItems: ['Colors (12)', 'Typography (8)', 'Spacing (6)', 'Animations (4)'],
  },
  {
    id: 'docs',
    icon: FileText,
    label: 'Doc Generator',
    title: 'Generate rich PDF specs with embedded screenshots',
    desc: 'Doc A captures everything observed — the site\'s actual design system laid out with full-page screenshots, token tables, and component breakdowns. Ready for handoff or LLM prompting.',
    bullets: [
      'Site overview with job parameters, page count, and device coverage',
      'Per-page sections: large screenshot, color swatches, type styles, spacing scales',
      'Component-level crops: navbar, hero, cards, CTAs, footer, modals',
      'Print-quality PDF via Puppeteer page.pdf() with embedded images',
    ],
    link: '/product/docs',
    linkLabel: 'Webimic Doc Generator',
    accent: '#A78BFA',
    mockTitle: 'Doc A Preview',
    mockItems: ['Site Overview', 'Key Pages (12)', 'Components (34)', 'Token Catalog'],
  },
  {
    id: 'redesign',
    icon: PenTool,
    label: 'Redesign Engine',
    title: 'Generate smart redesign specs that avoid cloning',
    desc: 'Doc B builds on the observed spec with differentiated suggestions — alternate palettes, typography changes, dark mode options, and accessibility improvements — so you learn without copying.',
    bullets: [
      'Side-by-side visual comparisons: original vs. recommended changes',
      'Per-token change logs with original value, proposed value, and rationale',
      'Dark mode and accessibility suggestions with contrast ratio analysis',
      'Rule-based engine with future ML model integration path',
    ],
    link: '/product/redesign',
    linkLabel: 'Webimic Redesign Engine',
    accent: '#F472B6',
    mockTitle: 'Doc B Preview',
    mockItems: ['Palette Variants', 'Type Alternatives', 'Dark Mode', 'A11y Notes'],
  },
];

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const current = tabs.find(t => t.id === activeTab);

  return (
    <section className="py-20 md:py-28 bg-dark-800">
      <Container>
        <ScrollReveal>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4 text-center">Webimic Platform</h3>
          <p className="text-center text-muted max-w-2xl mx-auto mb-12 text-lg">
            Analyze any website end-to-end. Trace your target site from crawl to PDF using our integrated pipeline.
          </p>
        </ScrollReveal>

        {/* Tab Nav */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-white/10 text-white border-white/15'
                      : 'text-muted hover:text-muted-light hover:bg-white/5 border-transparent'
                  }`}
                >
                  <Icon size={16} style={isActive ? { color: tab.accent } : {}} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Tab Content */}
        <ScrollReveal key={current.id}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${current.accent}15` }}>
                <current.icon size={20} style={{ color: current.accent }} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">{current.title}</h3>
              <p className="text-muted-light mb-6 leading-relaxed">{current.desc}</p>
              <ul className="space-y-3 mb-8">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-light">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: current.accent }} />
                    <span className="italic">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={current.link}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:gap-3"
                style={{ color: current.accent }}
              >
                {current.linkLabel} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Visual Mock */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl pointer-events-none" style={{
                background: `radial-gradient(ellipse at center, ${current.accent}15, transparent 70%)`
              }} />
              <div className="relative glass-card rounded-2xl p-6 overflow-hidden">
                {/* Mock UI */}
                <div className="bg-dark-950/80 rounded-xl border border-white/10 overflow-hidden">
                  {/* Title bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                    <span className="ml-3 text-xs text-muted font-mono">{current.mockTitle}</span>
                  </div>
                  {/* Content */}
                  <div className="p-5 space-y-3">
                    {current.mockItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${current.accent}20`, color: current.accent }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <span className="text-sm text-muted-light flex-1">{item}</span>
                        <div className="h-1.5 rounded-full" style={{
                          width: `${60 + Math.random() * 40}%`,
                          maxWidth: '80px',
                          background: `linear-gradient(90deg, ${current.accent}40, ${current.accent}10)`
                        }} />
                      </div>
                    ))}
                    {/* Status bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-xs text-muted">Processing complete</span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: current.accent }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: current.accent }} />
                        Ready
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
