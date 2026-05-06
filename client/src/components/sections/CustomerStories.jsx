import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import ScrollReveal from '../ui/ScrollReveal';
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const customer1 = 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1';
const customer2 = 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1';
const customer3 = 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1';

const stories = [
  {
    company: 'Designlab',
    person: 'Sarah Chen',
    role: 'Head of Design',
    image: customer1,
    summary: 'Designlab reduced client onboarding time by 70% by using Webimic to auto-generate UI specs from reference sites instead of manual screenshotting.',
    link: '/customers',
  },
  {
    company: 'PixelForge',
    person: 'Marcus Rivera',
    role: 'CTO',
    image: customer2,
    summary: 'PixelForge rebuilt three client websites in half the time after feeding Webimic PDF specs directly into Claude for component scaffolding.',
    link: '/customers',
  },
  {
    company: 'NovaBuild',
    person: 'James Okafor',
    role: 'Engineering Lead',
    image: customer3,
    summary: 'NovaBuild standardized their design system review process across 12 projects using Webimic\'s token extraction pipeline.',
    link: '/customers',
  },
  {
    company: 'ScaleUI',
    person: 'Priya Sharma',
    role: 'Product Manager',
    image: customer1,
    summary: 'ScaleUI automated competitor analysis for their product team, generating weekly UI benchmark reports with Webimic.',
    link: '/customers',
  },
  {
    company: 'WebCraft',
    person: 'Elena Volkov',
    role: 'Founder',
    image: customer3,
    summary: 'WebCraft used Webimic\'s redesign engine to propose three differentiated concepts per client pitch, winning 40% more contracts.',
    link: '/customers',
  },
];

export default function CustomerStories() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -380 : 380, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 bg-dark-800">
      <Container>
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Teams shipping faster with Webimic</h2>
              <Link to="/customers" className="text-sm text-accent-400 hover:text-accent-400/80 font-semibold inline-flex items-center gap-1.5 transition-colors">
                More customer stories <ArrowRight size={14} />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => scroll('left')} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                <ChevronLeft size={18} className="text-muted-light" />
              </button>
              <button onClick={() => scroll('right')} className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                <ChevronRight size={18} className="text-muted-light" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </Container>

      {/* Scrollable Cards */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark-800 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark-800 to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-5 sm:px-8 lg:px-16 pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {stories.map((story, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <Link
                to={story.link}
                className="group flex-shrink-0 w-[340px] glass-card rounded-2xl overflow-hidden hover:border-white/15 hover:scale-[1.02] transition-all duration-300 snap-start flex flex-col"
              >
                {/* Quote icon */}
                <div className="p-6 pb-0">
                  <Quote size={24} className="text-accent-400/20 mb-3" />
                </div>

                {/* Summary */}
                <div className="px-6 pb-4 flex-1">
                  <p className="text-sm text-muted-light leading-relaxed">{story.summary}</p>
                </div>

                {/* Person */}
                <div className="px-6 pb-6 flex items-center gap-3 border-t border-white/5 pt-4 mt-auto">
                  <img src={story.image} alt={story.person} className="w-10 h-10 rounded-full object-cover border border-white/10" loading="lazy" />
                  <div>
                    <p className="text-sm font-semibold">{story.person}</p>
                    <p className="text-xs text-muted">{story.role}, {story.company}</p>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-muted/40 group-hover:text-accent-400 transition-colors" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <Container>
        <div className="mt-8 text-center">
          <Link to="/customers" className="text-sm text-muted hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors">
            More use cases <ArrowRight size={14} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
