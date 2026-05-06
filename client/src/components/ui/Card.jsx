import { Link } from 'react-router-dom';

export default function Card({ children, className = '', to, href, hover = true, ...props }) {
  const base = `glass-card rounded-2xl p-6 transition-all duration-300 ${hover ? 'hover:border-white/15 hover:bg-white/[0.05] hover:scale-[1.02]' : ''} ${className}`;

  if (to) return <Link to={to} className={`block ${base}`} {...props}>{children}</Link>;
  if (href) return <a href={href} className={`block ${base}`} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  return <div className={base} {...props}>{children}</div>;
}
