import { useParams, Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import ScrollReveal from '../components/ui/ScrollReveal';
import BottomCTA from '../components/sections/BottomCTA';
import { ArrowLeft, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';

const blogData = {
  'k-means-color-extraction': {
    title: 'How K-Means Clustering Powers Color Palette Extraction',
    category: 'Engineering',
    date: 'May 2, 2026',
    readTime: '8 min read',
    author: { name: 'Marcus Rivera', role: 'CTO', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', bio: 'Marcus is the CTO of Webimic, leading the engineering team in building the future of UI analysis. Previously at Stripe and Figma.' },
    image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=600&fit=crop&q=80',
    content: `
## The Challenge of Color Extraction

When you visit a beautifully designed website, the color palette is one of the first things you notice. But extracting that palette programmatically is harder than it sounds.

CSS declarations only tell part of the story. Many colors are applied through gradients, images, and dynamic styles. To truly understand a site's color language, you need to analyze what the user actually *sees*.

![Color analysis visualization](https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=900&h=400&fit=crop&q=80)

## Our Two-Pass Approach

Webimic uses a two-pass approach to color extraction:

### Pass 1: CSS Declaration Parsing

First, we parse every stylesheet loaded by the page. We extract color values from:

- \`color\` properties
- \`background-color\` and \`background\` shorthand
- \`border-color\` and related properties
- \`box-shadow\` values
- CSS custom properties (variables)

\`\`\`javascript
// Example: extracting colors from computed styles
const elements = document.querySelectorAll('*');
const colors = new Set();

elements.forEach(el => {
  const styles = window.getComputedStyle(el);
  ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
    const value = styles.getPropertyValue(prop);
    if (value && value !== 'transparent') {
      colors.add(normalizeColor(value));
    }
  });
});
\`\`\`

### Pass 2: K-Means Pixel Clustering

The second pass is where things get interesting. We take the full-page screenshot and run K-means clustering on the pixel data.

![K-means clustering visualization](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=400&fit=crop&q=80)

The algorithm works by:

1. **Sampling pixels** — We don't analyze every pixel (that would be too slow). Instead, we sample at regular intervals across the image.
2. **Initializing centroids** — We pick K initial cluster centers, where K is configurable (default: 12).
3. **Iterating** — Each pixel is assigned to the nearest centroid, then centroids are recalculated as the mean of their cluster.
4. **Converging** — We repeat until centroids stop moving significantly.

> The beauty of K-means is that it naturally groups similar colors together, even when there are thousands of unique pixel values on a page.

## Color Role Classification

After extraction, we classify each color into semantic roles:

- **Background colors** — Large area coverage, typically lighter or darker values
- **Text colors** — Used on text elements, high contrast against backgrounds
- **Accent colors** — Used sparingly for CTAs, links, and highlights
- **Neutral colors** — Grays, borders, and subtle UI elements

This classification makes the output immediately useful for design systems and LLM prompting.

## Results and Performance

On a typical 20-page site analysis:
- CSS parsing takes ~200ms per page
- K-means clustering takes ~500ms per screenshot
- Total color extraction: ~15 seconds for all pages
- Output: 8-15 distinct colors with role classifications

The result is a structured color palette that captures the true visual identity of any website.
    `,
    relatedPosts: ['screenshot-to-spec', 'css-animation-recording', 'typography-sampling-guide'],
  },
  'screenshot-to-spec': {
    title: 'From Screenshot to Spec: Automating UI Documentation',
    category: 'Product',
    date: 'Apr 28, 2026',
    readTime: '6 min read',
    author: { name: 'Sarah Chen', role: 'Head of Design', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', bio: 'Sarah leads design at Webimic with a focus on making complex analysis results clear and actionable.' },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80',
    content: `
## Why Automate UI Documentation?

Every design team has faced this scenario: you find an inspiring website and want to document its design patterns. The traditional approach involves hours of manual screenshotting, eyedropper tools, and note-taking.

Webimic automates this entire workflow, turning any URL into a comprehensive, structured specification.

![Documentation workflow](https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&dpr=1)

## The Documentation Pipeline

Our documentation pipeline transforms raw browser data into structured, human-readable (and LLM-readable) specifications through several stages:

### Stage 1: Page Discovery and Capture

Webimic's crawler discovers every internal page through recursive link following. Each page is rendered in headless Chromium and captured at three viewport sizes:

- **Desktop**: 1440×900
- **Tablet**: 768×1024  
- **Mobile**: 390×844

### Stage 2: Component Detection

We analyze the DOM structure to identify recurring UI patterns:

- Navigation bars and headers
- Hero sections with CTAs
- Card grids and list views
- Footer components
- Modal overlays

Each component gets a cropped screenshot and bounding box coordinates.

### Stage 3: Token Extraction

Colors, typography, spacing, and animations are extracted and organized into a structured token catalog. This is the core design system intelligence.

![Token extraction process](https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&h=400&fit=crop&q=80)

### Stage 4: PDF Generation

Everything is assembled into a print-quality PDF using Puppeteer's \`page.pdf()\` method. The result includes large screenshots, data tables, and component specs — all in a format optimized for both human review and LLM consumption.

> Upload the PDF to Claude or GPT and ask it to generate React components based on the documented design system. The results are remarkably accurate.

## What Makes This Different

Unlike generic screenshot tools, Webimic produces *structured* output. Every color has a role, every font has a classification, every component has a specification. This structure is what makes the output useful for automated workflows and LLM prompting.
    `,
    relatedPosts: ['k-means-color-extraction', 'feeding-specs-to-llms', 'doc-b-redesign-proposals'],
  },
  'feeding-specs-to-llms': {
    title: 'Feeding Design Specs to LLMs: Best Practices',
    category: 'Tutorials',
    date: 'Apr 20, 2026',
    readTime: '10 min read',
    author: { name: 'James Okafor', role: 'Engineering Lead', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', bio: 'James leads engineering at Webimic, specializing in LLM integrations and developer experience.' },
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
    content: `
## The LLM-First Approach to UI Development

The promise of LLMs for UI development is enormous: describe what you want, and get production-ready code. But the quality of the output depends entirely on the quality of the context you provide.

Webimic specs are designed from the ground up to be optimal LLM context.

![LLM workflow visualization](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&h=400&fit=crop&q=80)

## Best Practices for LLM Prompting with Webimic

### 1. Upload Both Doc A and Doc B

Doc A gives the LLM the observed design system. Doc B provides differentiated suggestions. Together, they enable the LLM to generate output that's *inspired by* a reference site without *copying* it.

### 2. Be Specific About Components

Instead of asking for an "entire landing page," break your request into components:

\`\`\`
Using the attached design spec, generate a React component for the 
navigation bar described in Section 3.2. Use the documented color 
palette (#0A0A0B background, #00E8C6 accent) and Inter font family.
Include responsive breakpoints for mobile and tablet.
\`\`\`

### 3. Reference Token Values Directly

The PDF includes exact token values. Point the LLM to them:

\`\`\`
Use the spacing scale from the Token Catalog:
- xs: 4px
- sm: 8px  
- md: 16px
- lg: 24px
- xl: 48px
\`\`\`

### 4. Iterate with Screenshots

Ask the LLM to compare its output against the embedded screenshots. This creates a feedback loop that produces progressively better results.

> Pro tip: Upload both Doc A and Doc B together. Ask the LLM to use the redesign suggestions from Doc B instead of copying the original design directly.

## Framework-Specific Tips

### React + Tailwind
The most common combination. Webimic tokens map directly to Tailwind config values.

### Vue + CSS Modules  
Request scoped styles that match the documented spacing and color scales.

### HTML + Vanilla CSS
Best for static pages. The LLM can generate complete self-contained files.

## Results We've Seen

Teams using Webimic specs with Claude or GPT report:
- **70% faster** component scaffolding
- **3x more accurate** color matching
- **Significantly fewer** design review rounds
    `,
    relatedPosts: ['screenshot-to-spec', 'doc-b-redesign-proposals', 'building-design-token-pipelines'],
  },
};

// Fallback for posts not in blogData
const defaultPost = {
  title: 'Blog Post',
  category: 'General',
  date: 'Mar 2026',
  readTime: '5 min read',
  author: { name: 'Webimic Team', role: 'Team', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1', bio: 'The Webimic team builds tools for UI intelligence.' },
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80',
  content: `## Coming Soon\n\nThis post is currently being written. Check back soon for the full article.`,
  relatedPosts: [],
};

// Simple slug-to-title mapping for related posts
const postTitles = {
  'k-means-color-extraction': 'How K-Means Clustering Powers Color Palette Extraction',
  'screenshot-to-spec': 'From Screenshot to Spec: Automating UI Documentation',
  'feeding-specs-to-llms': 'Feeding Design Specs to LLMs: Best Practices',
  'redis-job-queue': 'Building a Redis-Backed Job Queue for Site Analysis',
  'doc-b-redesign-proposals': 'Doc B: Smart Redesign Proposals Without Cloning',
  'css-animation-recording': 'CSS Animation Recording with Chrome DevTools Protocol',
  'typography-sampling-guide': 'The Complete Guide to Automated Typography Sampling',
  'webimic-v2-launch': 'Introducing Webimic v2',
  'building-design-token-pipelines': 'Building Design Token Pipelines with Webimic + Figma',
  'spacing-detection-algorithms': 'How We Detect Spacing Scales from Computed CSS',
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogData[slug] || { ...defaultPost, title: postTitles[slug] || 'Blog Post' };

  return (
    <>
      {/* Back link */}
      <section className="pt-6 pb-0">
        <Container>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors font-medium">
            <ArrowLeft size={16} /> Back to blog
          </Link>
        </Container>
      </section>

      {/* Hero */}
      <section className="pt-6 pb-8 md:pb-12">
        <Container size="narrow">
          <ScrollReveal variant="blurIn">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-accent-400 bg-accent-400/10 rounded-full px-3 py-1">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 mb-8">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {post.readTime}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Hero Image */}
      <section className="pb-10">
        <Container>
          <ScrollReveal variant="scaleIn">
            <div className="rounded-2xl overflow-hidden border border-white/5 h-64 md:h-96 lg:h-[480px]">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Content */}
      <section className="pb-20">
        <Container size="narrow">
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <div className="prose-dark" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
          </ScrollReveal>

          {/* Share */}
          <ScrollReveal variant="fadeUp" delay={0.15}>
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted font-semibold">Share this article</span>
                <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-muted hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </button>
                <button className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-muted hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Author Bio */}
          <ScrollReveal variant="fadeUp" delay={0.2}>
            <div className="mt-10 glass-card rounded-2xl p-6 flex items-start gap-5">
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg mb-1">{post.author.name}</p>
                <p className="text-sm text-accent-400 mb-2">{post.author.role}</p>
                <p className="text-sm text-muted-light leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-16 bg-dark-800">
          <Container>
            <ScrollReveal>
              <h3 className="text-2xl font-bold mb-8">Related articles</h3>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedPosts.map((rSlug, i) => (
                <ScrollReveal key={rSlug} variant="fadeUp" delay={i * 0.08}>
                  <Link to={`/blog/${rSlug}`} className="group block glass-card rounded-xl p-5 hover:border-white/15 transition-all">
                    <h4 className="font-semibold mb-2 group-hover:text-accent-400 transition-colors leading-snug">
                      {postTitles[rSlug] || rSlug}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-sm text-accent-400 font-medium">
                      Read more <ArrowRight size={14} />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <BottomCTA title="Try Webimic today" subtitle="Analyze any website and generate LLM-ready design specs in minutes." />
    </>
  );
}

// Simple markdown-to-HTML renderer for blog content
function renderMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-400 hover:underline">$1</a>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    .replace(/^\*(.+?)\*/gm, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/^(?!<[hupblo])([\w].+)$/gm, '<p>$1</p>')
    .replace(/\n\n/g, '\n');
}
