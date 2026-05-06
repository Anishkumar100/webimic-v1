import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import ParallaxImage from '../components/ui/ParallaxImage';
import { WebimicPipelineDiagram, WireDiagram } from '../components/ui/FlowchartDiagram';
import LogoTicker from '../components/sections/LogoTicker';
import FAQSection from '../components/sections/FAQSection';
import BottomCTA from '../components/sections/BottomCTA';
import { Scan, Palette, FileText, PenTool, ArrowRight, Eye, Layers, Zap, Globe, Move, Shield } from 'lucide-react';

const productAnalysis = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&q=80';
const productDesign = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1';
const productTokens = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=500&fit=crop&q=80';
const productPdf = 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=500&fit=crop&q=80';
const sampleReport = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80';
const heroDashboard = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80';

const features = [
  {
    icon: Scan, title: 'Crawl entire sites with one click', accent: '#00E8C6',
    desc: 'Submit a URL and Webimic discovers every internal page automatically. Crawlee\'s PuppeteerCrawler handles recursive link discovery with configurable depth, domain constraints, and page limits — so you capture entire sites without manual work.',
    image: productAnalysis,
  },
  {
    icon: Palette, title: 'Extract full design systems automatically', accent: '#38BDF8',
    desc: 'Webimic reads every stylesheet, samples DOM elements, and runs pixel-level analysis to build a complete token set. Colors are clustered via K-means, typography is grouped by role, spacing scales are identified from computed CSS, and animations are recorded from transition properties.',
    image: productTokens,
  },
  {
    icon: FileText, title: 'Generate image-rich PDF specs for LLMs', accent: '#A78BFA',
    desc: 'Doc A embeds large screenshots alongside token tables and component specs — structured specifically for LLM consumption. Upload the PDF as context to Claude or GPT and get production-ready component scaffolding in seconds.',
    image: productPdf,
  },
  {
    icon: Shield, title: 'Built for teams and SaaS scale', accent: '#F472B6',
    desc: 'Webimic runs worker processes that pull jobs from a Redis-backed queue. Add more workers to handle more jobs — no code changes needed. MongoDB stores all metadata, tokens, and document paths. Object storage holds screenshots and PDFs securely.',
    image: productDesign,
  },
];

const integrations = [
  { name: 'Puppeteer', icon: Eye }, { name: 'Crawlee', icon: Scan }, { name: 'MongoDB', icon: Layers },
  { name: 'Redis', icon: Zap }, { name: 'React', icon: Move }, { name: 'Tailwind', icon: Palette },
  { name: 'S3', icon: Globe }, { name: 'BullMQ', icon: Shield },
];

const faqs = [
  { q: 'Is Webimic open source?', a: 'The core analysis engine is proprietary SaaS, but Webimic is built on open source tools including Crawlee, Puppeteer, and the MERN stack. We plan to open-source selected extraction utilities in the future.' },
  { q: 'How do I use Webimic with LLMs?', a: 'Webimic generates PDF specs (Doc A and Doc B) with embedded screenshots that are structured for LLM consumption. Upload them as context to any strong LLM like Claude and ask it to generate components, pages, or entire applications based on the documented design system.' },
  { q: 'Can Webimic analyze JavaScript-heavy SPAs?', a: 'Yes. Webimic uses headless Chromium via Puppeteer with full JavaScript rendering. Pages are loaded with networkidle0 wait strategy to ensure all dynamic content, lazy-loaded images, and client-side routing are fully rendered before capture.' },
];

export default function ProductPlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <CircuitBackground color="#38BDF8" density={0.5} />
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-lg bg-accent-400/10 flex items-center justify-center">
                  <Scan size={18} className="text-accent-400" />
                </div>
                <span className="text-sm font-mono font-medium text-muted">webimic-platform</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.06] mb-6">
                Understand and rebuild{' '}
                <span className="text-gradient">any website UI</span>
              </h1>
              <p className="text-lg text-muted-light max-w-2xl mb-8 leading-relaxed">
                Webimic is the full-stack UI analysis platform. Crawl any public site, capture screenshots, extract design tokens, and generate image-rich PDF specs ready for LLM-powered rebuilding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/dashboard/new" size="lg">Analyze a site</Button>
                <Button variant="secondary" size="lg" to="/docs">Read the docs</Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <LogoTicker heading="Used by design-driven teams at fast-growing companies" />

      {/* Wire Diagram — Data Flow */}
      <section className="py-8 bg-dark-950">
        <Container>
          <ScrollReveal variant="fadeUp">
            <WireDiagram
              steps={['Input URL', 'Crawl', 'Screenshot', 'Tokens', 'Doc A', 'Doc B']}
              color="#38BDF8"
              height={130}
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Feature Sections with real images */}
      {features.map((feat, i) => {
        const Icon = feat.icon;
        const reversed = i % 2 !== 0;
        return (
          <section key={i} className={`py-20 md:py-28 ${i % 2 === 0 ? 'bg-dark-800' : 'bg-dark-900'}`}>
            <Container>
              <ScrollReveal>
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
                  <div className={reversed ? 'lg:order-2' : ''}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: `${feat.accent}15` }}>
                      <Icon size={20} style={{ color: feat.accent }} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">{feat.title}</h2>
                    <p className="text-muted-light leading-relaxed text-lg">{feat.desc}</p>
                  </div>
                  <div className={`relative ${reversed ? 'lg:order-1' : ''}`}>
                    <div className="absolute -inset-6 rounded-3xl blur-3xl pointer-events-none" style={{
                      background: `radial-gradient(ellipse at center, ${feat.accent}08, transparent 70%)`
                    }} />
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
                      <img src={feat.image} alt={feat.title} className="w-full h-[300px] object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </Container>
          </section>
        );
      })}

      {/* Pipeline Flowchart */}
      <section className="py-20 md:py-28 bg-dark-950">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Architecture</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Webimic pipeline</h2>
              <p className="text-muted-light max-w-xl mx-auto">From a single URL to rich, structured design specifications — fully automated.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="max-w-2xl mx-auto">
              <WebimicPipelineDiagram />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Sample Report Card with real image */}
      <section className="py-20 md:py-28 bg-dark-800">
        <Container>
          <ScrollReveal>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img src={sampleReport} alt="Sample Webimic report" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800/50 md:bg-gradient-to-l md:from-transparent md:to-transparent" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded bg-accent-400/10 flex items-center justify-center">
                      <Eye size={14} className="text-accent-400" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent-400">Sample Report</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">See a full Webimic sample analysis</h3>
                  <p className="text-muted-light mb-6 leading-relaxed">
                    Explore a complete Doc A and Doc B generated from a real website analysis. See exactly what screenshots, tokens, and redesign suggestions look like in practice.
                  </p>
                  <Button to="/dashboard/new" className="self-start">Open sample project</Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-dark-900">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold mb-2">Built on battle-tested infrastructure</h3>
              <Link to="/docs" className="text-sm text-accent-400 font-semibold inline-flex items-center gap-1.5">
                See our tech stack <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {integrations.map((int, i) => {
                const Icon = int.icon;
                return (
                  <div key={i} className="flex items-center gap-2 px-4 py-3 glass-card rounded-xl hover:border-white/15 transition-all">
                    <Icon size={18} className="text-accent-400/60" />
                    <span className="text-sm font-medium text-muted-light">{int.name}</span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <FAQSection title="FAQs for Webimic" faqs={faqs} />
      <BottomCTA title="See what any website is really made of" subtitle="Webimic gives you full visibility into any site's design system. Start analyzing today." />
    </>
  );
}
