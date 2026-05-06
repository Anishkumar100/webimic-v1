import { useLocation } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import BottomCTA from '../components/sections/BottomCTA';
import { Calendar, Users, BookOpen, Globe, FileText, Handshake, Zap, Star, MessageSquare, Mail, ArrowRight } from 'lucide-react';

const pages = {
  '/company/partners': {
    badge: 'Partners',
    icon: Handshake,
    title: 'Webimic Partner Network',
    desc: 'Solve your biggest UI analysis challenges with Webimic\'s network of design and development partners.',
    cta: { label: 'Join Webimic Partner Network', to: '/contact' },
    sections: [
      { heading: 'Integration Partners', items: [
        { name: 'Figma', desc: 'Export extracted tokens directly to Figma design libraries for seamless handoff.' },
        { name: 'Storybook', desc: 'Auto-generate Storybook stories from detected components with matched design tokens.' },
        { name: 'Chromatic', desc: 'Connect Webimic screenshots to visual regression testing workflows.' },
      ]},
      { heading: 'Agency Partners', items: [
        { name: 'Design agencies', desc: 'Use Webimic to build client-ready breakdowns of reference sites and propose redesigns.' },
        { name: 'Development shops', desc: 'Feed Webimic specs into LLMs to accelerate component scaffolding for client projects.' },
        { name: 'Consultancies', desc: 'Build UI research libraries for competitive analysis and design benchmarking.' },
      ]},
    ],
  },
  '/company/events': {
    badge: 'Events',
    icon: Calendar,
    title: 'Events',
    desc: 'Connect with the Webimic community at conferences, meetups, and webinars.',
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop',
    filters: ['All', 'In Person', 'Virtual', 'Community', 'Webinars'],
    cards: [
      { title: 'Webimic Design Systems Workshop', date: 'Jun 15, 2026', loc: 'Virtual', img: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=200&fit=crop' },
      { title: 'UI Reverse Engineering Meetup', date: 'Jul 8, 2026', loc: 'San Francisco', img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=200&fit=crop' },
      { title: 'LLM-Powered Design: From Spec to Code', date: 'Jul 22, 2026', loc: 'Virtual', img: 'https://images.unsplash.com/photo-1587825140708-dfaf18c09b82?w=400&h=200&fit=crop' },
      { title: 'Building Design Token Pipelines', date: 'Aug 5, 2026', loc: 'New York', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=200&fit=crop' },
    ],
  },
  '/blog': {
    badge: 'Blog',
    icon: BookOpen,
    title: 'Blog',
    desc: 'Insights on UI analysis, design systems, and building with LLMs.',
    filters: ['All', 'Product', 'Engineering', 'Design', 'Tutorials'],
    cards: [
      { title: 'How K-Means Clustering Powers Color Palette Extraction', date: 'May 2, 2026', cat: 'Engineering', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop' },
      { title: 'From Screenshot to Spec: Automating UI Documentation', date: 'Apr 28, 2026', cat: 'Product', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop' },
      { title: 'Feeding Design Specs to LLMs: Best Practices', date: 'Apr 20, 2026', cat: 'Tutorials', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop' },
      { title: 'Building a Redis-Backed Job Queue for Site Analysis', date: 'Apr 15, 2026', cat: 'Engineering', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop' },
      { title: 'Doc B: Smart Redesign Proposals Without Cloning', date: 'Apr 8, 2026', cat: 'Product', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=200&fit=crop' },
      { title: 'CSS Animation Recording with Chrome DevTools Protocol', date: 'Apr 1, 2026', cat: 'Engineering', img: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=400&h=200&fit=crop' },
    ],
  },
  '/customers': {
    badge: 'Customers',
    icon: Star,
    title: 'Customers choose Webimic to analyze and rebuild UI faster',
    desc: 'See how design-driven teams use Webimic to accelerate their workflows.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop',
    filters: ['All', 'Agencies', 'Product Teams', 'Freelancers', 'Enterprise'],
    cards: [
      { title: 'Designlab reduced onboarding time 70% with automated specs', date: 'Agency', cat: 'Agencies', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=200&fit=crop' },
      { title: 'PixelForge rebuilt 3 client sites in half the time with LLM specs', date: 'Agency', cat: 'Agencies', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop' },
      { title: 'NovaBuild standardized design reviews across 12 projects', date: 'Product', cat: 'Product Teams', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=200&fit=crop' },
      { title: 'ScaleUI automated weekly competitor UI benchmarks', date: 'Enterprise', cat: 'Enterprise', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop' },
    ],
  },
  '/resources': {
    badge: 'Guides',
    icon: FileText,
    title: 'Guides',
    desc: 'Reports, conceptual guides, and use cases for getting the most out of Webimic.',
    filters: ['All', 'Reports', 'Conceptual Guides', 'Use Cases', 'Workshops'],
    cards: [
      { title: 'Complete Guide to UI Token Extraction', date: 'Guide', cat: 'Conceptual Guides', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=200&fit=crop' },
      { title: 'How to Feed Design Specs to Claude for Component Scaffolding', date: 'Tutorial', cat: 'Use Cases', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop' },
      { title: 'Building a UI Research Library with Webimic', date: 'Workshop', cat: 'Workshops', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=200&fit=crop' },
    ],
  },
  '/community': {
    badge: 'Community',
    icon: Users,
    title: 'Connect with the Webimic Community',
    desc: 'Meet new peers, ask for advice, and share your UI analysis projects.',
    cta: { label: 'Join our Discord', href: '#' },
    sections: [
      { heading: 'Get involved', items: [
        { name: 'Discord', desc: 'Join 2,000+ designers and developers sharing UI analysis workflows.' },
        { name: 'GitHub Discussions', desc: 'Request features, report bugs, and contribute to Webimic\'s roadmap.' },
        { name: 'Monthly Meetups', desc: 'Virtual meetups showcasing creative Webimic use cases and new features.' },
      ]},
    ],
  },
  '/docs': {
    badge: 'Documentation',
    icon: FileText,
    title: 'Webimic Documentation',
    desc: 'Everything you need to get started with Webimic — from first analysis to advanced configuration.',
    cta: { label: 'Quick Start Guide', to: '/docs' },
    sections: [
      { heading: 'Getting Started', items: [
        { name: 'Quick Start', desc: 'Analyze your first site in under 2 minutes.' },
        { name: 'Configuration', desc: 'Set up crawl depth, device presets, and output options.' },
        { name: 'Understanding Doc A', desc: 'What\'s in the observed UI specification and how to use it.' },
        { name: 'Understanding Doc B', desc: 'How the redesign engine generates differentiated proposals.' },
      ]},
      { heading: 'API Reference', items: [
        { name: 'POST /api/jobs', desc: 'Create a new analysis job.' },
        { name: 'GET /api/jobs', desc: 'List all jobs with status and pagination.' },
        { name: 'GET /api/jobs/:id', desc: 'Get full job detail including pages, tokens, and documents.' },
      ]},
    ],
  },
  '/startups': {
    badge: 'Startups',
    icon: Zap,
    title: 'Webimic for Startups',
    desc: 'We offer discounted rates and generous credits for VC-backed startups building design-driven products.',
    cta: { label: 'Apply now', to: '/contact' },
    sections: [
      { heading: 'What you get', items: [
        { name: '6 months of Plus plan free', desc: 'Full access to multi-page crawling, Doc A + Doc B, and team collaboration.' },
        { name: '$500 in analysis credits', desc: 'Enough to analyze dozens of competitor and reference sites.' },
        { name: 'Priority onboarding', desc: 'A dedicated onboarding session to get your team set up and productive.' },
      ]},
    ],
  },
  '/showcase': {
    badge: 'Showcase',
    icon: Globe,
    title: 'Showcase',
    desc: 'See what teams have built using Webimic analysis specs.',
    filters: ['All', 'Redesigns', 'Component Libraries', 'Design Systems'],
    cards: [
      { title: 'E-commerce redesign powered by Webimic + Claude', date: 'Featured', cat: 'Redesigns', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=200&fit=crop' },
      { title: 'SaaS dashboard component library from spec to code', date: 'Featured', cat: 'Component Libraries', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop' },
    ],
  },
  '/contact': {
    badge: 'Contact',
    icon: Mail,
    title: 'Connect with our team',
    desc: 'Get in touch with our team to see how Webimic can accelerate your design workflow.',
    isForm: true,
  },
  '/privacy': {
    badge: 'Legal',
    icon: FileText,
    title: 'Privacy Policy',
    desc: 'How Webimic handles your data, screenshots, and analysis results.',
    sections: [
      { heading: 'Data Collection', items: [
        { name: 'Analysis Data', desc: 'We store screenshots, extracted tokens, and generated PDFs only for the sites you submit. We do not crawl sites without your explicit request.' },
        { name: 'Account Data', desc: 'We collect your name, email, and usage metrics to operate your account and improve the platform.' },
        { name: 'No Training on Your Data', desc: 'Webimic does not use data from your analyses to train any models. All captured data remains private to your workspace.' },
      ]},
      { heading: 'Data Retention & Deletion', items: [
        { name: 'Retention', desc: 'Analysis data is retained until you delete it. Account data is retained for the duration of your account.' },
        { name: 'Deletion', desc: 'You can delete individual jobs, all analysis data, or your entire account from Settings at any time.' },
        { name: 'Data Portability', desc: 'You can export all your data including PDFs, screenshots, and token catalogs via the API or dashboard.' },
      ]},
    ],
  },
  '/terms': {
    badge: 'Legal',
    icon: FileText,
    title: 'Terms of Service',
    desc: 'The terms governing your use of the Webimic platform.',
    sections: [
      { heading: 'Acceptable Use', items: [
        { name: 'Permitted Use', desc: 'Webimic is intended for UI research, design analysis, and specification generation. You may analyze any publicly accessible website.' },
        { name: 'Prohibited Use', desc: 'You may not use Webimic to clone websites for fraudulent purposes, circumvent access controls, or violate any applicable laws.' },
        { name: 'Output Ownership', desc: 'You own the PDF reports and extracted tokens generated by Webimic. We claim no rights over your analysis outputs.' },
      ]},
      { heading: 'Service Terms', items: [
        { name: 'Availability', desc: 'We aim for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance is communicated in advance.' },
        { name: 'Plan Limits', desc: 'Each plan has usage limits for analyses, pages, and seats. Exceeding limits may result in throttling or overage charges.' },
        { name: 'Termination', desc: 'Either party may terminate the agreement at any time. On termination, your data is retained for 30 days before permanent deletion.' },
      ]},
    ],
  },
};

export default function GenericPage() {
  const location = useLocation();
  const page = pages[location.pathname];

  if (!page) {
    return (
      <section className="py-32">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-4">404</h1>
            <p className="text-muted mb-8 text-lg">This page doesn't exist yet.</p>
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
      <section className="pt-10 pb-12 md:pt-16 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-b from-accent-400/[0.04] to-transparent blur-3xl pointer-events-none" />
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              {page.badge && <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">{page.badge}</p>}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5">{page.title}</h1>
              <p className="text-lg text-muted-light leading-relaxed mb-8">{page.desc}</p>
              {page.cta && (
                <Button to={page.cta.to} href={page.cta.href} size="lg">{page.cta.label}</Button>
              )}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Hero Image */}
      {page.heroImage && (
        <section className="pb-12">
          <Container>
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden h-48 md:h-72">
                <img src={page.heroImage} alt={page.title} className="w-full h-full object-cover opacity-50" loading="lazy" />
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Filters + Cards (listing pages) */}
      {page.filters && (
        <section className="py-8 md:py-12">
          <Container>
            <ScrollReveal>
              <div className="flex flex-wrap gap-2 mb-10">
                {page.filters.map((f, i) => (
                  <button key={i} className={`px-4 py-2 text-sm rounded-lg border transition-all cursor-pointer ${i === 0 ? 'bg-white/10 text-white border-white/15' : 'text-muted border-transparent hover:text-white hover:bg-white/5'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(page.cards || []).map((card, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <a href="#" className="group block glass-card rounded-2xl overflow-hidden hover:border-white/15 hover:scale-[1.02] transition-all duration-300">
                    <div className="h-44 overflow-hidden">
                      <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" loading="lazy" />
                    </div>
                    <div className="p-5">
                      {card.cat && <span className="text-xs text-accent-400 font-semibold uppercase tracking-wider">{card.cat}</span>}
                      <h3 className="text-base font-bold mt-1.5 mb-2 group-hover:text-accent-400 transition-colors leading-snug">{card.title}</h3>
                      <span className="text-xs text-muted">{card.date}</span>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Structured sections (partners, community, docs, startups) */}
      {page.sections && (
        <section className="py-12 md:py-20">
          <Container>
            {page.sections.map((sec, si) => (
              <ScrollReveal key={si} delay={si * 0.1}>
                <div className="mb-16 last:mb-0">
                  <h3 className="text-xl font-bold mb-6">{sec.heading}</h3>
                  <div className="grid md:grid-cols-3 gap-5">
                    {sec.items.map((item, ii) => (
                      <div key={ii} className="glass-card rounded-xl p-5 hover:border-white/15 transition-all">
                        <h4 className="text-base font-semibold mb-2">{item.name}</h4>
                        <p className="text-sm text-muted-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </Container>
        </section>
      )}

      {/* Contact Form */}
      {page.isForm && (
        <section className="py-8 md:py-16">
          <Container size="narrow">
            <ScrollReveal>
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <form onSubmit={e => e.preventDefault()} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-muted-light mb-1.5">First name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 transition-colors" placeholder="Jane" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-light mb-1.5">Last name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 transition-colors" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-light mb-1.5">Work email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 transition-colors" placeholder="jane@company.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-light mb-1.5">Company</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 transition-colors" placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-light mb-1.5">How can we help?</label>
                    <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 transition-colors resize-none" placeholder="Tell us about your use case..." />
                  </div>
                  <Button type="submit" className="w-full" size="lg">Submit</Button>
                </form>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      <BottomCTA />
    </>
  );
}
