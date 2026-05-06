import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import BottomCTA from '../components/sections/BottomCTA';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';

const jobs = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Backend Engineer — Node.js', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'DevRel / Developer Advocate', team: 'Marketing', location: 'Remote', type: 'Full-time' },
  { title: 'Solutions Engineer', team: 'Sales', location: 'Remote', type: 'Full-time' },
  { title: 'Technical Writer', team: 'Engineering', location: 'Remote', type: 'Contract' },
];

const awards = [
  { year: '2026', title: 'ProductHunt #1 Product of the Day' },
  { year: '2026', title: 'Forbes Cloud 100 Rising Stars' },
  { year: '2025', title: 'TechCrunch Startup Battlefield Finalist' },
];

export default function CareersPage() {
  return (
    <>
      <section className="pt-10 pb-16 md:pt-16 md:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-gradient-to-b from-accent-400/[0.04] to-transparent blur-3xl pointer-events-none" />
        <Container>
          <ScrollReveal>
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
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop" alt="Team collaboration" className="w-full h-full object-cover opacity-50" loading="lazy" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Job Listings */}
      <section className="py-16 md:py-24 bg-dark-800" id="explore-jobs">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-10">Explore our job opportunities</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <a href="#" className="group flex items-center justify-between p-5 glass-card rounded-xl hover:border-white/15 transition-all">
                  <div>
                    <h3 className="text-base font-semibold group-hover:text-accent-400 transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted">{job.team}</span>
                      <span className="text-muted/30">·</span>
                      <span className="flex items-center gap-1 text-xs text-muted"><MapPin size={12} /> {job.location}</span>
                      <span className="text-muted/30">·</span>
                      <span className="text-xs text-muted">{job.type}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-muted group-hover:text-accent-400 transition-colors" />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Awards */}
      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal>
            <h3 className="text-xl font-bold text-center mb-10">Our awards</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {awards.map((a, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <a href="#" className="glass-card rounded-xl p-5 text-center hover:border-white/15 transition-all block">
                  <span className="text-accent-400 text-sm font-bold">{a.year}</span>
                  <h4 className="text-sm font-semibold mt-2">{a.title}</h4>
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
