import { useParams } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import LogoTicker from '../components/sections/LogoTicker';
import BottomCTA from '../components/sections/BottomCTA';
import { CircuitBackground } from '../components/ui/FlowchartDiagram';
import { Scan, Palette, FileText, PenTool, Eye, Layers, Move, ArrowRight } from 'lucide-react';

const productAnalysis = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80';
const productDesign = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1';
const productTokens = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=500&fit=crop&q=80';
const productPdf = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop&q=80';
const heroDashboard = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80';
const heroCode = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1';
const abstractDark = 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&h=500&fit=crop&q=80';

const productPages = {
  analyzer: {
    icon: Scan, accent: '#00E8C6', name: 'site-analyzer', heroImage: heroDashboard,
    title: 'Crawl and capture any public website',
    desc: 'Webimic\'s Site Analyzer uses Crawlee and Puppeteer to recursively discover and render every page on a target site. Configure depth, domain constraints, and device viewports — then let the crawler do the work.',
    features: [
      { title: 'Recursive Link Discovery', desc: 'Crawlee\'s enqueueLinks() collects internal links from anchor tags, filtered by hostname, path prefix, and configurable max depth per job.', image: productAnalysis },
      { title: 'Full JavaScript Rendering', desc: 'Puppeteer loads every page with networkidle0 strategy, ensuring SPAs, lazy-loaded content, and client-side routing all render completely.', image: heroCode },
      { title: 'URL Deduplication', desc: 'Crawlee\'s built-in RequestQueue prevents revisiting the same URL, keeping crawls efficient even on complex site structures.', image: productDesign },
      { title: 'Configurable Limits', desc: 'Set max pages, max depth, allowed path prefixes, and device presets per job. Control exactly what gets crawled and captured.', image: heroDashboard },
    ],
  },
  tokens: {
    icon: Palette, accent: '#38BDF8', name: 'design-tokens', heroImage: productTokens,
    title: 'Extract colors, typography, and spacing systems',
    desc: 'Webimic\'s Design Token extractor reads computed CSS, clusters pixel colors via K-means, and builds structured token catalogs tied to pages and components.',
    features: [
      { title: 'Color Palette Extraction', desc: 'Combines CSS color declaration parsing with K-means pixel clustering on screenshots to identify dominant colors, classify them into roles, and merge similar values.', image: productTokens },
      { title: 'Typography Sampling', desc: 'Samples DOM headings, paragraphs, and buttons for computed font-family, font-size, font-weight, and line-height. Groups results into reusable text styles.', image: productDesign },
      { title: 'Spacing & Layout Detection', desc: 'Collects frequently used margin, padding, and gap values. Identifies recurring layout patterns like card grids, hero sections, and navigation structures.', image: heroCode },
      { title: 'Animation Recording', desc: 'Inspects CSS transition and animation properties. Connects to Chrome DevTools Protocol via Puppeteer for richer animation info when needed.', image: abstractDark },
    ],
  },
  docs: {
    icon: FileText, accent: '#A78BFA', name: 'doc-generator', heroImage: productPdf,
    title: 'Generate rich PDF specs with screenshots',
    desc: 'Doc A captures the observed UI specification — screenshots, token tables, and component breakdowns — structured for both human review and LLM consumption.',
    features: [
      { title: 'Site Overview Section', desc: 'Job parameters, total pages crawled, devices used, and timestamps. The executive summary of every analysis.', image: heroDashboard },
      { title: 'Per-Page Breakdowns', desc: 'Large screenshot at top, followed by tables of colors used, typography styles, spacing scales, and animation details for each key page.', image: productPdf },
      { title: 'Component Crops', desc: 'Cropped screenshots of navbar, hero sections, cards, CTAs, footer, and modals — placed next to their specifications for easy reference.', image: productDesign },
      { title: 'Print-Quality PDFs', desc: 'HTML templates with embedded images are printed to PDF via Puppeteer\'s page.pdf(), producing high-quality documents with consistent formatting.', image: productAnalysis },
    ],
  },
  redesign: {
    icon: PenTool, accent: '#F472B6', name: 'redesign-engine', heroImage: productDesign,
    title: 'Smart redesign suggestions for any site',
    desc: 'Doc B builds on Doc A with differentiated proposals — alternate palettes, typography changes, dark mode options, and accessibility improvements.',
    features: [
      { title: 'Visual Comparisons', desc: 'Side-by-side panels showing the original screenshot alongside an annotated version highlighting recommended changes in palette, fonts, and layout.', image: productTokens },
      { title: 'Per-Token Change Logs', desc: 'For each color, text style, and component: original value, proposed value, and a brief rationale covering contrast, modernity, or consistency.', image: heroCode },
      { title: 'Dark Mode Suggestions', desc: 'Recommendations for alternate color tokens suitable for dark mode, with contrast ratio analysis for readability.', image: abstractDark },
      { title: 'Accessibility Notes', desc: 'WCAG contrast checks, typography adjustments for readability, and suggestions for better focus states and touch targets.', image: productDesign },
    ],
  },
  screenshots: {
    icon: Eye, accent: '#00E8C6', name: 'screenshot-capture', heroImage: productAnalysis,
    title: 'Full-page renders across all viewports',
    desc: 'Capture pixel-perfect full-page screenshots at desktop, tablet, and mobile breakpoints for every page in your analysis.',
    features: [
      { title: 'Multi-Device Viewports', desc: 'Puppeteer sets viewport dimensions for each device preset and captures fullPage screenshots, ensuring responsive layouts are documented accurately.', image: heroDashboard },
      { title: 'Cloud Storage', desc: 'Screenshots are uploaded to object storage (S3/MinIO) and referenced in Page documents, keeping your MongoDB lean and your images fast to load.', image: productPdf },
      { title: 'Component-Level Crops', desc: 'Beyond full-page captures, Webimic identifies key components and generates cropped screenshots for detailed comparison.', image: productDesign },
      { title: 'Consistent Rendering', desc: 'Pages are fully loaded with networkidle0 wait strategy and font loading checks before capture, ensuring screenshots match what real users see.', image: heroCode },
    ],
  },
  components: {
    icon: Layers, accent: '#38BDF8', name: 'component-library', heroImage: productDesign,
    title: 'Auto-detect and catalog UI components',
    desc: 'Webimic identifies recurring UI patterns — navbars, heroes, card grids, CTAs, footers — and catalogs them with screenshots and specifications.',
    features: [
      { title: 'Structural Heuristics', desc: 'DOM analysis identifies recurring patterns based on element structure, positioning, and class naming conventions.', image: heroCode },
      { title: 'Visual Cataloging', desc: 'Each detected component gets a cropped screenshot, bounding box coordinates, and associated design tokens.', image: productTokens },
      { title: 'Cross-Page Matching', desc: 'Components appearing on multiple pages (like shared navbars or footers) are identified and documented once with page references.', image: productAnalysis },
      { title: 'Export-Ready Specs', desc: 'Component specs are included in Doc A with enough detail to recreate them in any framework.', image: productPdf },
    ],
  },
  animations: {
    icon: Move, accent: '#A78BFA', name: 'animation-inspector', heroImage: abstractDark,
    title: 'Record CSS transitions and keyframes',
    desc: 'Capture every CSS transition, animation property, and timing function used across the target site.',
    features: [
      { title: 'CSS Property Inspection', desc: 'Reads transition and animation-* properties from computed styles for every element on every page.', image: heroCode },
      { title: 'DevTools Protocol', desc: 'Connects to Chrome DevTools Protocol via Puppeteer for richer animation events and timeline data when CSS inspection alone is insufficient.', image: abstractDark },
      { title: 'Trigger Documentation', desc: 'Records what triggers each animation — hover, scroll, load, click — along with element selectors for precise reproduction.', image: productDesign },
      { title: 'Timing Catalog', desc: 'Builds a catalog of durations, delays, and easing functions used across the site, identifying the site\'s motion design language.', image: productTokens },
    ],
  },
};

export default function ProductSubPage() {
  const { slug } = useParams();
  const page = productPages[slug];

  if (!page) {
    return (
      <section className="py-32">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Page not found</h1>
            <p className="text-muted mb-8">This product page doesn't exist yet.</p>
            <Button to="/">Go home</Button>
          </div>
        </Container>
      </section>
    );
  }

  const Icon = page.icon;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <CircuitBackground color={page.accent} density={0.45} />
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${page.accent}15` }}>
                  <Icon size={18} style={{ color: page.accent }} />
                </div>
                <span className="text-sm font-mono font-medium text-muted">{page.name}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6">{page.title}</h1>
              <p className="text-lg text-muted-light max-w-2xl mb-8 leading-relaxed">{page.desc}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/dashboard/new" size="lg">Get started</Button>
                <Button variant="secondary" size="lg" to="/docs">Documentation</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <LogoTicker heading="Used by design-driven teams worldwide" />

      {/* Features with real images - alternating layout */}
      {page.features.map((feat, i) => {
        const reversed = i % 2 !== 0;
        return (
          <section key={i} className={`py-16 md:py-24 ${i % 2 === 0 ? 'bg-dark-800' : 'bg-dark-900'}`}>
            <Container>
              <ScrollReveal>
                <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <h3 className="text-2xl font-bold mb-4">{feat.title}</h3>
                    <p className="text-muted-light leading-relaxed text-lg">{feat.desc}</p>
                  </div>
                  <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
                    <div className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none" style={{
                      background: `radial-gradient(ellipse, ${page.accent}06, transparent 70%)`
                    }} />
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                      <img src={feat.image} alt={feat.title} className="w-full h-[260px] object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/50 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </Container>
          </section>
        );
      })}

      <BottomCTA title={`Start using ${page.name.replace(/-/g, ' ')}`} subtitle="Sign up free and analyze your first site in minutes." />
    </>
  );
}
