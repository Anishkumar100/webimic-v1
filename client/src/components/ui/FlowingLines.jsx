import { useEffect, useRef, useState } from 'react';

export default function FlowingLines({ className = '', variant = 'hero' }) {
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 1200, h: 600 });

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    const obs = new ResizeObserver(([e]) => {
      setDims({ w: e.contentRect.width, h: e.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { w, h } = dims;
  const paths = variant === 'hero' ? getHeroPaths(w, h) : getFooterPaths(w, h);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${w} ${h}`}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00E8C6" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E8C6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00E8C6" stopOpacity="0" />
        </linearGradient>
        <filter id="flowGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((p, i) => (
        <g key={i}>
          {/* Static faint path */}
          <path d={p.d} stroke={p.color} strokeWidth="0.5" strokeOpacity="0.06" />
          {/* Animated flowing pulse */}
          <path
            d={p.d}
            stroke={`url(#flowGrad${(i % 3) + 1})`}
            strokeWidth={p.width || 1.5}
            strokeLinecap="round"
            filter="url(#flowGlow)"
            strokeDasharray={p.dashLen || 80}
            strokeDashoffset={p.dashLen || 80}
            style={{
              animation: `flowDash ${p.dur || 4}s ease-in-out ${p.delay || 0}s infinite`,
            }}
          />
        </g>
      ))}

      <style>{`
        @keyframes flowDash {
          0% { stroke-dashoffset: ${300}; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { stroke-dashoffset: ${-300}; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}

function getHeroPaths(w, h) {
  const cx = w / 2, cy = h / 2;
  return [
    { d: `M ${w * 0.1} ${h * 0.3} Q ${cx} ${h * 0.1} ${w * 0.9} ${h * 0.35}`, color: '#00E8C6', dur: 5, delay: 0, dashLen: 100, width: 1.5 },
    { d: `M ${w * 0.05} ${h * 0.6} C ${w * 0.3} ${h * 0.2} ${w * 0.7} ${h * 0.8} ${w * 0.95} ${h * 0.4}`, color: '#38BDF8', dur: 7, delay: 1.5, dashLen: 120, width: 1 },
    { d: `M ${w * 0.15} ${h * 0.8} Q ${cx * 0.8} ${cy} ${w * 0.85} ${h * 0.15}`, color: '#A78BFA', dur: 6, delay: 3, dashLen: 90, width: 1.2 },
    { d: `M 0 ${h * 0.5} L ${w * 0.2} ${h * 0.5} L ${w * 0.2} ${h * 0.3} L ${w * 0.45} ${h * 0.3} L ${w * 0.45} ${h * 0.6} L ${w * 0.7} ${h * 0.6} L ${w * 0.7} ${h * 0.4} L ${w} ${h * 0.4}`, color: '#00E8C6', dur: 8, delay: 0.5, dashLen: 60, width: 0.8 },
    { d: `M ${w * 0.3} 0 L ${w * 0.3} ${h * 0.25} L ${w * 0.55} ${h * 0.25} L ${w * 0.55} ${h * 0.7} L ${w * 0.8} ${h * 0.7} L ${w * 0.8} ${h}`, color: '#F472B6', dur: 9, delay: 2, dashLen: 70, width: 0.6 },
    { d: `M ${w * 0.6} 0 Q ${w * 0.4} ${cy} ${w * 0.5} ${h}`, color: '#38BDF8', dur: 6, delay: 4, dashLen: 100, width: 0.8 },
  ];
}

function getFooterPaths(w, h) {
  return [
    { d: `M 0 ${h * 0.2} Q ${w * 0.25} ${h * 0.05} ${w * 0.5} ${h * 0.2} T ${w} ${h * 0.15}`, color: '#00E8C6', dur: 10, delay: 0, dashLen: 150, width: 1 },
    { d: `M 0 ${h * 0.5} Q ${w * 0.5} ${h * 0.3} ${w} ${h * 0.6}`, color: '#A78BFA', dur: 12, delay: 2, dashLen: 120, width: 0.8 },
    { d: `M 0 ${h * 0.8} L ${w * 0.15} ${h * 0.8} L ${w * 0.15} ${h * 0.4} L ${w * 0.4} ${h * 0.4} L ${w * 0.4} ${h * 0.7} L ${w * 0.7} ${h * 0.7} L ${w * 0.7} ${h * 0.3} L ${w} ${h * 0.3}`, color: '#38BDF8', dur: 14, delay: 1, dashLen: 80, width: 0.6 },
  ];
}
