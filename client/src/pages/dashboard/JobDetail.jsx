import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useJobsStore from '../../stores/jobsStore';
import { ArrowLeft, Globe, Clock, CheckCircle, Loader, AlertCircle, FileText, Download, Copy, Check, Palette, Type, Move, Ruler, Eye, ExternalLink, ChevronDown } from 'lucide-react';

const statusConfig = {
  COMPLETED: { icon: CheckCircle, color: '#00E8C6', label: 'Completed', bg: 'bg-emerald-400/10' },
  CRAWLING: { icon: Loader, color: '#38BDF8', label: 'Crawling', bg: 'bg-blue-400/10', spin: true },
  EXTRACTING: { icon: Loader, color: '#A78BFA', label: 'Extracting', bg: 'bg-violet-400/10', spin: true },
  GENERATING: { icon: Loader, color: '#F472B6', label: 'Generating', bg: 'bg-pink-400/10', spin: true },
  QUEUED: { icon: Clock, color: '#FBBF24', label: 'Queued', bg: 'bg-yellow-400/10' },
  FAILED: { icon: AlertCircle, color: '#F87171', label: 'Failed', bg: 'bg-red-400/10' },
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: Eye },
  { id: 'colors', label: 'Colors', icon: Palette },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'spacing', label: 'Spacing', icon: Ruler },
  { id: 'animations', label: 'Animations', icon: Move },
  { id: 'pages', label: 'Pages', icon: Globe },
];

export default function JobDetail() {
  const { jobId } = useParams();
  const { currentJob: job, fetchJob, isLoading } = useJobsStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedHex, setCopiedHex] = useState(null);

  useEffect(() => { fetchJob(jobId); }, [jobId]);

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  if (isLoading || !job) {
    return (
      <div className="flex items-center justify-center py-32 gap-3 text-muted">
        <Loader size={20} className="animate-spin" /> Loading job details...
      </div>
    );
  }

  const sc = statusConfig[job.status] || statusConfig.QUEUED;
  const StatusIcon = sc.icon;
  const tokens = job.tokens || {};

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to="/dashboard/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors mb-4">
          <ArrowLeft size={14} /> Back to jobs
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{job.siteUrl}</h1>
              <a href={job.siteUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-400 transition-colors">
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${sc.bg}`} style={{ color: sc.color }}>
                <StatusIcon size={13} className={sc.spin ? 'animate-spin' : ''} />
                {sc.label}
              </div>
              <span className="text-xs text-muted">Started {new Date(job.createdAt).toLocaleString()}</span>
              {job.duration && <span className="text-xs text-muted">· {Math.round(job.duration / 1000)}s</span>}
            </div>
          </div>

          {/* Download buttons */}
          {job.status === 'COMPLETED' && (
            <div className="flex gap-2">
              {job.documents?.docA && (
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-400/10 text-accent-400 font-semibold text-sm rounded-xl border border-accent-400/20 hover:bg-accent-400/20 transition-all cursor-pointer">
                  <Download size={15} /> Doc A
                </button>
              )}
              {job.documents?.docB && (
                <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-pink-400/10 text-pink-400 font-semibold text-sm rounded-xl border border-pink-400/20 hover:bg-pink-400/20 transition-all cursor-pointer">
                  <Download size={15} /> Doc B
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Config summary */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4 text-sm">
          <Stat label="Pages found" value={job.pagesFound} />
          <Stat label="Pages crawled" value={job.pagesCrawled} />
          <Stat label="Tokens extracted" value={job.tokensExtracted} />
          <Stat label="Depth" value={job.config?.maxDepth} />
          <Stat label="Devices" value={Object.entries(job.config?.devices || {}).filter(([,v]) => v).map(([k]) => k).join(', ')} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer border ${
                activeTab === t.id
                  ? 'bg-white/10 text-white border-white/15'
                  : 'text-muted hover:text-white hover:bg-white/5 border-transparent'
              }`}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-[fadeIn_0.3s_ease-out]" key={activeTab}>
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Progress timeline */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold mb-5">Analysis Pipeline</h3>
              <div className="space-y-0">
                {['QUEUED', 'CRAWLING', 'EXTRACTING', 'GENERATING', 'COMPLETED'].map((step, i, arr) => {
                  const s = statusConfig[step];
                  const Icon = s.icon;
                  const stepOrder = arr.indexOf(job.status);
                  const thisOrder = i;
                  const isDone = thisOrder < stepOrder || (thisOrder === stepOrder && job.status === 'COMPLETED');
                  const isCurrent = thisOrder === stepOrder && job.status !== 'COMPLETED' && job.status !== 'FAILED';

                  return (
                    <div key={step} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          isDone ? 'bg-accent-400 border-accent-400' : isCurrent ? 'border-blue-400 bg-blue-400/20' : 'border-white/10 bg-white/[0.03]'
                        }`}>
                          {isDone ? <Check size={14} className="text-dark-950" /> : isCurrent ? <Loader size={14} className="text-blue-400 animate-spin" /> : <div className="w-2 h-2 rounded-full bg-white/20" />}
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`w-0.5 h-8 ${isDone ? 'bg-accent-400/40' : 'bg-white/5'}`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`text-sm font-semibold ${isDone ? 'text-white' : isCurrent ? 'text-blue-400' : 'text-muted'}`}>{s.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documents */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-base font-bold mb-5">Generated Documents</h3>
              <div className="space-y-4">
                <DocCard title="Doc A — Observed UI Spec" desc="Screenshots, color palettes, typography, spacing, animation catalog, component breakdowns."
                  available={!!job.documents?.docA} color="#00E8C6" />
                <DocCard title="Doc B — Redesign Proposals" desc="Palette alternatives, dark mode tokens, accessibility audit, visual comparisons."
                  available={!!job.documents?.docB} color="#F472B6" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold mb-5">Extracted Color Palette</h3>
            {tokens.colors?.length ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {tokens.colors.map((c, i) => (
                  <button key={i} onClick={() => copyHex(c.hex)}
                    className="group cursor-pointer text-left" style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.05}s both` }}>
                    <div className="h-20 rounded-xl mb-2 border border-white/10 group-hover:scale-[1.05] group-hover:shadow-lg transition-all relative overflow-hidden"
                      style={{ backgroundColor: c.hex }}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        {copiedHex === c.hex ? <Check size={18} className="text-white" /> : <Copy size={16} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-muted-light">{c.hex}</p>
                    <p className="text-[10px] text-muted capitalize">{c.role} {c.name ? `· ${c.name}` : ''}</p>
                  </button>
                ))}
              </div>
            ) : <p className="text-muted text-sm">No colors extracted yet.</p>}
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold mb-5">Typography Scale</h3>
            {tokens.typography?.length ? (
              <div className="space-y-4">
                {tokens.typography.map((t, i) => (
                  <div key={i} className="flex items-start gap-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                    style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.08}s both` }}>
                    <div className="flex-1">
                      <p style={{ fontFamily: t.fontFamily, fontSize: Math.min(parseInt(t.fontSize), 32), fontWeight: t.fontWeight, lineHeight: t.lineHeight }}
                        className="text-white mb-2 truncate">
                        {t.name}: The quick brown fox
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted font-mono">{t.fontFamily}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted font-mono">{t.fontSize}/{t.lineHeight}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted font-mono">weight: {t.fontWeight}</span>
                      </div>
                    </div>
                    <span className="text-xs text-accent-400 font-semibold bg-accent-400/10 px-2 py-1 rounded-lg flex-shrink-0">{t.name}</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted text-sm">No typography data extracted yet.</p>}
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold mb-5">Spacing Scale</h3>
            {tokens.spacing?.length ? (
              <div className="space-y-3">
                {tokens.spacing.map((s, i) => (
                  <div key={i} className="flex items-center gap-4" style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.05}s both` }}>
                    <span className="text-xs font-mono text-muted w-12 text-right">{s}</span>
                    <div className="flex-1 h-8 rounded-lg overflow-hidden bg-white/[0.02] border border-white/5">
                      <div className="h-full bg-gradient-to-r from-accent-400/30 to-accent-400/5 rounded-lg transition-all duration-500"
                        style={{ width: `${Math.min((parseInt(s) / 64) * 100, 100)}%` }} />
                    </div>
                    <span className="text-xs text-muted w-8">{parseInt(s) / 4}×</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted text-sm">No spacing data extracted yet.</p>}
          </div>
        )}

        {activeTab === 'animations' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold mb-5">Recorded Animations</h3>
            {tokens.animations?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Element</th>
                      <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Trigger</th>
                      <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Duration</th>
                      <th className="text-left py-3 pr-4 text-xs font-semibold text-muted uppercase">Easing</th>
                      <th className="text-left py-3 text-xs font-semibold text-muted uppercase">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tokens.animations.map((a, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors"
                        style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.08}s both` }}>
                        <td className="py-3 pr-4 font-mono text-xs text-muted-light">{a.element}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            a.trigger === 'hover' ? 'bg-blue-400/10 text-blue-400' :
                            a.trigger === 'scroll' ? 'bg-violet-400/10 text-violet-400' :
                            a.trigger === 'load' ? 'bg-accent-400/10 text-accent-400' :
                            'bg-white/5 text-muted'
                          }`}>{a.trigger}</span>
                        </td>
                        <td className="py-3 pr-4 text-xs text-muted-light font-mono">{a.duration}</td>
                        <td className="py-3 pr-4 text-xs text-muted font-mono">{a.easing}</td>
                        <td className="py-3 text-xs text-muted">{a.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-muted text-sm">No animation data extracted yet.</p>}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold mb-5">Crawled Pages ({job.pages?.length || 0})</h3>
            {job.pages?.length ? (
              <div className="space-y-2">
                {job.pages.map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                    style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.05}s both` }}>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Globe size={14} className="text-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{p.title || p.path}</p>
                      <p className="text-xs text-muted font-mono truncate">{p.url}</p>
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-muted hover:text-accent-400 transition-colors flex-shrink-0">
                      <ExternalLink size={14} />
                    </a>
                  </div>
                ))}
              </div>
            ) : <p className="text-muted text-sm">No page data available.</p>}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03]">
      <span className="text-xs text-muted">{label}:</span>
      <span className="text-sm font-semibold text-white">{value || '—'}</span>
    </div>
  );
}

function DocCard({ title, desc, available, color }) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${available ? 'border-white/10 hover:border-white/20' : 'border-white/5 opacity-50'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
            <FileText size={16} style={{ color }} />
          </div>
          <div>
            <p className="text-sm font-semibold mb-0.5">{title}</p>
            <p className="text-xs text-muted">{desc}</p>
          </div>
        </div>
        {available && (
          <button className="p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex-shrink-0" title="Download PDF">
            <Download size={16} style={{ color }} />
          </button>
        )}
      </div>
      {!available && <p className="text-xs text-muted mt-2 italic">Not yet generated</p>}
    </div>
  );
}
