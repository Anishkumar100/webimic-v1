import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-gradient-to-r from-accent-400 to-blue-500 text-dark-950 font-semibold hover:shadow-lg hover:shadow-accent-400/20 hover:scale-[1.03] active:scale-[0.98]',
  secondary: 'border border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-[1.03] active:scale-[0.98]',
  ghost: 'text-muted-light hover:text-white',
  accent: 'bg-accent-400/10 text-accent-400 border border-accent-400/20 hover:bg-accent-400/20 hover:scale-[1.03]',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export default function Button({ children, variant = 'primary', size = 'md', href, to, className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}
