import { useEffect, useRef } from 'react';

/**
 * Renders a glowing node-based flowchart diagram.
 * Pass `nodes` array with { id, label, x, y } (0-1 normalized coordinates)
 * and `edges` array with { from, to } referencing node ids.
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
      ctx.scale(dpr, dpr);
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
      const resolvedNodes = nodes.map(n => ({
        ...n,
        px: n.x * w,
        py: n.y * h,
      }));

      // Draw edges as smooth curves
      edges.forEach((edge, ei) => {
        const from = resolvedNodes.find(n => n.id === edge.from);
        const to = resolvedNodes.find(n => n.id === edge.to);
        if (!from || !to) return;

        // Calculate control points for curved lines
        const dx = to.px - from.px;
        const dy = to.py - from.py;
        const midX = (from.px + to.px) / 2;
        const midY = (from.py + to.py) / 2;

        // Curve more on vertical connections
        const curveAmount = Math.abs(dy) > Math.abs(dx) ? dx * 0.3 : dy * 0.3;
        const cp1x = from.px + (Math.abs(dy) > Math.abs(dx) ? 0 : curveAmount);
        const cp1y = from.py + dy * 0.4;
        const cp2x = to.px - (Math.abs(dy) > Math.abs(dx) ? 0 : curveAmount);
        const cp2y = to.py - dy * 0.4;

        // Static line
        ctx.beginPath();
        ctx.moveTo(from.px, from.py);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.px, to.py);
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.15)`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Animated pulse along edge
        const pulseT = (time * 0.3 + ei * 0.15) % 1;
        const mt = 1 - pulseT;
        const px = mt*mt*mt*from.px + 3*mt*mt*pulseT*cp1x + 3*mt*pulseT*pulseT*cp2x + pulseT*pulseT*pulseT*to.px;
        const py = mt*mt*mt*from.py + 3*mt*mt*pulseT*cp1y + 3*mt*pulseT*pulseT*cp2y + pulseT*pulseT*pulseT*to.py;
        const alpha = Math.sin(pulseT * Math.PI) * 0.6;

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${alpha * 0.12})`;
        ctx.fill();
      });

      // Draw nodes
      resolvedNodes.forEach((node) => {
        const glow = 0.3 + Math.sin(time * 2 + node.x * 5) * 0.15;

        // Outer glow
        ctx.beginPath();
        ctx.roundRect(node.px - 70, node.py - 20, 140, 40, 20);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${glow * 0.05})`;
        ctx.fill();

        // Node background
        ctx.beginPath();
        ctx.roundRect(node.px - 65, node.py - 17, 130, 34, 17);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.06)`;
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.2 + glow * 0.1})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${0.7 + glow * 0.3})`;
        ctx.fillText(node.label, node.px, node.py);

        // Connection dot
        ctx.beginPath();
        ctx.arc(node.px, node.py - 17, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${glow * 0.6})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.px, node.py + 17, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, ${glow * 0.6})`;
        ctx.fill();
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

// Preset diagram: Webimic analysis pipeline
export function WebimicPipelineDiagram({ className = '' }) {
  return (
    <FlowchartDiagram
      className={className}
      color="#38BDF8"
      height={380}
      nodes={[
        { id: 'url', label: 'seed URL', x: 0.5, y: 0.08 },
        { id: 'crawler', label: 'crawler engine', x: 0.5, y: 0.28 },
        { id: 'screenshots', label: 'screenshots', x: 0.22, y: 0.5 },
        { id: 'tokens', label: 'design tokens', x: 0.78, y: 0.5 },
        { id: 'doca', label: 'doc A spec', x: 0.3, y: 0.75 },
        { id: 'docb', label: 'doc B redesign', x: 0.7, y: 0.75 },
        { id: 'llm', label: 'LLM prompt', x: 0.5, y: 0.93 },
      ]}
      edges={[
        { from: 'url', to: 'crawler' },
        { from: 'crawler', to: 'screenshots' },
        { from: 'crawler', to: 'tokens' },
        { from: 'screenshots', to: 'doca' },
        { from: 'tokens', to: 'doca' },
        { from: 'tokens', to: 'docb' },
        { from: 'screenshots', to: 'docb' },
        { from: 'doca', to: 'llm' },
        { from: 'docb', to: 'llm' },
      ]}
    />
  );
}
