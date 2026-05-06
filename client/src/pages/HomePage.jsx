import HeroSection from '../components/sections/HeroSection';
import LogoTicker from '../components/sections/LogoTicker';
import FeatureTabs from '../components/sections/FeatureTabs';
import FrameworkCards from '../components/sections/FrameworkCards';
import CustomerStories from '../components/sections/CustomerStories';
import StatsSection from '../components/sections/StatsSection';
import FAQSection from '../components/sections/FAQSection';
import BottomCTA from '../components/sections/BottomCTA';
import Container from '../components/ui/Container';
import ScrollReveal from '../components/ui/ScrollReveal';
import ParallaxImage from '../components/ui/ParallaxImage';
import { WebimicPipelineDiagram, WireDiagram } from '../components/ui/FlowchartDiagram';
import { ArrowRight, Scan, Palette, FileText, PenTool, Building2, Users, Code, Briefcase, Check, X, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const useCases = [
  {
    icon: Building2, title: 'Design Agencies',
    desc: 'Auto-generate client-ready UI breakdowns from reference sites. Accelerate pitches with detailed design specs and visual comparisons.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
    color: '#00E8C6',
  },
  {
    icon: Users, title: 'Freelancers',
    desc: 'Analyze competitor sites in minutes, not hours. Feed specs into Claude or GPT and scaffold entire projects from documented design tokens.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80',
    color: '#38BDF8',
  },
  {
    icon: Code, title: 'Product Teams',
    desc: 'Maintain design system consistency across multiple products. Benchmark against industry leaders with automated UI analysis reports.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop&q=80',
    color: '#A78BFA',
  },
  {
    icon: Briefcase, title: 'Enterprise',
    desc: 'Automated competitor benchmarking at scale. Self-hosted workers, custom SSO, and SLA-backed infrastructure for large organizations.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&q=80',
    color: '#F472B6',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Submit a URL',
    desc: 'Paste any public website URL. Configure crawl depth, viewport devices, and output preferences.',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=700&h=400&fit=crop&q=80',
  },
  {
    step: '02',
    title: 'Automated Analysis',
    desc: 'Webimic crawls every page, captures screenshots at 3 viewports, extracts colors, typography, spacing, and animations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=400&fit=crop&q=80',
  },
  {
    step: '03',
    title: 'Rich PDF Specs',
    desc: 'Get two image-rich PDFs: Doc A (observed UI spec) and Doc B (redesign proposals). Ready to feed into any LLM.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=700&h=400&fit=crop&q=80',
  },
];

const comparisonRows = [
  { feature: 'Full-site crawling', webimic: true, manual: false },
  { feature: 'Multi-device screenshots', webimic: true, manual: false },
  { feature: 'Color palette extraction', webimic: true, manual: false },
  { feature: 'Typography sampling', webimic: true, manual: false },
  { feature: 'Animation recording', webimic: true, manual: false },
  { feature: 'PDF report generation', webimic: true, manual: false },
  { feature: 'LLM-ready output', webimic: true, manual: false },
  { feature: 'Time per analysis', webimicText: '~5 min', manualText: '4-8 hours' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoTicker />
      <FeatureTabs />

      {/* Pipeline Flowchart Section */}
      <section className="py-20 md:py-28 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <Container>
          <ScrollReveal variant="blurIn">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">Architecture</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From URL to LLM-ready spec</h2>
              <p className="text-muted-light max-w-xl mx-auto">
                One URL in, two rich PDF reports out. Here's the complete data pipeline powering every Webimic analysis.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15} variant="scaleIn">
            <div className="max-w-4xl mx-auto">
              <WebimicPipelineDiagram />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Horizontal Wire Diagram — Summary Flow */}
      <section className="py-8 bg-dark-800 relative overflow-hidden">
        <Container>
          <ScrollReveal variant="fadeUp">
            <WireDiagram
              steps={['URL Input', 'Crawl', 'Screenshot', 'Extract', 'Generate', 'PDF Output']}
              color="#00E8C6"
              height={140}
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* How It Works — Visual Timeline */}
      <section className="py-24 md:py-32 bg-dark-800 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <Container>
          <ScrollReveal variant="blurIn">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">3 Simple Steps</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">From URL to production-ready specs</h2>
              <p className="text-muted-light max-w-xl mx-auto text-lg">Analyze any website in minutes, not hours.</p>
            </div>
          </ScrollReveal>

          <div className="space-y-20 md:space-y-28">
            {howItWorks.map((item, i) => (
              <ScrollReveal key={i} variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={0.1}>
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl font-extrabold text-gradient opacity-60">{item.step}</span>
                      <div className="h-px flex-1 bg-gradient-to-r from-accent-400/30 to-transparent" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-light text-lg leading-relaxed">{item.desc}</p>
                  </div>
                  <div className={i % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                    <ParallaxImage src={item.image} alt={item.title} className="h-[280px] md:h-[340px]" speed={0.1} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <Container>
          <ScrollReveal variant="blurIn">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">Use Cases</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Built for every design workflow</h2>
              <p className="text-muted-light max-w-xl mx-auto text-lg">From solo freelancers to enterprise agencies, Webimic accelerates UI intelligence.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
                  <div className="glass-card-hover rounded-2xl overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img src={uc.image} alt={uc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 rounded-xl border border-white/10 bg-dark-900/60 backdrop-blur-sm flex items-center justify-center">
                        <Icon size={18} style={{ color: uc.color }} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2">{uc.title}</h3>
                      <p className="text-sm text-muted-light leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison Table: Webimic vs Manual */}
      <section className="py-24 md:py-32 bg-dark-800 relative overflow-hidden">
        <Container size="narrow">
          <ScrollReveal variant="blurIn">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">Why Webimic?</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Manual work vs. automated intelligence</h2>
              <p className="text-muted-light max-w-xl mx-auto">Stop spending hours on manual screenshots and eyedropper tools.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scaleIn" delay={0.15}>
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] border-b border-white/10">
                <div className="p-4 sm:p-5 text-sm font-semibold text-muted">Feature</div>
                <div className="p-4 sm:p-5 text-center text-sm font-bold text-accent-400">Webimic</div>
                <div className="p-4 sm:p-5 text-center text-sm font-semibold text-muted-light">Manual</div>
              </div>
              {comparisonRows.map((row, i) => (
                <ScrollReveal key={i} variant="fadeUp" delay={0.05 * i}>
                  <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <div className="p-4 sm:p-5 text-sm text-muted-light">{row.feature}</div>
                    <div className="p-4 sm:p-5 flex items-center justify-center">
                      {row.webimicText
                        ? <span className="text-sm font-semibold text-accent-400">{row.webimicText}</span>
                        : row.webimic
                          ? <Check size={18} className="text-accent-400" />
                          : <X size={18} className="text-red-400/50" />
                      }
                    </div>
                    <div className="p-4 sm:p-5 flex items-center justify-center">
                      {row.manualText
                        ? <span className="text-sm text-muted">{row.manualText}</span>
                        : row.manual
                          ? <Check size={18} className="text-accent-400" />
                          : <X size={18} className="text-red-400/50" />
                      }
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <FrameworkCards />

      {/* Featured Testimonial with Parallax */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
        <Container>
          <ScrollReveal variant="scaleIn">
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto relative">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                    alt="Team using Webimic"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800/60 lg:bg-gradient-to-l lg:from-transparent lg:to-transparent" />
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-accent-400/30 mb-6">
                    <path d="M11 7H7a4 4 0 00-4 4v0a4 4 0 004 4h1a1 1 0 011 1v1a1 1 0 01-1 1H7a8 8 0 01-8-8v0a8 8 0 018-8h3a1 1 0 011 1v3a1 1 0 01-1 1z" fill="currentColor"/>
                    <path d="M23 7h-4a4 4 0 00-4 4v0a4 4 0 004 4h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a8 8 0 01-8-8v0a8 8 0 018-8h3a1 1 0 011 1v3a1 1 0 01-1 1z" fill="currentColor"/>
                  </svg>
                  <p className="text-xl md:text-2xl font-semibold leading-relaxed mb-8">
                    Webimic cut our design research time by <span className="text-gradient">80%</span>. What used to take our team an entire day now takes 10 minutes with automated specs.
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1"
                      alt="Sarah Chen"
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent-400/20"
                    />
                    <div>
                      <p className="font-semibold">Sarah Chen</p>
                      <p className="text-sm text-muted">Head of Design, Designlab</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <CustomerStories />
      <StatsSection />
      <FAQSection />
      <BottomCTA />
    </>
  );
}
