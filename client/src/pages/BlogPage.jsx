import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import ScrollReveal from '../components/ui/ScrollReveal';
import BottomCTA from '../components/sections/BottomCTA';
import { CircuitBackground } from '../components/ui/FlowchartDiagram';
import { Search, ArrowRight, Clock, Calendar } from 'lucide-react';

const categories = ['All', 'Product', 'Engineering', 'Design', 'Tutorials', 'Company'];

const blogPosts = [
  {
    slug: 'k-means-color-extraction',
    title: 'How K-Means Clustering Powers Color Palette Extraction',
    excerpt: 'Deep dive into how Webimic uses K-means clustering on screenshot pixels to identify dominant colors, classify them into roles, and build structured palettes from any website.',
    date: 'May 2, 2026',
    readTime: '8 min read',
    category: 'Engineering',
    featured: true,
    author: { name: 'Marcus Rivera', role: 'CTO', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'screenshot-to-spec',
    title: 'From Screenshot to Spec: Automating UI Documentation',
    excerpt: 'How Webimic transforms raw screenshots into structured, LLM-ready specifications with embedded images, token tables, and component breakdowns.',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
    category: 'Product',
    author: { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'feeding-specs-to-llms',
    title: 'Feeding Design Specs to LLMs: Best Practices',
    excerpt: 'A comprehensive guide to using Webimic PDF specs as context for Claude, GPT, and other LLMs to generate production-ready React, Vue, and HTML components.',
    date: 'Apr 20, 2026',
    readTime: '10 min read',
    category: 'Tutorials',
    author: { name: 'James Okafor', role: 'Engineering Lead', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
  },
  {
    slug: 'redis-job-queue',
    title: 'Building a Redis-Backed Job Queue for Site Analysis',
    excerpt: 'Technical deep-dive into how Webimic uses BullMQ and Redis to orchestrate parallel crawling, screenshot capture, and PDF generation across distributed workers.',
    date: 'Apr 15, 2026',
    readTime: '12 min read',
    category: 'Engineering',
    author: { name: 'Marcus Rivera', role: 'CTO', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'doc-b-redesign-proposals',
    title: 'Doc B: Smart Redesign Proposals Without Cloning',
    excerpt: 'How Webimic\'s redesign engine generates differentiated UI suggestions — alternate palettes, typography changes, dark mode, and accessibility improvements.',
    date: 'Apr 8, 2026',
    readTime: '7 min read',
    category: 'Product',
    author: { name: 'Priya Sharma', role: 'Product Manager', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'css-animation-recording',
    title: 'CSS Animation Recording with Chrome DevTools Protocol',
    excerpt: 'How we connect to Chrome DevTools Protocol via Puppeteer to capture CSS transitions, keyframe animations, and timing functions from any website.',
    date: 'Apr 1, 2026',
    readTime: '9 min read',
    category: 'Engineering',
    author: { name: 'Elena Volkov', role: 'Senior Engineer', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'typography-sampling-guide',
    title: 'The Complete Guide to Automated Typography Sampling',
    excerpt: 'How Webimic samples computed font styles from DOM elements, groups them into reusable text styles, and presents them in a structured design token catalog.',
    date: 'Mar 25, 2026',
    readTime: '8 min read',
    category: 'Design',
    author: { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.pexels.com/photos/1573461/pexels-photo-1573461.jpeg?auto=compress&cs=tinysrgb&w=800&h=450&dpr=1',
  },
  {
    slug: 'webimic-v2-launch',
    title: 'Introducing Webimic v2: Full Redesign Engine & Dark Mode',
    excerpt: 'Today we\'re launching Webimic v2 with the complete redesign engine (Doc B), dark mode suggestions, accessibility audits, and 3x faster crawling.',
    date: 'Mar 18, 2026',
    readTime: '5 min read',
    category: 'Company',
    author: { name: 'James Okafor', role: 'Engineering Lead', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'building-design-token-pipelines',
    title: 'Building Design Token Pipelines with Webimic + Figma',
    excerpt: 'Step-by-step tutorial on extracting design tokens from any website with Webimic and importing them into Figma design libraries for seamless handoff.',
    date: 'Mar 10, 2026',
    readTime: '11 min read',
    category: 'Tutorials',
    author: { name: 'Priya Sharma', role: 'Product Manager', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=450&fit=crop&q=80',
  },
  {
    slug: 'spacing-detection-algorithms',
    title: 'How We Detect Spacing Scales from Computed CSS',
    excerpt: 'A look at the algorithms behind Webimic\'s spacing detection: how we collect margin, padding, and gap values to identify a site\'s spacing scale.',
    date: 'Mar 3, 2026',
    readTime: '7 min read',
    category: 'Engineering',
    author: { name: 'Elena Volkov', role: 'Senior Engineer', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1' },
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop&q=80',
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchCat = activeCategory === 'All' || post.category === activeCategory;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <>
      {/* Hero */}
      <section className="relative pt-10 pb-8 md:pt-16 md:pb-12 overflow-hidden">
        <CircuitBackground color="#F472B6" density={0.4} />
        <div className="absolute inset-0 mesh-gradient opacity-40 pointer-events-none" />
        <Container className="relative z-10">
          <ScrollReveal variant="blurIn">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-400 mb-3">Blog</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
                Insights & Updates
              </h1>
              <p className="text-lg text-muted-light leading-relaxed max-w-2xl">
                Deep dives into UI analysis, design systems, LLM workflows, and building the future of design intelligence.
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Search + Filters */}
      <section className="pb-6">
        <Container>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/40 transition-colors"
                />
              </div>
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`blog-category-pill px-4 py-2 text-sm rounded-lg border cursor-pointer font-medium ${
                      activeCategory === cat
                        ? 'active'
                        : 'text-muted border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Featured Post */}
      {activeCategory === 'All' && !searchQuery && featured && (
        <section className="pb-12">
          <Container>
            <ScrollReveal variant="scaleIn">
              <Link to={`/blog/${featured.slug}`} className="group block glass-card rounded-2xl overflow-hidden blog-card">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover blog-card-image"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-dark-800/30" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent-400/15 text-accent-400 rounded-full border border-accent-400/20">
                        Featured
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">{featured.category}</span>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-accent-400 transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-muted-light leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <img src={featured.author.avatar} alt={featured.author.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                      <div>
                        <p className="text-sm font-semibold">{featured.author.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted">
                          <Calendar size={12} /> {featured.date}
                          <span className="text-muted/30">·</span>
                          <Clock size={12} /> {featured.readTime}
                        </div>
                      </div>
                      <ArrowRight size={16} className="ml-auto text-muted/40 group-hover:text-accent-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-20">
        <Container>
          {filtered.length === 0 ? (
            <ScrollReveal>
              <div className="text-center py-20">
                <h3 className="text-xl font-bold mb-2">No posts found</h3>
                <p className="text-muted">Try a broader search or different category.</p>
              </div>
            </ScrollReveal>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === 'All' && !searchQuery ? rest : filtered).map((post, i) => (
                <ScrollReveal key={post.slug} variant="fadeUp" delay={i * 0.06}>
                  <Link to={`/blog/${post.slug}`} className="group block glass-card rounded-2xl overflow-hidden blog-card h-full flex flex-col">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover blog-card-image"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-400 bg-accent-400/10 rounded-full px-2.5 py-0.5">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-base font-bold mb-2 group-hover:text-accent-400 transition-colors leading-snug flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-light leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
                        <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover border border-white/10" />
                        <div>
                          <p className="text-xs font-semibold">{post.author.name}</p>
                          <p className="text-[10px] text-muted">{post.date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <BottomCTA title="Stay updated" subtitle="Subscribe to the Webimic blog for the latest on UI analysis, design systems, and LLM workflows." />
    </>
  );
}
