import React from 'react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import ScrollReveal from '../components/ui/ScrollReveal';
import FAQSection from '../components/sections/FAQSection';
import BottomCTA from '../components/sections/BottomCTA';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Developer', desc: 'For solo users getting started.', price: '$0', period: '/ seat per month', sub: 'then pay as you go',
    cta: 'Start for free', ctaTo: '/signup', ctaVariant: 'secondary',
    features: ['Up to 3 site analyses / mo', 'Single-page crawling (depth 1)', 'Desktop viewport only', 'Doc A generation (Observed UI spec)', 'Basic color and typography extraction', 'Community support', '1 seat'],
  },
  {
    name: 'Plus', desc: 'For teams building and shipping products.', price: '$29', period: '/ seat per month', sub: 'then pay as you go',
    cta: 'Sign up', ctaTo: '/signup', ctaVariant: 'primary', highlight: true,
    features: ['Up to 15 site analyses / mo', 'Multi-page crawling (configurable depth)', 'Desktop, tablet, and mobile viewports', 'Doc A + Doc B generation', 'Full token extraction with K-means clustering', 'Animation and transition recording', 'Email support', 'Unlimited seats', 'Up to 5 workspaces'],
  },
  {
    name: 'Enterprise', desc: 'For teams with advanced security and scale.', price: 'Custom', period: 'pricing', sub: '',
    cta: 'Contact sales', ctaTo: '/contact', ctaVariant: 'secondary',
    features: ['Unlimited site analyses', 'Priority crawl queue with dedicated workers', 'Custom viewport configurations', 'Self-hosted worker option', 'Custom SSO and RBAC', 'SLA and dedicated support', 'Team trainings & architecture guidance', 'Custom seats and workspaces'],
  },
];

const featureRows = [
  { cat: 'Crawling & Capture', rows: [
    { name: 'Site analyses / mo', vals: ['3 included', '15 included', 'Unlimited'] },
    { name: 'Max crawl depth', vals: ['1 page', 'Configurable', 'Configurable'] },
    { name: 'Device viewports', vals: ['Desktop', 'All 3', 'Custom'] },
    { name: 'Full-page screenshots', vals: [true, true, true] },
    { name: 'Component crops', vals: [false, true, true] },
  ]},
  { cat: 'Extraction', rows: [
    { name: 'Color extraction', vals: ['Basic CSS', 'CSS + K-means', 'CSS + K-means'] },
    { name: 'Typography sampling', vals: [true, true, true] },
    { name: 'Spacing detection', vals: [false, true, true] },
    { name: 'Animation recording', vals: [false, true, true] },
  ]},
  { cat: 'Documents', rows: [
    { name: 'Doc A (Observed UI)', vals: [true, true, true] },
    { name: 'Doc B (Redesign)', vals: [false, true, true] },
    { name: 'Dark mode suggestions', vals: [false, true, true] },
    { name: 'Accessibility notes', vals: [false, true, true] },
  ]},
  { cat: 'Support & Security', rows: [
    { name: 'Community forum', vals: [true, true, true] },
    { name: 'Email support', vals: [false, true, true] },
    { name: 'Dedicated engineer', vals: [false, false, true] },
    { name: 'SLA', vals: [false, false, true] },
    { name: 'Custom SSO', vals: [false, false, true] },
  ]},
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-10 pb-16 md:pt-16 md:pb-24">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-3">Pricing</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">Plans for teams of any size</h1>
              <p className="text-lg text-muted-light">Get access to the full Webimic platform — pay for what you use.</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`glass-card rounded-2xl p-7 flex flex-col h-full ${plan.highlight ? 'border-accent-400/30 ring-1 ring-accent-400/20' : ''}`}>
                  {plan.highlight && <div className="text-[10px] font-bold uppercase tracking-widest text-accent-400 bg-accent-400/10 rounded-full px-3 py-1 self-start mb-4">Most popular</div>}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted mb-5">{plan.desc}</p>
                  <div className="mb-1"><span className="text-4xl font-extrabold">{plan.price}</span><span className="text-sm text-muted ml-1">{plan.period}</span></div>
                  {plan.sub && <p className="text-xs text-muted mb-6">{plan.sub}</p>}
                  {!plan.sub && <div className="mb-6" />}
                  <Button to={plan.ctaTo} variant={plan.ctaVariant} className="w-full mb-6">{plan.cta}</Button>
                  <p className="text-xs font-semibold text-muted-light mb-3">{i === 0 ? 'Get started with:' : i === 1 ? 'Everything in Developer, and:' : 'Everything in Plus, and:'}</p>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-light">
                        <Check size={15} className="text-accent-400 mt-0.5 flex-shrink-0" /><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16"><Container size="narrow"><ScrollReveal>
        <div className="glass-card rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Small team just getting started?</h3>
          <p className="text-sm text-muted mb-4">We offer discounted rates and credits for early-stage startups.</p>
          <Button to="/startups" variant="accent" size="sm">Webimic for Startups</Button>
        </div>
      </ScrollReveal></Container></section>

      <section className="py-16 md:py-24 bg-dark-800">
        <Container>
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-10">Features</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead><tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-muted-light w-[40%]"></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-muted-light w-[20%]">Developer</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-white w-[20%]">Plus</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-muted-light w-[20%]">Enterprise</th>
                </tr></thead>
                <tbody>
                  {featureRows.map((cat, ci) => (
                    <React.Fragment key={ci}>
                      <tr><td colSpan={4} className="pt-8 pb-3 text-xs font-bold uppercase tracking-wider text-accent-400">{cat.cat}</td></tr>
                      {cat.rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-white/5">
                          <td className="py-3 pr-4 text-sm text-muted-light">{row.name}</td>
                          {row.vals.map((v, vi) => (
                            <td key={vi} className="py-3 px-4 text-center text-sm">
                              {v === true ? <Check size={16} className="text-accent-400 mx-auto" /> : v === false ? <span className="text-muted/40">—</span> : <span className="text-muted-light">{v}</span>}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <FAQSection title="General Questions" faqs={[
        { q: 'Which plan is right for me?', a: 'The Developer plan is great for personal projects. Plus is for teams needing multi-page crawling and redesign specs. Enterprise is for organizations with advanced security or scale needs.' },
        { q: 'When will I be billed?', a: 'Developer and Plus plans are billed monthly. Seat charges apply on the 1st of each month. Enterprise plans are invoiced annually.' },
        { q: 'Do you train on analyzed site data?', a: 'No. Webimic does not use data from your analyses to train models. All data remains private to your workspace.' },
        { q: 'Can I upgrade or downgrade?', a: 'Yes. Change your plan at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
      ]} />
      <BottomCTA title="Ready to start analyzing sites?" subtitle="Get started with tools for every step of the UI analysis workflow." />
    </>
  );
}
