import { useEffect, useRef } from 'react';

export default function GradientOrbs({ className = '', count = 5 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.innerHTML = '';

    const colors = [
      ['#00E8C6', '#0EA5E9'],
      ['#38BDF8', '#A78BFA'],
      ['#A78BFA', '#F472B6'],
      ['#0EA5E9', '#00E8C6'],
      ['#F472B6', '#FBBF24'],
    ];

    for (let i = 0; i < count; i++) {
      const orb = document.createElement('div');
      const [c1, c2] = colors[i % colors.length];
      const size = 200 + Math.random() * 400;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const dur = 15 + Math.random() * 25;
      const delay = -Math.random() * dur;

      Object.assign(orb.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${c1}12 0%, ${c2}06 40%, transparent 70%)`,
        borderRadius: '50%',
        filter: 'blur(40px)',
        animation: `orbFloat${i % 3} ${dur}s ease-in-out ${delay}s infinite`,
        pointerEvents: 'none',
      });
      el.appendChild(orb);
    }
  }, [count]);

  return (
    <>
      <style>{`
        @keyframes orbFloat0 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          25% { transform: translate(-50%, -50%) translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-50%, -50%) translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(-50%, -50%) translate(15px, 35px) scale(1.05); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          33% { transform: translate(-50%, -50%) translate(-40px, 25px) scale(1.15); }
          66% { transform: translate(-50%, -50%) translate(25px, -30px) scale(0.85); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) translate(35px, 40px) scale(1.2); opacity: 1; }
        }
      `}</style>
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />
    </>
  );
}
