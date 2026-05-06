import Container from '../ui/Container';
import Button from '../ui/Button';
import ScrollReveal from '../ui/ScrollReveal';

export default function BottomCTA({ title = 'Start your first UI analysis today', subtitle = 'Use Webimic to crawl, capture, extract, and generate specs for any public website. Ship faster with design intelligence.' }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-accent-400/[0.04] blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-48 h-48 rounded-full bg-blue-400/[0.04] blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
      <Container>
        <ScrollReveal variant="blurIn">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">{title}</h2>
            <p className="text-muted-light mb-8 text-lg">{subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button to="/signup" size="lg">Get started free</Button>
              <Button to="/contact" variant="secondary" size="lg">Request a demo</Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
