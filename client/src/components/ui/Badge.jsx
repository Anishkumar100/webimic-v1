const variants = {
  default: 'bg-white/5 text-muted-light border-white/10',
  accent: 'bg-accent-400/10 text-accent-400 border-accent-400/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider border rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
