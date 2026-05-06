export default function Logo({ className = '', size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="2" width="44" height="44" rx="10" stroke="url(#logo-grad)" strokeWidth="2.5" fill="none"/>
      <rect x="8" y="8" width="14" height="14" rx="3" fill="url(#logo-grad)" opacity="0.9"/>
      <rect x="26" y="8" width="14" height="6" rx="2" fill="url(#logo-grad)" opacity="0.6"/>
      <rect x="26" y="17" width="14" height="5" rx="2" fill="url(#logo-grad)" opacity="0.4"/>
      <rect x="8" y="26" width="32" height="5" rx="2" fill="url(#logo-grad)" opacity="0.5"/>
      <rect x="8" y="34" width="20" height="5" rx="2" fill="url(#logo-grad)" opacity="0.35"/>
      <rect x="31" y="34" width="9" height="5" rx="2" fill="url(#logo-grad)" opacity="0.25"/>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#00E8C6"/>
          <stop offset="0.5" stopColor="#38BDF8"/>
          <stop offset="1" stopColor="#A78BFA"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoFull({ className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Logo size={30} />
      <span className="text-xl font-bold tracking-tight font-display">
        <span className="text-white">Web</span>
        <span className="text-gradient">imic</span>
      </span>
    </div>
  );
}
