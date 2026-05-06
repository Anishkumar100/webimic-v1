import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import BottomCTA from '../components/sections/BottomCTA';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import teamOffice from '../assets/team-office.svg';

const principles = [
  { title: 'Ship and iterate', desc: 'We ship v0s faster than feels comfortable because great products are built through rapid iteration and real-world feedback. We sweat the craft details that make a real difference.' },
  { title: 'Design is intelligence made visible', desc: 'We believe every pixel tells a story. Our tools exist to decode that story — to make the invisible visible — so teams can learn from the best and build something better.' },
  { title: 'Own your domain', desc: 'We are a team of owners. Each person drives ideas forward with conviction and listens with humility. Execution matters more than ideas alone.' },
  { title: 'Run toward hard problems', desc: 'Reverse-engineering entire design systems is hard. Generating differentiated redesign specs is harder. We lean into that difficulty because it\'s where the most value lives.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-b from-accent-400/[0.05] to-transparent blur-3xl pointer-events-none" />
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">Company</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                We're building the future of <span className="text-gradient">UI intelligence</span>
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
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden h-64 md:h-96 border border-white/5">
              <img src={teamOffice} alt="The Webimic Team" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container size="narrow">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our mission</h2>
            <p className="text-muted-light text-lg leading-relaxed mb-6">
              We believe the world's best websites encode deep design intelligence — carefully chosen colors, thoughtful typography, precise spacing, and purposeful motion. But accessing that intelligence has always required painstaking manual work.
            </p>
            <p className="text-muted-light text-lg leading-relaxed">
              Webimic automates the extraction of this design knowledge and packages it into structured, LLM-ready specifications. Our tools help teams learn from great design without copying it, accelerate implementation with machine-readable tokens, and maintain consistent design systems across projects.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Webimic story</h2>
            <div className="space-y-5 text-muted-light text-lg leading-relaxed">
              <p>Webimic started as an internal tool at TheWebytes, a design-driven development agency. The team was tired of manually screenshotting reference sites, eyedropping colors, and writing design specs by hand — especially when they needed to do this for every new client project.</p>
              <p>The first version was a simple Node script: point it at a URL, capture a screenshot, and extract basic colors. But the potential was clear. What if you could crawl an entire site, extract the complete design system, and generate a PDF specification that could be fed directly into an LLM for rapid component scaffolding?</p>
              <p>That insight became Webimic. Today we serve hundreds of teams — from solo freelancers analyzing inspiration sites to enterprise agencies automating competitor benchmarks.</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Principles */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container>
          <ScrollReveal>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">Our operating principles</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {principles.map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="glass-card rounded-2xl p-7">
                    <h4 className="text-lg font-bold mb-3">{p.title}</h4>
                    <p className="text-sm text-muted-light leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Careers CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-2">Careers</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">We're hiring across all teams</h3>
              <p className="text-muted-light mb-6 max-w-xl">Webimic has big ambitions. We're hiring engineers, designers, and product people who want to shape how the world understands web design.</p>
              <Button to="/company/careers">Come join us <ArrowRight size={16} /></Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Investors */}
      <section className="py-16 bg-dark-800">
        <Container>
          <ScrollReveal>
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted mb-8">Backed by the best in the business</h3>
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
