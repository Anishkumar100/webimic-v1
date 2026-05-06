import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [ref, isVisible] = useScrollReveal(0.2);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const numericEnd = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quint
      const eased = 1 - Math.pow(1 - progress, 5);
      setCount(Math.round(eased * numericEnd));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isVisible, end, duration]);

  const formatted = count >= 1000000
    ? `${(count / 1000000).toFixed(count % 1000000 === 0 ? 0 : 1)}M`
    : count >= 1000
    ? `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}K`
    : count.toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
