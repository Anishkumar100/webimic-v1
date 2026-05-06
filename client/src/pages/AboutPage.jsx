import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import ParallaxImage from '../components/ui/ParallaxImage';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import BottomCTA from '../components/sections/BottomCTA';
import { WireDiagram, CircuitBackground } from '../components/ui/FlowchartDiagram';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, Rocket } from 'lucide-react';

const principles = [
  { icon: Rocket, title: 'Ship and iterate', desc: 'We ship v0s faster than feels comfortable because great products are built through rapid iteration and real-world feedback.' },
  { icon: Lightbulb, title: 'Design is intelligence made visible', desc: 'Every pixel tells a story. Our tools decode that story so teams can learn from the best and build something better.' },
  { icon: Target, title: 'Own your domain', desc: 'We are a team of owners. Each person drives ideas forward with conviction and listens with humility.' },
  { icon: Users, title: 'Run toward hard problems', desc: 'Reverse-engineering entire design systems is hard. Generating differentiated redesign specs is harder. We lean into that difficulty.' },
];

const milestones = [
  { year: '2024', title: 'Idea born at TheWebytes', desc: 'Simple Node script to screenshot and extract colors from a single URL.' },
  { year: '2025 Q1', title: 'Multi-page crawling launched', desc: 'Crawlee integration, recursive link discovery, and configurable depth limits.' },
  { year: '2025 Q3', title: 'Doc A + Token extraction', desc: 'Full PDF generation with embedded screenshots and structured design tokens.' },
  { year: '2026 Q1', title: 'Webimic v2 — Redesign Engine', desc: 'Doc B with differentiated redesign proposals, dark mode, and accessibility audits.' },
  { year: '2026 Q2', title: 'Public beta launch', desc: '500+ active teams, 50K+ sites analyzed, enterprise features in development.' },
];

const teamMembers = [
  { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
  { name: 'Marcus Rivera', role: 'CTO', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
  { name: 'James Okafor', role: 'Engineering Lead', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
  { name: 'Priya Sharma', role: 'Product Manager', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
  { name: 'Elena Volkov', role: 'Senior Engineer', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
  { name: 'David Kim', role: 'DevRel', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <CircuitBackground color="#00E8C6" density={0.4} />
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <Container>
          <ScrollReveal variant="blurIn">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">Company</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                We're building the future of <span className="text-gradient-animated">UI intelligence</span>
              </h1>
              <p className="text-lg text-muted-light max-w-2xl mx-auto leading-relaxed">
                Webimic provides the tools design-driven teams need to understand, analyze, and learn from any website — faster than ever before.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Team Photo */}
      <section className="pb-16">
        <Container>
          <ScrollReveal variant="scaleIn">
            <ParallaxImage
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&dpr=1"
              alt="The Webimic Team"
              className="h-64 md:h-96"
              speed={0.12}
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Wire Diagram — Product Pipeline */}
      <section className="py-6 bg-dark-950">
        <Container>
          <ScrollReveal variant="fadeUp">
            <WireDiagram
              steps={['Crawl', 'Capture', 'Extract', 'Analyze', 'Generate']}
              color="#A78BFA"
              height={130}
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container size="narrow">
          <ScrollReveal variant="slideLeft">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our mission</h2>
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              We believe the world's best websites encode deep design intelligence — carefully chosen colors, thoughtful typography, precise spacing, and purposeful motion. But accessing that intelligence has always required painstaking manual work.
            </p>
            <p className="text-muted-light text-lg leading-relaxed">
              Webimic automates the extraction of this design knowledge and packages it into structured, LLM-ready specifications.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* By the Numbers */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold text-center mb-14">By the numbers</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { val: 50000, suffix: '+', label: 'Sites analyzed' },
              { val: 500, suffix: '+', label: 'Active teams' },
              { val: 15, suffix: '', label: 'Team members' },
              { val: 3, suffix: '', label: 'Countries' },
            ].map((s, i) => (
              <ScrollReveal key={i} variant="scaleIn" delay={i * 0.1}>
                <div className="text-center glass-card rounded-xl p-6">
                  <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">
                    <AnimatedCounter end={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-muted">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Company Timeline */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold text-center mb-14">Our journey</h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-8">
            {milestones.map((m, i) => (
              <ScrollReveal key={i} variant={i % 2 === 0 ? 'slideLeft' : 'slideRight'} delay={i * 0.08}>
                <div className="flex gap-6 items-start">
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-sm font-bold text-accent-400">{m.year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute top-2 left-0 w-3 h-3 rounded-full bg-accent-400/30 border-2 border-accent-400" />
                    <div className="absolute top-5 left-1.5 w-px h-full bg-white/10" />
                  </div>
                  <div className="pl-4 pb-8">
                    <h4 className="font-bold mb-1">{m.title}</h4>
                    <p className="text-sm text-muted-light">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold text-center mb-4">Meet the team</h2>
            <p className="text-center text-muted-light mb-12 max-w-xl mx-auto">The people behind Webimic's mission to democratize UI intelligence.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map((m, i) => (
              <ScrollReveal key={i} variant="fadeUp" delay={i * 0.08}>
                <div className="glass-card-hover rounded-2xl p-5 text-center">
                  <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/10" loading="lazy" />
                  <h4 className="font-bold text-sm">{m.name}</h4>
                  <p className="text-xs text-muted">{m.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container>
          <ScrollReveal variant="blurIn">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3 text-center">Our operating principles</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
                  <div className="glass-card-hover rounded-2xl p-7">
                    <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-accent-400" />
                    </div>
                    <h4 className="text-lg font-bold mb-3">{p.title}</h4>
                    <p className="text-sm text-muted-light leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Careers CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal variant="scaleIn">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-48 md:h-auto">
                  <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&dpr=1" alt="Team working" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-2">Careers</p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">We're hiring across all teams</h3>
                  <p className="text-muted-light mb-6">Shape how the world understands web design.</p>
                  <Button to="/company/careers" className="self-start">Come join us <ArrowRight size={16} /></Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Investors */}
      <section className="py-16 bg-dark-800">
        <Container>
          <ScrollReveal variant="fadeUp">
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted mb-8">Backed by the best</h3>
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {['Sequoia', 'Benchmark', 'IVP'].map((name, i) => (
                <div key={i} className="text-xl font-bold text-white/20 tracking-wider">{name}</div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <BottomCTA title="Ready to understand any website?" subtitle="Webimic gives you complete visibility into any site's design system." />
    </>
  );
}
