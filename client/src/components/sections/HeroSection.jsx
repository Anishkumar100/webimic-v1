import { useState, useEffect, useRef, useCallback } from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { ArrowRight, ChevronRight } from 'lucide-react';

const tabs = [
  { id: 'crawl', label: 'Crawl', desc: 'Recursive site discovery' },
  { id: 'capture', label: 'Capture', desc: 'Multi-device screenshots' },
  { id: 'extract', label: 'Extract', desc: 'Design tokens & colors' },
  { id: 'generate', label: 'Generate', desc: 'PDF specs for LLMs' },
];

const tabImages = {
  crawl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&q=80',
  capture: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&q=80',
  extract: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=600&fit=crop&q=80',
  generate: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=600&fit=crop&q=80',
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('crawl');
  const [fadeKey, setFadeKey] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const tabRefs = useRef({});
  const wireAreaRef = useRef(null);
  const [tabPositions, setTabPositions] = useState([]);

  const switchTab = (id) => {
    setActiveTab(id);
    setFadeKey(k => k + 1);
  };

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => {
        const idx = tabs.findIndex(t => t.id === prev);
        const next = tabs[(idx + 1) % tabs.length].id;
        setFadeKey(k => k + 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Calculate tab positions relative to canvas
  const updateTabPositions = useCallback(() => {
    if (!wireAreaRef.current) return;
    const areaRect = wireAreaRef.current.getBoundingClientRect();
    const positions = tabs.map(tab => {
      const el = tabRefs.current[tab.id];
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - areaRect.left,
        y: rect.top + rect.height - areaRect.top + 4,
      };
    });
    setTabPositions(positions);
  }, []);

  useEffect(() => {
    updateTabPositions();
    window.addEventListener('resize', updateTabPositions);
    // Re-calc after fonts load
    const t = setTimeout(updateTabPositions, 500);
    return () => { window.removeEventListener('resize', updateTabPositions); clearTimeout(t); };
  }, [updateTabPositions]);

  // Canvas wire animation — wires originate from actual tab positions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || tabPositions.length < 4) return;
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
      time += 0.004;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.75;

      for (let t = 0; t < 4; t++) {
        const pos = tabPositions[t];
        if (!pos) continue;
        const fromX = pos.x;
        const fromY = pos.y;
        const curveCount = 3;

        for (let c = 0; c < curveCount; c++) {
          const offsetX = (c - 1) * (w < 500 ? 6 : 14);
          const fx = fromX + offsetX;
          const fy = fromY;
          const cp1x = fx + (cx - fx) * 0.15;
          const cp1y = fy + (cy - fy) * 0.45;
          const cp2x = cx + (fx - cx) * 0.08;
          const cp2y = cy - (cy - fy) * 0.15;
          const pulsePhase = (time * 0.35 + t * 0.25 + c * 0.1) % 1;

          // Wire line
          ctx.beginPath();
          ctx.moveTo(fx, fy);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cx, cy);

          const isActive = t === tabs.findIndex(tab => tab.id === activeTab);
          ctx.strokeStyle = isActive
            ? `rgba(0, 232, 198, 0.18)`
            : `rgba(56, 189, 248, 0.06)`;
          ctx.lineWidth = isActive ? 1.4 : 0.7;
          ctx.setLineDash(isActive ? [] : [4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated pulse
          if (isActive || c === 1) {
            const pt = bezierPoint(fx, fy, cp1x, cp1y, cp2x, cp2y, cx, cy, pulsePhase);
            const glowAlpha = Math.sin(pulsePhase * Math.PI) * (isActive ? 0.8 : 0.2);

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 232, 198, ${glowAlpha * 0.1})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = isActive
              ? `rgba(0, 232, 198, ${glowAlpha})`
              : `rgba(56, 189, 248, ${glowAlpha})`;
            ctx.fill();
          }
        }

        // Small dot at tab anchor
        const isActive = t === tabs.findIndex(tab => tab.id === activeTab);
        if (isActive) {
          ctx.beginPath();
          ctx.arc(fromX, fromY, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 232, 198, 0.5)';
          ctx.fill();
        }
      }

      // Convergence point glow
      const glowPulse = 0.4 + Math.sin(time * 3) * 0.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 232, 198, ${glowPulse * 0.06})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 232, 198, ${glowPulse})`;
      ctx.fill();

      // Line from convergence to screenshot
      ctx.beginPath();
      ctx.moveTo(cx, cy + 5);
      ctx.lineTo(cx, h);
      ctx.strokeStyle = 'rgba(0, 232, 198, 0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [activeTab, tabPositions]);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />

      {/* Top heading area */}
      <Container className="relative z-10 pt-10 sm:pt-12 md:pt-20">
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6 sm:mb-8 animate-[fadeUp_0.7s_ease-out]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-400"></span>
            </span>
            <span className="text-xs text-muted-light tracking-wide">Now in public beta</span>
            <ChevronRight size={11} className="text-muted" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.06] mb-4 sm:mb-6 animate-[fadeUp_0.7s_ease-out_0.1s_both]">
            <span className="text-white">Understand and rebuild</span>
            <br />
            <span className="text-gradient-animated">any website UI</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-light max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed animate-[fadeUp_0.7s_ease-out_0.2s_both] px-4 sm:px-0">
            Crawl any public site, capture every page, extract full design systems, and generate
            image-rich PDF specs ready to feed into LLMs for rapid rebuilding.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-[fadeUp_0.7s_ease-out_0.35s_both] px-4 sm:px-0">
            <Button to="/dashboard/new" size="lg">
              Analyze a site <ArrowRight size={18} />
            </Button>
            <Button to="/product/platform" variant="secondary" size="lg">View sample report</Button>
          </div>
        </div>
      </Container>

      {/* Converging curves area — tabs + wires + screenshot */}
      <div ref={wireAreaRef} className="relative hero-canvas-area" style={{ height: '540px' }}>
        {/* Tab labels — positioned in a row, canvas wires connect from them */}
        <div className="absolute top-2 left-0 right-0 z-20">
          <div className="flex items-center justify-center gap-3 sm:gap-8 md:gap-14 lg:gap-24 xl:gap-36 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                ref={el => tabRefs.current[tab.id] = el}
                onClick={() => switchTab(tab.id)}
                className={`flex flex-col items-center gap-0.5 px-3 sm:px-5 py-2 rounded-xl text-center border transition-all duration-300 cursor-pointer min-w-[70px] sm:min-w-[90px] ${
                  activeTab === tab.id
                    ? 'bg-white/[0.06] text-white border-accent-400/30 shadow-lg shadow-accent-400/5'
                    : 'bg-transparent text-muted border-white/[0.05] hover:text-muted-light hover:border-white/10'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{tab.label}</span>
                <span className="text-[9px] sm:text-[10px] text-muted hidden sm:block">{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canvas for wires */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Product screenshot at bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] sm:w-[88%] md:w-[82%] max-w-4xl z-10">
          <div className="relative rounded-t-xl sm:rounded-t-2xl overflow-hidden border border-white/10 border-b-0 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-dark-800/90 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 ml-2 sm:ml-3 h-5 bg-white/[0.04] rounded-md flex items-center px-2">
                <span className="text-[9px] sm:text-[10px] text-muted font-mono">webimic.com/dashboard</span>
              </div>
            </div>
            <img
              key={fadeKey}
              src={tabImages[activeTab]}
              alt={`Webimic ${activeTab} preview`}
              className="w-full h-[200px] sm:h-[240px] md:h-[280px] object-cover object-top animate-[fadeIn_0.5s_ease-out]"
            />
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-dark-900 to-transparent" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}

function bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
  const mt = 1 - t;
  return {
    x: mt*mt*mt*x0 + 3*mt*mt*t*x1 + 3*mt*t*t*x2 + t*t*t*x3,
    y: mt*mt*mt*y0 + 3*mt*mt*t*y1 + 3*mt*t*t*y2 + t*t*t*y3,
  };
}
