import { useScrollReveal } from '../../hooks/useScrollReveal';

const variants = {
  fadeUp: { from: 'translate3d(0, 50px, 0) scale(0.98)', to: 'translate3d(0,0,0) scale(1)' },
  fadeDown: { from: 'translate3d(0, -50px, 0)', to: 'translate3d(0,0,0)' },
  slideLeft: { from: 'translate3d(80px, 0, 0)', to: 'translate3d(0,0,0)' },
  slideRight: { from: 'translate3d(-80px, 0, 0)', to: 'translate3d(0,0,0)' },
  scaleIn: { from: 'scale(0.85)', to: 'scale(1)' },
  blurIn: { from: 'translate3d(0, 30px, 0) scale(0.97)', to: 'translate3d(0,0,0) scale(1)', blurFrom: '8px', blurTo: '0px' },
  parallax: { from: 'translate3d(0, 60px, 0)', to: 'translate3d(0,0,0)' },
  rotateIn: { from: 'translate3d(0, 40px, 0) rotate(3deg)', to: 'translate3d(0,0,0) rotate(0deg)' },
  // Legacy support
  up: { from: 'translate3d(0, 40px, 0)', to: 'translate3d(0,0,0)' },
  down: { from: 'translate3d(0, -40px, 0)', to: 'translate3d(0,0,0)' },
  left: { from: 'translate3d(40px, 0, 0)', to: 'translate3d(0,0,0)' },
  right: { from: 'translate3d(-40px, 0, 0)', to: 'translate3d(0,0,0)' },
  none: { from: 'translate3d(0, 0, 0)', to: 'translate3d(0,0,0)' },
};

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction,
  variant,
  duration = 0.8,
  easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
  once = true,
  stagger = 0,
  as: Tag = 'div',
}) {
  const [ref, isVisible] = useScrollReveal(0.1);
  const v = variants[variant || direction || 'fadeUp'];

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? v.to : v.from,
    filter: v.blurFrom
      ? (isVisible ? `blur(${v.blurTo})` : `blur(${v.blurFrom})`)
      : undefined,
    transition: `opacity ${duration}s ${easing} ${delay}s, transform ${duration}s ${easing} ${delay}s${v.blurFrom ? `, filter ${duration}s ${easing} ${delay}s` : ''}`,
    willChange: 'opacity, transform',
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

// Stagger wrapper — applies incremental delays to children
export function StaggerReveal({ children, className = '', baseDelay = 0, staggerDelay = 0.08, variant = 'fadeUp', ...rest }) {
  const [ref, isVisible] = useScrollReveal(0.08);
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={ref} className={className}>
      {childArray.map((child, i) => {
        const v = variants[variant];
        const d = baseDelay + i * staggerDelay;
        return (
          <div
            key={i}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? v.to : v.from,
              filter: v.blurFrom ? (isVisible ? `blur(${v.blurTo})` : `blur(${v.blurFrom})`) : undefined,
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s${v.blurFrom ? `, filter 0.7s cubic-bezier(0.16,1,0.3,1) ${d}s` : ''}`,
              willChange: 'opacity, transform',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
