import HeroSection from '../components/sections/HeroSection';
import LogoTicker from '../components/sections/LogoTicker';
import FeatureTabs from '../components/sections/FeatureTabs';
import FrameworkCards from '../components/sections/FrameworkCards';
import CustomerStories from '../components/sections/CustomerStories';
import StatsSection from '../components/sections/StatsSection';
import FAQSection from '../components/sections/FAQSection';
import BottomCTA from '../components/sections/BottomCTA';
import Container from '../components/ui/Container';
import ScrollReveal from '../components/ui/ScrollReveal';
import { WebimicPipelineDiagram } from '../components/ui/FlowchartDiagram';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoTicker />
      <FeatureTabs />

      {/* Pipeline Flowchart Section */}
      <section className="py-20 md:py-28 bg-dark-950 relative overflow-hidden">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From URL to LLM-ready spec</h2>
              <p className="text-muted-light max-w-xl mx-auto">
                One URL in, two rich PDF reports out. Webimic handles crawling, capturing, extracting, and generating — so you can focus on building.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="max-w-2xl mx-auto">
              <WebimicPipelineDiagram />
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <FrameworkCards />
      <CustomerStories />
      <StatsSection />
      <FAQSection />
      <BottomCTA />
    </>
  );
}
