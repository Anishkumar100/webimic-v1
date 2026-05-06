import Container from '../ui/Container';
import Button from '../ui/Button';
import ScrollReveal from '../ui/ScrollReveal';

export default function BottomCTA({ title = 'Start your first UI analysis today', subtitle = 'Use Webimic to crawl, capture, extract, and generate specs for any public website. Ship faster with design intelligence.' }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 radial-glow-blue pointer-events-none" />
      <Container>
        <ScrollReveal>
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
