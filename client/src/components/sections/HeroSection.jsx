import { useState, useEffect, useRef } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import heroReports from '../../assets/hero-reports.svg';
import heroDashboard from '../../assets/hero-dashboard.svg';
import heroCode from '../../assets/hero-code.svg';
import productAnalysis from '../../assets/product-analysis.svg';

const tabs = [
  { id: 'crawl', label: 'Crawl' },
  { id: 'capture', label: 'Capture' },
  { id: 'extract', label: 'Extract' },
  { id: 'generate', label: 'Generate' },
];

const tabImages = {
  crawl: heroDashboard,
  capture: productAnalysis,
  extract: heroCode,
  generate: heroReports,
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('crawl');
  const [fadeKey, setFadeKey] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Switch tab image with fade
  const switchTab = (id) => {
    setActiveTab(id);
    setFadeKey(k => k + 1);
  };

  // Converging curves canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    function draw() {
      time += 0.003;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      // Convergence point at bottom center
      const cx = w / 2;
      const cy = h * 0.92;

      // Tab anchor X positions spread across the top
      const tabCount = 4;
      const spread = w * 0.7;
      const startX = (w - spread) / 2;

      for (let t = 0; t < tabCount; t++) {
        const anchorX = startX + (spread / (tabCount - 1)) * t;
        const anchorY = h * 0.06;

        // Draw 3-4 curves per tab, fanning out slightly
        const curveCount = 3;
        for (let c = 0; c < curveCount; c++) {
          const offsetX = (c - (curveCount - 1) / 2) * 18;
          const fromX = anchorX + offsetX;
          const fromY = anchorY;

          // Control points to create elegant curves that converge
          const cp1x = fromX + (cx - fromX) * 0.1;
          const cp1y = fromY + h * 0.5;
          const cp2x = cx + (fromX - cx) * 0.05;
          const cp2y = cy - h * 0.2;

          // Pulse animation: a bright dot traveling along the curve
          const pulsePhase = (time * 0.4 + t * 0.25 + c * 0.12) % 1;

          // Draw the static curve line
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cx, cy);

          const isActiveTab = t === tabs.findIndex(tab => tab.id === activeTab);
          const baseAlpha = isActiveTab ? 0.18 : 0.06;
          ctx.strokeStyle = `rgba(56, 189, 248, ${baseAlpha})`;
          ctx.lineWidth = isActiveTab ? 1.2 : 0.6;
          ctx.stroke();

          // Animated pulse traveling along the curve
          if (isActiveTab || Math.random() < 0.003) {
            const pt = getPointOnBezier(fromX, fromY, cp1x, cp1y, cp2x, cp2y, cx, cy, pulsePhase);
            const glowAlpha = Math.sin(pulsePhase * Math.PI) * (isActiveTab ? 0.7 : 0.3);

            // Outer glow
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 232, 198, ${glowAlpha * 0.15})`;
            ctx.fill();

            // Inner dot
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${glowAlpha})`;
            ctx.fill();
          }
        }
      }

      // Draw convergence point
      const glowPulse = 0.4 + Math.sin(time * 3) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 12, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 232, 198, ${glowPulse * 0.08})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${glowPulse})`;
      ctx.fill();

      // Vertical line from convergence point downward
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, h);
      ctx.strokeStyle = `rgba(56, 189, 248, 0.12)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [activeTab]);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />

      {/* Top heading area */}
      <Container className="relative z-10 pt-12 md:pt-20">
        <div className="text-center max-w-4xl mx-auto mb-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400"></span>
            </span>
            <span className="text-xs text-muted-light tracking-wide">Now in public beta</span>
            <ChevronRight size={11} className="text-muted" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.06] mb-6 animate-[fadeUp_0.7s_ease-out]">
            <span className="text-white">Understand and rebuild</span>
            <br />
            <span className="text-gradient">any website UI</span>
          </h1>

          <p className="text-base md:text-lg text-muted-light max-w-2xl mx-auto mb-10 leading-relaxed animate-[fadeUp_0.7s_ease-out_0.15s_both]">
            Crawl any public site, capture every page, extract full design systems, and generate
            image-rich PDF specs ready to feed into LLMs for rapid rebuilding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-[fadeUp_0.7s_ease-out_0.3s_both]">
            <Button to="/dashboard/new" size="lg">
              Analyze a site <ArrowRight size={18} />
            </Button>
            <Button to="/product/platform" variant="secondary" size="lg">View sample report</Button>
          </div>
        </div>
      </Container>

      {/* Converging curves area - tabs at top, curves flowing down */}
      <div className="relative" style={{ height: '520px' }}>
        {/* Tab labels positioned at the top of the canvas */}
        <div className="absolute top-2 left-0 right-0 z-20">
          <div className="flex items-center justify-center gap-4 sm:gap-16 md:gap-28 lg:gap-40 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white/[0.08] text-white border-white/20 shadow-lg shadow-blue-400/5'
                    : 'bg-transparent text-muted border-white/[0.06] hover:text-muted-light hover:border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas for curves */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Product screenshot at bottom, behind the convergence point */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl z-10">
          <div className="relative rounded-t-2xl overflow-hidden border border-white/10 border-b-0 shadow-2xl shadow-black/60">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-dark-800/90 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 ml-3 h-5 bg-white/[0.04] rounded-md flex items-center px-2">
                <span className="text-[10px] text-muted font-mono">webimic.com/dashboard</span>
              </div>
            </div>
            {/* Screenshot */}
            <img
              key={fadeKey}
              src={tabImages[activeTab]}
              alt={`Webimic ${activeTab} preview`}
              className="w-full h-[280px] object-cover object-top animate-[fadeIn_0.5s_ease-out]"
            />
            {/* Fade-out gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

function getPointOnBezier(x0, y0, x1, y1, x2, y2, x3, y3, t) {
  const mt = 1 - t;
  return {
    x: mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3,
    y: mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3,
  };
}
