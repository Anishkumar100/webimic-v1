import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import ScrollReveal from '../ui/ScrollReveal';
import { Eye, Layers, Move, ArrowRight } from 'lucide-react';

const productAnalysis = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80';
const productDesign = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1';
const abstractDark = 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=600&h=400&fit=crop&q=80';

const frameworks = [
  {
    id: 'screenshots', icon: Eye, name: 'Screenshot Capture',
    tagline: 'Full-page renders across all viewports',
    desc: 'Pixel-perfect multi-device captures',
    link: '/product/screenshots', accent: '#00E8C6',
    image: productAnalysis,
  },
  {
    id: 'components', icon: Layers, name: 'Component Library',
    tagline: 'Auto-detect and catalog UI components',
    desc: 'Build reusable pattern libraries',
    link: '/product/components', accent: '#38BDF8',
    image: productDesign,
  },
  {
    id: 'animations', icon: Move, name: 'Animation Inspector',
    tagline: 'Record CSS transitions and keyframes',
    desc: 'Capture motion design patterns',
    link: '/product/animations', accent: '#A78BFA',
    image: abstractDark,
  },
];

export default function FrameworkCards() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Specialized tools for every layer of UI
          </h2>
          <p className="text-center text-muted-light max-w-2xl mx-auto mb-14">
            Go deeper with dedicated capture tools. Extract screenshots, components, and animations with purpose-built modules.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {frameworks.map((fw, i) => {
            const Icon = fw.icon;
            return (
              <ScrollReveal key={fw.id} delay={i * 0.1}>
                <Link
                  to={fw.link}
                  className="group block glass-card rounded-2xl overflow-hidden hover:border-white/15 hover:scale-[1.02] transition-all duration-300"
                >
                  {/* Image area */}
                  <div className="h-48 relative overflow-hidden">
                    <img src={fw.image} alt={fw.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                    {/* Floating icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl border border-white/10 bg-dark-900/60 backdrop-blur-sm flex items-center justify-center">
                      <Icon size={18} style={{ color: fw.accent }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-medium text-muted">{fw.name.toLowerCase().replace(/\s/g, '-')}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">{fw.tagline}</h3>
                    <p className="text-sm text-muted mb-4">{fw.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: fw.accent }}>
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
