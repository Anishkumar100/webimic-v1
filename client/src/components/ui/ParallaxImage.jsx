import { useRef, useState, useEffect } from 'react';

export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  speed = 0.15,
  overlay = true,
  overlayColor = 'from-dark-950/60 via-transparent to-transparent',
  rounded = '2xl',
}) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function handleScroll() {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const fromCenter = (center - windowH / 2) / windowH;
      setOffset(fromCenter * speed * 100);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-${rounded} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover transition-opacity duration-700"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
          opacity: isLoaded ? 1 : 0,
        }}
      />
      {overlay && (
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayColor}`} />
      )}
    </div>
  );
}
