import { useEffect, useRef } from 'react';

export default function CircuitGrid({ className = '', intensity = 1, color = '#00E8C6' }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes, pulses, time = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      initNodes();
    }

    function initNodes() {
      nodes = [];
      pulses = [];
      const spacing = 80;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jx = (Math.random() - 0.5) * 20;
          const jy = (Math.random() - 0.5) * 20;
          nodes.push({
            x: c * spacing + jx, y: r * spacing + jy,
            connections: [], size: 1.5 + Math.random() * 2,
            phase: Math.random() * Math.PI * 2,
            active: Math.random() < 0.3,
          });
        }
      }
      // Build connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < spacing * 1.6 && Math.random() < 0.4) {
            nodes[i].connections.push(j);
          }
        }
      }
    }

    function spawnPulse() {
      if (pulses.length > 15 * intensity) return;
      const srcIdx = Math.floor(Math.random() * nodes.length);
      const src = nodes[srcIdx];
      if (src.connections.length === 0) return;
      const tgtIdx = src.connections[Math.floor(Math.random() * src.connections.length)];
      pulses.push({ from: srcIdx, to: tgtIdx, progress: 0, speed: 0.008 + Math.random() * 0.012 });
    }

    function draw() {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        for (const j of n.connections) {
          const m = nodes[j];
          const alpha = 0.04 + Math.sin(time * 0.5 + n.phase) * 0.02;
          ctx.beginPath();
          // Draw L-shaped circuit paths instead of straight lines
          const midX = n.x + (m.x - n.x) * 0.5;
          ctx.moveTo(n.x, n.y);
          if (Math.random() > 0.5) {
            ctx.lineTo(midX, n.y);
            ctx.lineTo(midX, m.y);
          } else {
            ctx.lineTo(n.x, m.y);
          }
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = color.replace(')', `,${alpha})`).replace('rgb', 'rgba').replace('#', '');
          ctx.strokeStyle = `rgba(${hexToRgb(color)},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = n.active ? 0.15 + Math.sin(time * 2 + n.phase) * 0.1 : 0.04;
        const sz = n.size * (n.active ? 1 + Math.sin(time * 3 + n.phase) * 0.3 : 1);
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)},${glow})`;
        ctx.fill();
        if (n.active) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, sz * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(color)},${glow * 0.3})`;
          ctx.fill();
        }
      }

      // Draw & update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) { pulses.splice(i, 1); continue; }
        const src = nodes[p.from];
        const tgt = nodes[p.to];
        const x = src.x + (tgt.x - src.x) * p.progress;
        const y = src.y + (tgt.y - src.y) * p.progress;
        const alpha = Math.sin(p.progress * Math.PI) * 0.8;
        // Pulse glow
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)},${alpha})`;
        ctx.fill();
        // Pulse outer glow
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(color)},${alpha * 0.15})`;
        ctx.fill();
        // Trail
        const trail = 0.15;
        for (let t = 1; t <= 4; t++) {
          const tp = Math.max(0, p.progress - t * trail * p.speed * 10);
          const tx = src.x + (tgt.x - src.x) * tp;
          const ty = src.y + (tgt.y - src.y) * tp;
          ctx.beginPath();
          ctx.arc(tx, ty, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(color)},${alpha * (1 - t * 0.25) * 0.4})`;
          ctx.fill();
        }
      }

      // Spawn new pulses
      if (Math.random() < 0.06 * intensity) spawnPulse();

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [color, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
