import Container from '../ui/Container';
import ScrollReveal from '../ui/ScrollReveal';

const stats = [
  { value: '50K+', label: 'Sites analyzed', sublabel: 'across all plans' },
  { value: '2M+', label: 'Pages captured', sublabel: 'with full screenshots' },
  { value: '500+', label: 'Active teams', sublabel: 'shipping with Webimic' },
];

export default function StatsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <Container>
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Trusted by the fastest-growing design teams
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="text-center">
                <p className="text-5xl md:text-6xl font-extrabold text-gradient mb-3 tracking-tight">{stat.value}</p>
                <p className="text-lg font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-sm text-muted">{stat.sublabel}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative visual */}
        <ScrollReveal delay={0.2}>
          <div className="relative max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
              <div className="relative grid grid-cols-6 gap-3">
                {Array.from({ length: 24 }, (_, i) => {
                  const colors = ['#00E8C6', '#38BDF8', '#A78BFA', '#F472B6'];
                  const color = colors[i % colors.length];
                  const height = 20 + Math.random() * 60;
                  return (
                    <div key={i} className="flex items-end justify-center h-20">
                      <div
                        className="w-full rounded-t-md transition-all duration-500"
                        style={{ height: `${height}%`, background: `${color}30`, borderTop: `2px solid ${color}60` }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-muted">Monthly analysis volume</span>
                <span className="text-xs text-accent-400 font-semibold">↑ 340% YoY growth</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
