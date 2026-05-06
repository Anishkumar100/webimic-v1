import { useEffect, useRef } from 'react';

/**
 * Canvas-based animated flowchart with sketch-style nodes and wire connections.
 */
export default function FlowchartDiagram({ nodes = [], edges = [], className = '', color = '#38BDF8', height = 400 }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      return { r: parseInt(hex.substring(0, 2), 16), g: parseInt(hex.substring(2, 4), 16), b: parseInt(hex.substring(4, 6), 16) };
    }

    function draw() {
      time += 0.006;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const rgb = hexToRgb(color);
      // Inset nodes from edge so labels never clip
      const padX = 90;
      const usableW = w - padX * 2;
      const resolvedNodes = nodes.map(n => ({
        ...n,
        px: padX + n.x * usableW,
        py: n.y * h,
      }));

      // Draw edges
      edges.forEach((edge, ei) => {
        const from = resolvedNodes.find(n => n.id === edge.from);
        const to = resolvedNodes.find(n => n.id === edge.to);
        if (!from || !to) return;

        const dy = to.py - from.py;
        const dx = to.px - from.px;
        const cp1x = from.px;
        const cp1y = from.py + dy * 0.5;
        const cp2x = to.px;
        const cp2y = to.py - dy * 0.5;

        // Dashed wire
        ctx.beginPath();
        ctx.moveTo(from.px, from.py + 18);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.px, to.py - 18);
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.18)`;
        ctx.lineWidth = 1.3;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated pulse
        const pulseT = (time * 0.25 + ei * 0.1) % 1;
        const mt = 1 - pulseT;
        const px = mt*mt*mt*from.px + 3*mt*mt*pulseT*cp1x + 3*mt*pulseT*pulseT*cp2x + pulseT*pulseT*pulseT*to.px;
        const py = mt*mt*mt*(from.py+18) + 3*mt*mt*pulseT*cp1y + 3*mt*pulseT*pulseT*cp2y + pulseT*pulseT*pulseT*(to.py-18);
        const alpha = Math.sin(pulseT * Math.PI) * 0.7;

        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha * 0.08})`;
        ctx.fill();
      });

      // Draw nodes
      resolvedNodes.forEach((node) => {
        const glow = 0.3 + Math.sin(time * 1.5 + node.x * 5) * 0.15;
        const nodeW = Math.min(130, usableW * 0.16);
        const nodeH = 36;

        // Outer glow
        ctx.beginPath();
        ctx.roundRect(node.px - nodeW/2 - 3, node.py - nodeH/2 - 3, nodeW + 6, nodeH + 6, 12);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${glow * 0.03})`;
        ctx.fill();

        // Node bg
        ctx.beginPath();
        ctx.roundRect(node.px - nodeW/2, node.py - nodeH/2, nodeW, nodeH, 9);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.05)`;
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.2 + glow * 0.12})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Small indicator circle
        ctx.beginPath();
        ctx.arc(node.px - nodeW/2 + 13, node.py, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.3 + glow * 0.3})`;
        ctx.fill();

        // Label
        const fontSize = Math.max(10, Math.min(12, usableW * 0.013));
        ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.65 + glow * 0.35})`;
        ctx.fillText(node.label, node.px + 4, node.py);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [nodes, edges, color]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} style={{ height }} />;
}

/**
 * Preset: Webimic Pipeline — nodes pulled inward so nothing clips.
 * x values range 0-1 within the padded area (90px inset each side).
 */
export function WebimicPipelineDiagram({ className = '' }) {
  return (
    <FlowchartDiagram
      className={className}
      color="#38BDF8"
      height={560}
      nodes={[
        { id: 'url', label: 'seed URL', x: 0.5, y: 0.06 },
        { id: 'crawler', label: 'crawler engine', x: 0.5, y: 0.19 },
        { id: 'screenshots', label: 'screenshots', x: 0.18, y: 0.36 },
        { id: 'tokens', label: 'design tokens', x: 0.82, y: 0.36 },
        { id: 'colors', label: 'color palette', x: 0.08, y: 0.53 },
        { id: 'typography', label: 'typography', x: 0.5, y: 0.53 },
        { id: 'animations', label: 'animations', x: 0.92, y: 0.53 },
        { id: 'doca', label: 'Doc A spec', x: 0.28, y: 0.72 },
        { id: 'docb', label: 'Doc B redesign', x: 0.72, y: 0.72 },
        { id: 'llm', label: 'LLM prompt', x: 0.5, y: 0.91 },
      ]}
      edges={[
        { from: 'url', to: 'crawler' },
        { from: 'crawler', to: 'screenshots' },
        { from: 'crawler', to: 'tokens' },
        { from: 'screenshots', to: 'colors' },
        { from: 'tokens', to: 'typography' },
        { from: 'tokens', to: 'animations' },
        { from: 'colors', to: 'doca' },
        { from: 'typography', to: 'doca' },
        { from: 'typography', to: 'docb' },
        { from: 'animations', to: 'docb' },
        { from: 'doca', to: 'llm' },
        { from: 'docb', to: 'llm' },
      ]}
    />
  );
}

/**
 * Horizontal animated wire diagram with step circles + dashed connections.
 */
export function WireDiagram({ steps = [], color = '#00E8C6', height = 160, className = '' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      return { r: parseInt(hex.substring(0, 2), 16), g: parseInt(hex.substring(2, 4), 16), b: parseInt(hex.substring(4, 6), 16) };
    }

    function draw() {
      time += 0.008;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const rgb = hexToRgb(color);
      const count = steps.length;
      if (count < 2) return;

      const padding = Math.max(40, w * 0.06);
      const spacing = (w - padding * 2) / (count - 1);
      const cy = h * 0.42;

      // Connections
      for (let i = 0; i < count - 1; i++) {
        const x1 = padding + i * spacing;
        const x2 = padding + (i + 1) * spacing;

        ctx.beginPath();
        ctx.moveTo(x1 + 24, cy);
        ctx.bezierCurveTo(x1 + 24 + spacing * 0.2, cy - 16, x2 - 24 - spacing * 0.2, cy - 16, x2 - 24, cy);
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.2)`;
        ctx.lineWidth = 1.3;
        ctx.setLineDash([5, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated pulse
        const pulseT = (time * 0.3 + i * 0.18) % 1;
        const mt = 1 - pulseT;
        const px = mt*mt*mt*(x1+24) + 3*mt*mt*pulseT*(x1+24+spacing*0.2) + 3*mt*pulseT*pulseT*(x2-24-spacing*0.2) + pulseT*pulseT*pulseT*(x2-24);
        const py = mt*mt*mt*cy + 3*mt*mt*pulseT*(cy-16) + 3*mt*pulseT*pulseT*(cy-16) + pulseT*pulseT*pulseT*cy;
        const alpha = Math.sin(pulseT * Math.PI) * 0.8;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`;
        ctx.fill();
      }

      // Nodes
      steps.forEach((step, i) => {
        const x = padding + i * spacing;
        const glow = 0.3 + Math.sin(time * 1.5 + i * 2) * 0.15;
        const r = 22;

        ctx.beginPath();
        ctx.arc(x, cy, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${glow * 0.03})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.05)`;
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.18 + glow * 0.12})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.6 + glow * 0.4})`;
        ctx.fillText(String(i + 1), x, cy);

        const fontSize = Math.max(9, Math.min(11, w * 0.01));
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.45)`;
        ctx.fillText(step, x, cy + r + 18);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [steps, color]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} style={{ height }} />;
}

/**
 * Animated circuit-board background.
 * Draws a grid of nodes with connecting lines and traveling pulses.
 * Use as an absolute-positioned background behind hero sections.
 */
export function CircuitBackground({ color = '#38BDF8', density = 0.6, className = '' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const nodesRef = useRef([]);
  const edgesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time = 0;

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      return { r: parseInt(hex.substring(0, 2), 16), g: parseInt(hex.substring(2, 4), 16), b: parseInt(hex.substring(4, 6), 16) };
    }

    function buildGrid() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cellSize = Math.max(60, 100 - density * 30);
      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);
      const nodes = [];
      const edges = [];

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          if (Math.random() > 0.55 * density) continue;
          const jitterX = (Math.random() - 0.5) * cellSize * 0.3;
          const jitterY = (Math.random() - 0.5) * cellSize * 0.3;
          nodes.push({
            x: c * cellSize + cellSize / 2 + jitterX,
            y: r * cellSize + cellSize / 2 + jitterY,
            size: 1.5 + Math.random() * 2,
          });
        }
      }

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < cellSize * 1.6 && Math.random() > 0.4) {
            edges.push({ from: i, to: j, dist });
          }
        }
      }

      nodesRef.current = nodes;
      edgesRef.current = edges;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    function draw() {
      time += 0.003;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const rgb = hexToRgb(color);
      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Draw edges
      edges.forEach((edge, ei) => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        if (!from || !to) return;

        ctx.beginPath();
        // Right-angle wire style
        const midX = (from.x + to.x) / 2;
        if (Math.abs(to.x - from.x) > Math.abs(to.y - from.y)) {
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(midX, from.y);
          ctx.lineTo(midX, to.y);
          ctx.lineTo(to.x, to.y);
        } else {
          const midY = (from.y + to.y) / 2;
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(from.x, midY);
          ctx.lineTo(to.x, midY);
          ctx.lineTo(to.x, to.y);
        }
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.07)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Traveling pulse on some edges
        if (ei % 4 === 0) {
          const pulseT = (time * 0.4 + ei * 0.07) % 1;
          const px = from.x + (to.x - from.x) * pulseT;
          const py = from.y + (to.y - from.y) * pulseT;
          const alpha = Math.sin(pulseT * Math.PI) * 0.5;

          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`;
          ctx.fill();
        }
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = 0.3 + Math.sin(time * 2 + i * 0.7) * 0.15;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.12 + pulse * 0.08})`;
        ctx.fill();

        // Cross-hair on some nodes
        if (i % 5 === 0) {
          const s = node.size + 3;
          ctx.beginPath();
          ctx.moveTo(node.x - s, node.y);
          ctx.lineTo(node.x + s, node.y);
          ctx.moveTo(node.x, node.y - s);
          ctx.lineTo(node.x, node.y + s);
          ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.06 + pulse * 0.03})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [color, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

/**
 * Vertical wire diagram — for docs/about pages showing pipeline steps.
 */
export function VerticalWireDiagram({ steps = [], color = '#A78BFA', height = 400, className = '' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

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
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function hexToRgb(hex) {
      hex = hex.replace('#', '');
      return { r: parseInt(hex.substring(0, 2), 16), g: parseInt(hex.substring(2, 4), 16), b: parseInt(hex.substring(4, 6), 16) };
    }

    function draw() {
      time += 0.006;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const rgb = hexToRgb(color);
      const count = steps.length;
      if (count < 2) return;

      const padding = h * 0.06;
      const spacing = (h - padding * 2) / (count - 1);
      const cx = w / 2;

      // Draw connections
      for (let i = 0; i < count - 1; i++) {
        const y1 = padding + i * spacing;
        const y2 = padding + (i + 1) * spacing;

        ctx.beginPath();
        ctx.moveTo(cx, y1 + 22);
        ctx.lineTo(cx, y2 - 22);
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.15)`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulse
        const pulseT = (time * 0.3 + i * 0.2) % 1;
        const py = (y1 + 22) + pulseT * (y2 - 22 - y1 - 22);
        const alpha = Math.sin(pulseT * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(cx, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`;
        ctx.fill();
      }

      // Draw nodes
      steps.forEach((step, i) => {
        const y = padding + i * spacing;
        const glow = 0.3 + Math.sin(time * 1.5 + i * 2) * 0.15;
        const nodeW = Math.min(w * 0.7, 220);

        // Node
        ctx.beginPath();
        ctx.roundRect(cx - nodeW/2, y - 18, nodeW, 36, 8);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.05)`;
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.15 + glow * 0.1})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.font = `${Math.min(12, w * 0.035)}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.6 + glow * 0.3})`;
        ctx.fillText(step, cx, y);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [steps, color]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} style={{ height }} />;
}
