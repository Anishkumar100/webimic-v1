import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoFull } from '../ui/Logo';
import Container from '../ui/Container';
import { footerData } from '../../utils/navData';
import { Globe, ExternalLink, Rss } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setTimeout(() => { setSubscribed(false); setEmail(''); }, 3000); }
  };

  return (
    <footer className="relative bg-dark-950 overflow-hidden">
      {/* Subtle top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        <div className="pt-16 pb-6">
          {/* Main grid: 4 columns matching LangChain exactly */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-10 mb-20">
            {/* Products column */}
            <div>
              <h4 className="text-sm font-semibold text-blue-400/80 mb-5 tracking-wide">Products</h4>
              <ul className="space-y-3">
                {footerData.products.map((item, i) => (
                  <li key={i}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources column */}
            <div>
              <h4 className="text-sm font-semibold text-blue-400/80 mb-5 tracking-wide">Resources</h4>
              <ul className="space-y-3">
                {footerData.resources.map((item, i) => (
                  <li key={i}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h4 className="text-sm font-semibold text-blue-400/80 mb-5 tracking-wide">Company</h4>
              <ul className="space-y-3">
                {footerData.company.map((item, i) => (
                  <li key={i}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter column */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2 leading-snug">
                Sign up for our newsletter to stay up to date
              </h4>
              <div className="mt-5 mb-5">
                <form onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-white/[0.04] border border-white/15 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-white/30 transition-colors mb-3"
                    required
                  />
                  <button
                    type="submit"
                    className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      subscribed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white text-dark-950 hover:bg-white/90'
                    }`}
                  >
                    {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </form>
              </div>

              {/* Social icons - right aligned like LangChain */}
              <div className="flex items-center gap-4 justify-end mt-6">
                <a href="#" className="text-muted hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-muted hover:text-white transition-colors" aria-label="X / Twitter">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-muted hover:text-white transition-colors" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Giant outlined logo watermark - matching LangChain exactly */}
          <div className="relative mb-8 select-none" style={{ height: '180px' }}>
            <svg
              viewBox="0 0 900 180"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Giant "Webimic" outlined text */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="160"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1.5"
                fill="none"
              >
                Webimic
              </text>
              {/* Subtle filled version behind for depth */}
              <text
                x="50%"
                y="55%"
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="160"
                fontFamily="Plus Jakarta Sans, sans-serif"
                fontWeight="800"
                fill="rgba(255,255,255,0.015)"
              >
                Webimic
              </text>
            </svg>

            {/* Logo icon overlapping the text, left-aligned */}
            <div className="absolute left-[8%] top-1/2 -translate-y-1/2">
              <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.06]">
                <rect x="2" y="2" width="44" height="44" rx="10" stroke="white" strokeWidth="1.5"/>
                <rect x="8" y="8" width="14" height="14" rx="3" fill="white" opacity="0.3"/>
                <rect x="26" y="8" width="14" height="6" rx="2" fill="white" opacity="0.2"/>
                <rect x="26" y="17" width="14" height="5" rx="2" fill="white" opacity="0.15"/>
                <rect x="8" y="26" width="32" height="5" rx="2" fill="white" opacity="0.18"/>
                <rect x="8" y="34" width="20" height="5" rx="2" fill="white" opacity="0.12"/>
              </svg>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Status */}
            <div className="flex items-center gap-2">
              <a href="#" className="flex items-center gap-2 text-xs text-muted hover:text-white transition-colors font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                All systems operational
              </a>
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-8">
              <Link to="/privacy" className="text-xs text-muted hover:text-white transition-colors font-mono">Privacy policy</Link>
              <Link to="/terms" className="text-xs text-muted hover:text-white transition-colors font-mono">Terms of service</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ item }) {
  const Comp = item.to ? Link : 'a';
  const props = item.to ? { to: item.to } : { href: item.href || '#' };
  return (
    <Comp {...props} className="text-sm text-muted hover:text-white transition-colors font-mono tracking-tight">
      {item.label}
    </Comp>
  );
}
