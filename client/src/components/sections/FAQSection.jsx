import { useState } from 'react';
import Container from '../ui/Container';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronDown } from 'lucide-react';

const defaultFaqs = [
  {
    q: 'What does Webimic do exactly?',
    a: 'Webimic crawls any public website, captures full-page screenshots across desktop, tablet, and mobile viewports, extracts the complete design system (colors, typography, spacing, animations), and generates two PDF reports: Doc A (the observed UI specification) and Doc B (a smart redesign proposal with differentiated suggestions).',
  },
  {
    q: 'Is Webimic a website cloner?',
    a: 'No. Webimic is a UI research and analysis tool. Doc A documents what exists on the target site. Doc B specifically proposes changes — alternate palettes, typography, dark mode, and accessibility improvements — so you can learn from great design without copying it. The goal is inspiration and acceleration, not reproduction.',
  },
  {
    q: 'What sites can Webimic analyze?',
    a: 'Webimic can analyze any publicly accessible website. It uses headless Chromium (Puppeteer) to render pages just like a real browser, so JavaScript-heavy SPAs, server-rendered sites, and static pages all work. Sites behind authentication or paywalls are not supported.',
  },
  {
    q: 'How are the PDF reports used with LLMs?',
    a: 'The generated PDFs are image-rich and structured specifically to be fed into strong LLMs like Claude as context for rapid component scaffolding. You can upload Doc A or Doc B as context and ask the LLM to generate React, Vue, or HTML components based on the documented design system.',
  },
  {
    q: 'How does the color extraction work?',
    a: 'Webimic uses a two-pass approach: first, it extracts CSS color declarations from stylesheets; then it runs K-means clustering on screenshot pixels to identify dominant colors. Similar colors are merged and classified into roles (background, text, accent) based on usage frequency and context.',
  },
  {
    q: 'Can I use Webimic with my team?',
    a: 'Yes. Webimic is built for teams. You can create a shared workspace, manage analysis jobs collaboratively, and build a library of UI research projects with visual galleries and token catalogs. Team plans include multiple seats and shared storage.',
  },
  {
    q: 'What data does Webimic store?',
    a: 'Webimic stores job metadata, extracted design tokens, and screenshots in secure cloud storage. Generated PDFs are stored until you delete them. We do not store or access the source code of analyzed websites — only publicly visible rendered output.',
  },
  {
    q: 'Is there a free plan?',
    a: 'Yes. The free Developer plan includes up to 3 site analyses per month with single-page crawling. Paid plans unlock multi-page crawling, higher depth limits, team collaboration, and the full redesign engine (Doc B).',
  },
];

function FAQItem({ faq, isOpen, toggle }) {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className={`text-base font-semibold transition-colors pr-4 ${isOpen ? 'text-white' : 'text-muted-light group-hover:text-white'}`}>
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          className={`text-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-400' : ''}`}
        />
      </button>
      <div className={`faq-content ${isOpen ? 'open' : ''}`}>
        <p className="text-sm text-muted-light leading-relaxed pb-5 pr-12">{faq.a}</p>
      </div>
    </div>
  );
}

export default function FAQSection({ title = 'Frequently asked questions', faqs = defaultFaqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 md:py-28 bg-dark-800">
      <Container size="narrow">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card rounded-2xl px-6 md:px-8">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
