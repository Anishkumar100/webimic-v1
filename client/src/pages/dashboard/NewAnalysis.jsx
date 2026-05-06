import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useJobsStore from '../../stores/jobsStore';
import { Scan, Globe, Layers, Monitor, Tablet, Smartphone, Eye, PenTool, Move, ArrowRight, Loader, AlertCircle, Check, Info } from 'lucide-react';

export default function NewAnalysis() {
  const navigate = useNavigate();
  const { createJob, isSubmitting } = useJobsStore();

  const [url, setUrl] = useState('');
  const [maxDepth, setMaxDepth] = useState(3);
  const [maxPages, setMaxPages] = useState(50);
  const [devices, setDevices] = useState({ desktop: true, tablet: true, mobile: true });
  const [captureAnimations, setCaptureAnimations] = useState(true);
  const [generateRedesign, setGenerateRedesign] = useState(true);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const toggleDevice = (key) => setDevices(d => ({ ...d, [key]: !d[key] }));

  const validateUrl = (val) => {
    try { new URL(val); return true; } catch { return false; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    if (!validateUrl(fullUrl)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    if (!devices.desktop && !devices.tablet && !devices.mobile) {
      setError('Select at least one device viewport');
      return;
    }

    const jobId = await createJob({
      siteUrl: fullUrl,
      config: { maxDepth, maxPages, devices, captureAnimations, generateRedesign },
    });

    if (jobId) navigate(`/dashboard/jobs/${jobId}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">New Analysis</h1>
        <p className="text-sm text-muted">Submit a public URL to crawl, capture screenshots, extract design tokens, and generate PDF specs.</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[{ n: 1, label: 'URL & Scope' }, { n: 2, label: 'Devices' }, { n: 3, label: 'Options' }].map((s, i) => (
          <button key={i} onClick={() => setStep(s.n)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              step === s.n ? 'bg-accent-400/10 text-accent-400 border border-accent-400/20' : step > s.n ? 'text-accent-400/60' : 'text-muted'
            }`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step > s.n ? 'bg-accent-400 text-dark-950' : step === s.n ? 'bg-accent-400/20 text-accent-400' : 'bg-white/5 text-muted'
            }`}>
              {step > s.n ? <Check size={12} /> : s.n}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-[fadeIn_0.3s]">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: URL & Scope */}
        {step === 1 && (
          <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease-out]">
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                <Globe size={15} className="text-accent-400" /> Site URL
              </label>
              <div className="relative">
                <input type="text" value={url} onChange={e => { setUrl(e.target.value); setError(''); }}
                  placeholder="https://example.com"
                  className="w-full bg-dark-950 border border-white/10 rounded-xl pl-4 pr-12 py-4 text-base text-white font-mono placeholder:text-muted/50 focus:outline-none focus:border-accent-400/50 focus:ring-1 focus:ring-accent-400/20 transition-all"
                  required autoFocus />
                {url && validateUrl(url.startsWith('http') ? url : `https://${url}`) && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Check size={18} className="text-accent-400" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted mt-2 flex items-start gap-1.5">
                <Info size={12} className="mt-0.5 flex-shrink-0" />
                Enter the homepage URL. Webimic will recursively discover internal pages from here.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Layers size={15} className="text-blue-400" /> Max depth
                </label>
                <select value={maxDepth} onChange={e => setMaxDepth(Number(e.target.value))}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-400/50 cursor-pointer appearance-none">
                  {[1,2,3,4,5].map(d => <option key={d} value={d}>Depth {d} {d === 1 ? '(single page)' : d === 3 ? '(recommended)' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                  <Scan size={15} className="text-blue-400" /> Max pages
                </label>
                <select value={maxPages} onChange={e => setMaxPages(Number(e.target.value))}
                  className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-400/50 cursor-pointer appearance-none">
                  {[5,10,25,50,100].map(p => <option key={p} value={p}>{p} pages {p === 50 ? '(recommended)' : ''}</option>)}
                </select>
              </div>
            </div>

            <button type="button" onClick={() => setStep(2)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-400/10 text-accent-400 font-semibold text-sm rounded-xl border border-accent-400/20 hover:bg-accent-400/20 transition-all cursor-pointer">
              Next: Choose devices <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2: Devices */}
        {step === 2 && (
          <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease-out]">
            <div>
              <h3 className="text-lg font-bold mb-1">Device Viewports</h3>
              <p className="text-sm text-muted">Choose which viewports to capture. Each adds a full-page screenshot per page.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { key: 'desktop', icon: Monitor, label: 'Desktop', size: '1440 × 900' },
                { key: 'tablet', icon: Tablet, label: 'Tablet', size: '768 × 1024' },
                { key: 'mobile', icon: Smartphone, label: 'Mobile', size: '390 × 844' },
              ].map(d => {
                const Icon = d.icon;
                const active = devices[d.key];
                return (
                  <button key={d.key} type="button" onClick={() => toggleDevice(d.key)}
                    className={`flex flex-col items-center gap-3 p-6 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-accent-400/10 border-accent-400/30 text-white shadow-lg shadow-accent-400/5'
                        : 'bg-white/[0.02] border-white/10 text-muted hover:border-white/20'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? 'bg-accent-400/20' : 'bg-white/5'}`}>
                      <Icon size={24} className={active ? 'text-accent-400' : 'text-muted'} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">{d.label}</p>
                      <p className="text-xs text-muted mt-0.5">{d.size}</p>
                    </div>
                    {active && <Check size={16} className="text-accent-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 border border-white/10 rounded-xl text-sm font-semibold text-muted-light hover:bg-white/5 transition-all cursor-pointer">
                Back
              </button>
              <button type="button" onClick={() => setStep(3)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent-400/10 text-accent-400 font-semibold text-sm rounded-xl border border-accent-400/20 hover:bg-accent-400/20 transition-all cursor-pointer">
                Next: Options <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Options & Submit */}
        {step === 3 && (
          <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 animate-[fadeSlideUp_0.3s_ease-out]">
            <div>
              <h3 className="text-lg font-bold mb-1">Analysis Options</h3>
              <p className="text-sm text-muted">Configure what to extract and generate.</p>
            </div>

            <div className="space-y-4">
              <ToggleOption icon={Move} label="Capture animations" desc="Record CSS transitions, animation properties, and timing functions from all pages."
                checked={captureAnimations} onChange={() => setCaptureAnimations(!captureAnimations)} />
              <ToggleOption icon={PenTool} label="Generate redesign spec (Doc B)" desc="Produce Doc B with alternate palettes, dark mode suggestions, and accessibility notes."
                checked={generateRedesign} onChange={() => setGenerateRedesign(!generateRedesign)} />
            </div>

            {/* Summary */}
            <div className="bg-dark-950/60 rounded-xl p-5 border border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Analysis Summary</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted">URL:</span> <span className="text-accent-400 font-mono text-xs">{url || '—'}</span></div>
                <div><span className="text-muted">Depth:</span> <span className="text-white">{maxDepth}</span></div>
                <div><span className="text-muted">Max pages:</span> <span className="text-white">{maxPages}</span></div>
                <div><span className="text-muted">Devices:</span> <span className="text-white">{Object.entries(devices).filter(([,v]) => v).map(([k]) => k).join(', ') || 'None'}</span></div>
                <div><span className="text-muted">Animations:</span> <span className="text-white">{captureAnimations ? 'Yes' : 'No'}</span></div>
                <div><span className="text-muted">Doc B:</span> <span className="text-white">{generateRedesign ? 'Yes' : 'No'}</span></div>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 border border-white/10 rounded-xl text-sm font-semibold text-muted-light hover:bg-white/5 transition-all cursor-pointer">
                Back
              </button>
              <button type="submit" disabled={isSubmitting || !url}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent-400 to-blue-500 text-dark-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                {isSubmitting ? <><Loader size={16} className="animate-spin" /> Submitting...</> : <><Scan size={16} /> Start Analysis</>}
              </button>
            </div>
          </div>
        )}
      </form>

      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

function ToggleOption({ icon: Icon, label, desc, checked, onChange }) {
  return (
    <button type="button" onClick={onChange}
      className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all text-left cursor-pointer ${
        checked ? 'bg-accent-400/5 border-accent-400/20' : 'bg-white/[0.02] border-white/10 hover:border-white/20'
      }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${checked ? 'bg-accent-400/15' : 'bg-white/5'}`}>
        <Icon size={18} className={checked ? 'text-accent-400' : 'text-muted'} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted mt-0.5">{desc}</p>
      </div>
      <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 flex-shrink-0 ${checked ? 'bg-accent-400' : 'bg-white/10'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </button>
  );
}
