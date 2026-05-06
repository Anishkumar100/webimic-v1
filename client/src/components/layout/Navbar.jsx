import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoFull } from '../ui/Logo';
import Button from '../ui/Button';
import { navData } from '../../utils/navData';
import { useScrollPosition } from '../../hooks/useScrollReveal';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => { setMobileOpen(false); setActiveMenu(null); }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMouseEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const isScrolled = scrollY > 40;

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-accent-400/10 via-blue-500/10 to-violet-500/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 py-2.5 flex items-center justify-center gap-3 text-sm">
          <span className="text-muted-light">Introducing Webimic v2 — Full redesign engine with dark mode support</span>
          <Link to="/product/redesign" className="text-accent-400 hover:text-accent-400/80 font-semibold flex items-center gap-1 transition-colors">
            Learn more <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-scrolled' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Left: Logo */}
            <Link to="/" className="flex-shrink-0 relative z-50">
              <LogoFull />
            </Link>

            {/* Center: Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Products Mega Menu */}
              <div
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter('products')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-white ${activeMenu === 'products' ? 'text-white' : 'text-muted-light'}`}>
                  Products <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`nav-dropdown ${activeMenu === 'products' ? 'open' : ''} absolute top-full left-1/2 -translate-x-1/2 pt-3`}>
                  <div className="glass-card rounded-2xl p-6 min-w-[580px] grid grid-cols-2 gap-6 shadow-2xl shadow-black/50">
                    {navData.products.columns.map((col, ci) => (
                      <div key={ci}>
                        {col.headingLink ? (
                          <Link to={col.headingLink} className="text-xs font-semibold uppercase tracking-wider text-muted mb-4 block hover:text-accent-400 transition-colors">
                            {col.heading}
                          </Link>
                        ) : (
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">{col.heading}</p>
                        )}
                        <div className="space-y-1">
                          {col.items.map((item, ii) => {
                            const Icon = item.icon;
                            const Comp = item.to ? Link : 'a';
                            const linkProps = item.to ? { to: item.to } : { href: item.href, target: '_blank', rel: 'noopener noreferrer' };
                            return (
                              <Comp key={ii} {...linkProps} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                                <div className="w-8 h-8 rounded-lg bg-accent-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-400/20 transition-colors">
                                  <Icon size={16} className="text-accent-400" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-white group-hover:text-accent-400 transition-colors">{item.label}</p>
                                  <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                                </div>
                              </Comp>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Learn Mega Menu */}
              <div
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter('learn')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-white ${activeMenu === 'learn' ? 'text-white' : 'text-muted-light'}`}>
                  Learn <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'learn' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`nav-dropdown ${activeMenu === 'learn' ? 'open' : ''} absolute top-full left-1/2 -translate-x-1/2 pt-3`}>
                  <div className="glass-card rounded-2xl p-6 min-w-[560px] grid grid-cols-3 gap-6 shadow-2xl shadow-black/50">
                    {navData.learn.columns.map((col, ci) => (
                      <div key={ci}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">{col.heading}</p>
                        <div className="space-y-1">
                          {col.items.map((item, ii) => {
                            const Comp = item.to ? Link : 'a';
                            const linkProps = item.to ? { to: item.to } : { href: item.href, target: '_blank', rel: 'noopener noreferrer' };
                            return (
                              <Comp key={ii} {...linkProps} className="block px-2.5 py-2 text-sm text-muted-light hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                {item.label}
                              </Comp>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Docs Direct Link */}
              <Link to="/docs" className="px-4 py-2 text-sm font-medium text-muted-light hover:text-white transition-colors rounded-lg">
                Docs
              </Link>

              {/* Company Dropdown */}
              <div
                className="nav-item relative"
                onMouseEnter={() => handleMouseEnter('company')}
                onMouseLeave={handleMouseLeave}
              >
                <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:text-white ${activeMenu === 'company' ? 'text-white' : 'text-muted-light'}`}>
                  Company <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === 'company' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`nav-dropdown ${activeMenu === 'company' ? 'open' : ''} absolute top-full left-1/2 -translate-x-1/2 pt-3`}>
                  <div className="glass-card rounded-2xl p-4 min-w-[200px] shadow-2xl shadow-black/50">
                    <div className="space-y-1">
                      {navData.company.items.map((item, i) => (
                        <Link key={i} to={item.to} className="block px-3 py-2.5 text-sm text-muted-light hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Direct Link */}
              <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-muted-light hover:text-white transition-colors rounded-lg">
                Pricing
              </Link>
            </div>

            {/* Right: CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/signin" className="text-sm font-medium text-muted-light hover:text-white transition-colors px-3 py-2">
                Sign in
              </Link>
              <Button to="/signup" size="sm">Get started</Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative z-50 p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-dark-900/98 backdrop-blur-xl overflow-y-auto pt-20 pb-8 px-5 lg:hidden">
          <MobileNavSection title="Products" data={navData.products} />
          <MobileNavSection title="Learn" data={navData.learn} />
          <div className="border-t border-white/5 py-4">
            <Link to="/docs" className="block py-3 text-lg font-medium text-muted-light hover:text-white">Docs</Link>
          </div>
          <MobileNavSection title="Company" data={navData.company} isSimple />
          <div className="border-t border-white/5 py-4">
            <Link to="/pricing" className="block py-3 text-lg font-medium text-muted-light hover:text-white">Pricing</Link>
          </div>
          <div className="mt-6 space-y-3">
            <Button to="/signup" className="w-full" size="lg">Get started</Button>
            <Button to="/signin" variant="secondary" className="w-full" size="lg">Sign in</Button>
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavSection({ title, data, isSimple = false }) {
  const [open, setOpen] = useState(false);
  const items = isSimple ? data.items : (data.columns || []).flatMap(c => c.items);

  return (
    <div className="border-t border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-lg font-medium text-muted-light hover:text-white"
      >
        {title}
        <ChevronDown size={18} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 space-y-1 pl-2">
          {items.map((item, i) => {
            const Comp = item.to ? Link : 'a';
            const linkProps = item.to ? { to: item.to } : { href: item.href };
            return (
              <Comp key={i} {...linkProps} className="block py-2.5 text-sm text-muted hover:text-white transition-colors">
                {item.label}
                {item.desc && <span className="block text-xs text-muted/60 mt-0.5">{item.desc}</span>}
              </Comp>
            );
          })}
        </div>
      )}
    </div>
  );
}
