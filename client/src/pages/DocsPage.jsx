import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import CircuitGrid from '../components/ui/CircuitGrid';
import BottomCTA from '../components/sections/BottomCTA';
import { BookOpen, Terminal, FileText, Palette, Eye, Scan, PenTool, Zap, ArrowRight, Copy, Check, ChevronDown, ExternalLink, Code, Layers, Move } from 'lucide-react';

const sections = [
  { id: 'quickstart', icon: Zap, label: 'Quick Start' },
  { id: 'concepts', icon: BookOpen, label: 'Core Concepts' },
  { id: 'api', icon: Terminal, label: 'API Reference' },
  { id: 'doca', icon: FileText, label: 'Understanding Doc A' },
  { id: 'docb', icon: PenTool, label: 'Understanding Doc B' },
  { id: 'config', icon: Layers, label: 'Configuration' },
  { id: 'llm', icon: Code, label: 'Using with LLMs' },
];

const apiEndpoints = [
  {
    method: 'POST', path: '/api/jobs', desc: 'Create a new analysis job',
    body: `{
  "siteUrl": "https://example.com",
  "config": {
    "maxDepth": 3,
    "maxPages": 50,
    "devices": { "desktop": true, "tablet": true, "mobile": true },
    "captureAnimations": true,
    "generateRedesign": true
  }
}`,
    response: `{
  "id": "job_abc123",
  "siteUrl": "https://example.com",
  "status": "QUEUED",
  "createdAt": "2026-06-01T10:30:00Z"
}`,
  },
  {
    method: 'GET', path: '/api/jobs', desc: 'List all jobs with pagination',
    params: 'page=1&limit=20&status=COMPLETED',
    response: `{
  "jobs": [...],
  "pagination": { "page": 1, "limit": 20, "total": 47, "pages": 3 }
}`,
  },
  {
    method: 'GET', path: '/api/jobs/:id', desc: 'Get full job detail with tokens and pages',
    response: `{
  "id": "job_abc123",
  "siteUrl": "https://example.com",
  "status": "COMPLETED",
  "config": {...},
  "pagesFound": 24,
  "pagesCrawled": 24,
  "tokensExtracted": 312,
  "documents": {
    "docA": "docs/job_abc123/doc-a.pdf",
    "docB": "docs/job_abc123/doc-b.pdf"
  },
  "duration": 272000
}`,
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('quickstart');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const copyCode = (code, idx) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <CircuitGrid intensity={0.3} color="#38BDF8" className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Documentation</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5">
                Webimic Documentation
              </h1>
              <p className="text-lg text-muted-light leading-relaxed max-w-2xl">
                Everything you need to analyze websites, extract design systems, and generate PDF specifications with Webimic.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Main docs layout */}
      <section className="pb-20">
        <Container>
          <div className="grid lg:grid-cols-[240px_1fr] gap-10">
            {/* Sidebar */}
            <aside className="hidden lg:block">
              <nav className="sticky top-20 space-y-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const active = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer text-left ${
                        active ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-400' : 'text-muted hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      <Icon size={15} />
                      {s.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Content */}
            <div className="min-w-0 space-y-16">
              {/* Quick Start */}
              <DocSection id="quickstart" title="Quick Start" icon={Zap}>
                <p className="text-muted-light mb-6 leading-relaxed">Get your first site analysis running in under 2 minutes.</p>
                <div className="space-y-6">
                  <Step number={1} title="Sign up and get your API key">
                    <p className="text-sm text-muted-light mb-3">Create a free account at <Link to="/signup" className="text-accent-400 hover:underline">webimic.com/signup</Link> and grab your API key from the dashboard settings.</p>
                  </Step>
                  <Step number={2} title="Submit your first analysis">
                    <CodeBlock code={`curl -X POST https://api.webimic.com/api/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "siteUrl": "https://stripe.com" }'`} idx="qs-1" copiedIdx={copiedIdx} onCopy={copyCode} />
                  </Step>
                  <Step number={3} title="Check the status">
                    <CodeBlock code={`curl https://api.webimic.com/api/jobs/job_abc123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`} idx="qs-2" copiedIdx={copiedIdx} onCopy={copyCode} />
                  </Step>
                  <Step number={4} title="Download your PDFs">
                    <p className="text-sm text-muted-light">Once status is <code className="text-accent-400 bg-accent-400/10 px-1.5 py-0.5 rounded text-xs">COMPLETED</code>, download Doc A and Doc B from the job detail page or via the API response's <code className="text-accent-400 bg-accent-400/10 px-1.5 py-0.5 rounded text-xs">documents</code> field.</p>
                  </Step>
                </div>
              </DocSection>

              {/* Core Concepts */}
              <DocSection id="concepts" title="Core Concepts" icon={BookOpen}>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Scan, title: 'Crawling', desc: 'Webimic uses Crawlee\'s PuppeteerCrawler to recursively discover internal links from a seed URL. Pages are filtered by hostname, path prefix, and configurable depth/page limits.' },
                    { icon: Eye, title: 'Screenshot Capture', desc: 'Each discovered page is rendered in headless Chromium with networkidle0 wait. Full-page screenshots are captured at desktop (1440px), tablet (768px), and mobile (390px) viewports.' },
                    { icon: Palette, title: 'Token Extraction', desc: 'Colors are extracted via CSS parsing + K-means pixel clustering. Typography is sampled from computed styles. Spacing scales and animation properties are cataloged from stylesheets.' },
                    { icon: FileText, title: 'PDF Generation', desc: 'Doc A documents the observed UI. Doc B proposes differentiated redesigns. Both embed screenshots and are structured for LLM consumption via Puppeteer\'s page.pdf().' },
                  ].map((c, i) => {
                    const Icon = c.icon;
                    return (
                      <div key={i} className="glass-card rounded-xl p-5 hover:border-white/15 transition-all">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Icon size={14} className="text-blue-400" />
                          </div>
                          <h4 className="text-sm font-bold">{c.title}</h4>
                        </div>
                        <p className="text-xs text-muted-light leading-relaxed">{c.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </DocSection>

              {/* API Reference */}
              <DocSection id="api" title="API Reference" icon={Terminal}>
                <p className="text-muted-light mb-6 leading-relaxed">All endpoints require authentication via <code className="text-accent-400 bg-accent-400/10 px-1.5 py-0.5 rounded text-xs">Authorization: Bearer YOUR_API_KEY</code> header.</p>
                <div className="space-y-6">
                  {apiEndpoints.map((ep, i) => (
                    <div key={i} className="glass-card rounded-xl overflow-hidden">
                      <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${ep.method === 'POST' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-blue-400/10 text-blue-400'}`}>
                          {ep.method}
                        </span>
                        <code className="text-sm font-mono text-white">{ep.path}</code>
                        <span className="text-xs text-muted ml-auto">{ep.desc}</span>
                      </div>
                      {ep.params && (
                        <div className="px-5 py-2 border-b border-white/5 bg-white/[0.01]">
                          <span className="text-xs text-muted">Query params: </span>
                          <code className="text-xs text-muted-light font-mono">{ep.params}</code>
                        </div>
                      )}
                      {ep.body && (
                        <div className="border-b border-white/5">
                          <div className="px-5 py-2 bg-white/[0.01]">
                            <span className="text-xs text-muted font-semibold">Request body</span>
                          </div>
                          <CodeBlock code={ep.body} idx={`api-body-${i}`} copiedIdx={copiedIdx} onCopy={copyCode} noBorder />
                        </div>
                      )}
                      <div>
                        <div className="px-5 py-2 bg-white/[0.01]">
                          <span className="text-xs text-muted font-semibold">Response</span>
                        </div>
                        <CodeBlock code={ep.response} idx={`api-resp-${i}`} copiedIdx={copiedIdx} onCopy={copyCode} noBorder />
                      </div>
                    </div>
                  ))}
                </div>
              </DocSection>

              {/* Doc A */}
              <DocSection id="doca" title="Understanding Doc A — Observed UI Spec" icon={FileText}>
                <p className="text-muted-light mb-6 leading-relaxed">Doc A captures the complete observed design system of the analyzed site. It contains:</p>
                <div className="space-y-4">
                  {[
                    { title: 'Site Overview', desc: 'Job parameters, total pages crawled, device viewports used, and timestamps.' },
                    { title: 'Key Pages', desc: 'For each page: large full-page screenshot, text summary of the page role, and tables of colors, typography, spacing, and animations used.' },
                    { title: 'Component Breakdowns', desc: 'Cropped screenshots of detected components (navbar, hero, cards, CTAs, footer, modals) placed next to their specifications.' },
                    { title: 'Token Catalog', desc: 'Complete catalog of all extracted design tokens: color palette with swatches, typography scale, spacing values, and animation timing functions.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-7 h-7 rounded-lg bg-accent-400/10 flex items-center justify-center flex-shrink-0 text-accent-400 text-xs font-bold">{i + 1}</div>
                      <div>
                        <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DocSection>

              {/* Doc B */}
              <DocSection id="docb" title="Understanding Doc B — Redesign Spec" icon={PenTool}>
                <p className="text-muted-light mb-6 leading-relaxed">Doc B builds on Doc A with differentiated suggestions to learn from without cloning:</p>
                <div className="space-y-4">
                  {[
                    { title: 'Visual Comparisons', desc: 'Side-by-side panels: original screenshot on the left, annotated version showing recommended changes on the right.' },
                    { title: 'Per-Token Change Logs', desc: 'For each color, text style, and component: original value → proposed value with a brief rationale (contrast, modernity, consistency).' },
                    { title: 'Dark Mode Suggestions', desc: 'Alternate color tokens for dark mode with contrast ratio analysis for WCAG compliance.' },
                    { title: 'Accessibility Notes', desc: 'WCAG contrast checks, typography adjustments, focus state suggestions, and touch target sizing recommendations.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0 text-pink-400 text-xs font-bold">{i + 1}</div>
                      <div>
                        <h4 className="text-sm font-bold mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DocSection>

              {/* Configuration */}
              <DocSection id="config" title="Configuration" icon={Layers}>
                <p className="text-muted-light mb-6 leading-relaxed">All configuration options available when creating an analysis job:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Option</th>
                        <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Type</th>
                        <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Default</th>
                        <th className="text-left py-3 text-xs font-semibold text-muted uppercase">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        ['maxDepth', 'number', '3', 'Maximum crawl depth from the seed URL'],
                        ['maxPages', 'number', '50', 'Maximum number of pages to crawl'],
                        ['devices.desktop', 'boolean', 'true', 'Capture at 1440×900 viewport'],
                        ['devices.tablet', 'boolean', 'true', 'Capture at 768×1024 viewport'],
                        ['devices.mobile', 'boolean', 'true', 'Capture at 390×844 viewport'],
                        ['captureAnimations', 'boolean', 'true', 'Record CSS transitions and keyframes'],
                        ['generateRedesign', 'boolean', 'true', 'Generate Doc B (redesign proposals)'],
                      ].map(([opt, type, def, desc], i) => (
                        <tr key={i}>
                          <td className="py-2.5 pr-4"><code className="text-accent-400 text-xs">{opt}</code></td>
                          <td className="py-2.5 pr-4 text-muted text-xs">{type}</td>
                          <td className="py-2.5 pr-4 font-mono text-xs text-muted-light">{def}</td>
                          <td className="py-2.5 text-muted-light text-xs">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DocSection>

              {/* Using with LLMs */}
              <DocSection id="llm" title="Using with LLMs" icon={Code}>
                <p className="text-muted-light mb-6 leading-relaxed">Webimic PDFs are structured specifically for LLM consumption. Upload them as context to any strong model:</p>
                <CodeBlock
                  code={`# Example prompt for Claude or GPT:

"Using the attached UI spec (Doc A), generate a React + Tailwind
landing page that matches the documented color palette, typography,
and layout patterns. Use the component screenshots as reference
for the hero section, navigation bar, and pricing cards."

# The PDF includes:
# - Embedded screenshots for visual reference
# - Exact color hex values with role classifications
# - Typography specs (font, size, weight, line-height)
# - Spacing scale values
# - Animation timing functions`}
                  idx="llm-1"
                  copiedIdx={copiedIdx}
                  onCopy={copyCode}
                />
                <div className="mt-6 glass-card rounded-xl p-5 border-accent-400/20">
                  <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                    <Zap size={14} className="text-accent-400" /> Pro tip
                  </h4>
                  <p className="text-xs text-muted-light leading-relaxed">
                    For best results, upload both Doc A and Doc B together. Ask the LLM to use the redesign suggestions from Doc B instead of copying the original design directly. This produces differentiated output while maintaining the structural quality of the reference site.
                  </p>
                </div>
              </DocSection>
            </div>
          </div>
        </Container>
      </section>

      <BottomCTA title="Ready to start analyzing?" subtitle="Create your free account and run your first analysis in minutes." />
    </>
  );
}

function DocSection({ id, title, icon: Icon, children }) {
  return (
    <ScrollReveal>
      <section id={id} className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Icon size={16} className="text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {children}
      </section>
    </ScrollReveal>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-accent-400/10 flex items-center justify-center flex-shrink-0 text-accent-400 text-sm font-bold border border-accent-400/20">
        {number}
      </div>
      <div className="flex-1 pt-1">
        <h4 className="text-base font-semibold mb-2">{title}</h4>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ code, idx, copiedIdx, onCopy, noBorder = false }) {
  return (
    <div className={`relative group ${noBorder ? '' : 'glass-card rounded-xl overflow-hidden'}`}>
      <pre className="p-4 text-xs font-mono text-muted-light overflow-x-auto leading-relaxed bg-dark-950/60">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => onCopy(code, idx)}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 border border-white/10 text-muted hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        {copiedIdx === idx ? <Check size={13} className="text-accent-400" /> : <Copy size={13} />}
      </button>
    </div>
  );
}
