import { useState } from 'react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import ParallaxImage from '../components/ui/ParallaxImage';
import BottomCTA from '../components/sections/BottomCTA';
import { CircuitBackground } from '../components/ui/FlowchartDiagram';
import { MapPin, ArrowRight, Heart, Globe, Zap, Shield, Coffee, BookOpen } from 'lucide-react';

const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Sales'];

const jobs = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Backend Engineer — Node.js', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'DevRel / Developer Advocate', team: 'Marketing', location: 'Remote', type: 'Full-time' },
  { title: 'Solutions Engineer', team: 'Sales', location: 'Remote', type: 'Full-time' },
  { title: 'Technical Writer', team: 'Engineering', location: 'Remote', type: 'Contract' },
];

const benefits = [
  { icon: Globe, title: 'Remote-first', desc: 'Work from anywhere in the world. Async-first communication.' },
  { icon: Heart, title: 'Health & wellness', desc: 'Comprehensive health coverage for you and your family.' },
  { icon: Zap, title: 'Equipment budget', desc: '$3,000 setup budget for your ideal workspace.' },
  { icon: BookOpen, title: 'Learning budget', desc: '$2,000/year for conferences, courses, and books.' },
  { icon: Coffee, title: 'Flexible hours', desc: 'Core hours overlap, but you set your own schedule.' },
  { icon: Shield, title: 'Equity', desc: 'Meaningful equity in a fast-growing company.' },
];

const values = [
  { title: 'Move fast, ship often', desc: 'We believe in rapid iteration. Ship early, gather feedback, improve continuously.', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=300&fit=crop&q=80' },
  { title: 'Design matters', desc: 'We build tools for design-driven teams, so our own product must exemplify great design.', img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1' },
  { title: 'Own the outcome', desc: 'Every team member has autonomy and accountability. We trust each other to deliver.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop&q=80' },
];

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All');
  const filteredJobs = jobs.filter(j => activeDept === 'All' || j.team === activeDept);

  return (
    <>
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <CircuitBackground color="#A78BFA" density={0.45} />
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <Container>
          <ScrollReveal variant="blurIn">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">Careers</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                We're a growing team of builders making an outsized impact
              </h1>
              <Button to="#explore-jobs" size="lg">Come join us</Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Team image */}
      <section className="pb-16">
        <Container>
          <ScrollReveal variant="scaleIn">
            <ParallaxImage
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=500&dpr=1"
              alt="Team collaboration"
              className="h-64 md:h-80"
            />
          </ScrollReveal>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold text-center mb-14">What we value</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} variant="fadeUp" delay={i * 0.1}>
                <div className="glass-card-hover rounded-2xl overflow-hidden h-full">
                  <div className="h-44 overflow-hidden">
                    <img src={v.img} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-dark-800">
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold text-center mb-4">Benefits & perks</h2>
            <p className="text-center text-muted-light mb-12 max-w-xl mx-auto">We take care of our team so they can do their best work.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <ScrollReveal key={i} variant="fadeUp" delay={i * 0.07}>
                  <div className="glass-card-hover rounded-xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center mb-3">
                      <Icon size={18} className="text-accent-400" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{b.title}</h4>
                    <p className="text-xs text-muted-light leading-relaxed">{b.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-24" id="explore-jobs">
        <Container>
          <ScrollReveal variant="blurIn">
            <h2 className="text-3xl font-bold mb-6">Open positions</h2>
          </ScrollReveal>
          <ScrollReveal variant="fadeUp" delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-8">
              {departments.map(d => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  className={`blog-category-pill px-4 py-2 text-sm rounded-lg border cursor-pointer font-medium ${
                    activeDept === d ? 'active' : 'text-muted border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {filteredJobs.map((job, i) => (
              <ScrollReveal key={i} variant="slideLeft" delay={i * 0.05}>
                <a href="#" className="group flex items-center justify-between p-5 glass-card-hover rounded-xl">
                  <div>
                    <h3 className="text-base font-semibold group-hover:text-accent-400 transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-xs text-muted">{job.team}</span>
                      <span className="text-muted/30">·</span>
                      <span className="flex items-center gap-1 text-xs text-muted"><MapPin size={12} /> {job.location}</span>
                      <span className="text-muted/30">·</span>
                      <span className="text-xs text-muted">{job.type}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-muted group-hover:text-accent-400 transition-colors flex-shrink-0" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <BottomCTA />
    </>
  );
}
