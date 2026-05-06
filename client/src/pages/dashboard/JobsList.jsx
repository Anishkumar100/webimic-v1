import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useJobsStore from '../../stores/jobsStore';
import { Search, Filter, Globe, ArrowRight, Clock, CheckCircle, Loader, AlertCircle, FileText, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const statusConfig = {
  COMPLETED: { icon: CheckCircle, color: '#00E8C6', label: 'Completed', bg: 'bg-emerald-400/10' },
  CRAWLING: { icon: Loader, color: '#38BDF8', label: 'Crawling', bg: 'bg-blue-400/10' },
  EXTRACTING: { icon: Loader, color: '#A78BFA', label: 'Extracting', bg: 'bg-violet-400/10' },
  GENERATING: { icon: Loader, color: '#F472B6', label: 'Generating', bg: 'bg-pink-400/10' },
  QUEUED: { icon: Clock, color: '#FBBF24', label: 'Queued', bg: 'bg-yellow-400/10' },
  FAILED: { icon: AlertCircle, color: '#F87171', label: 'Failed', bg: 'bg-red-400/10' },
};

const statusFilters = ['All', 'COMPLETED', 'CRAWLING', 'QUEUED', 'FAILED'];

export default function JobsList() {
  const { jobs, fetchJobs, isLoading, pagination } = useJobsStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => { fetchJobs(); }, []);

  const filtered = jobs.filter(j => {
    const matchesSearch = !search || j.siteUrl.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDuration = (ms) => {
    if (!ms) return '—';
    const sec = Math.floor(ms / 1000);
    if (sec < 60) return `${sec}s`;
    return `${Math.floor(sec / 60)}m ${sec % 60}s`;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">All Jobs</h1>
          <p className="text-sm text-muted">{jobs.length} total analyses</p>
        </div>
        <Link to="/dashboard/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-400 to-blue-500 text-dark-950 font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-400/20 hover:scale-[1.02] transition-all">
          + New Analysis
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="glass-card rounded-xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by URL..."
              className="w-full bg-dark-950/60 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/40 transition-all" />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {statusFilters.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === s
                    ? 'bg-accent-400/10 text-accent-400 border border-accent-400/20'
                    : 'bg-white/[0.03] text-muted border border-transparent hover:text-white hover:bg-white/5'
                }`}>
                {s === 'All' ? 'All' : statusConfig[s]?.label || s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="py-16 flex items-center justify-center gap-3 text-muted">
            <Loader size={18} className="animate-spin" /> Loading jobs...
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <SlidersHorizontal size={28} className="text-muted/30 mx-auto mb-3" />
            <p className="text-muted">No jobs match your filters.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_80px_32px] gap-4 px-6 py-3 border-b border-white/5 text-xs font-semibold text-muted uppercase tracking-wider">
              <span>URL</span>
              <span>Status</span>
              <span>Pages</span>
              <span>Duration</span>
              <span>Docs</span>
              <span></span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
              {filtered.map((job, i) => {
                const sc = statusConfig[job.status] || statusConfig.QUEUED;
                const Icon = sc.icon;
                const isSpinning = ['CRAWLING', 'EXTRACTING', 'GENERATING'].includes(job.status);
                return (
                  <Link key={job.id} to={`/dashboard/jobs/${job.id}`}
                    className="grid grid-cols-1 md:grid-cols-[1fr_120px_100px_100px_80px_32px] gap-2 md:gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors group"
                    style={{ animation: `fadeSlideUp 0.3s ease-out ${i * 0.03}s both` }}>
                    {/* URL */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-400/10 transition-colors">
                        <Globe size={14} className="text-muted group-hover:text-accent-400 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate group-hover:text-accent-400 transition-colors">{job.siteUrl}</p>
                        <p className="text-xs text-muted md:hidden">{new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {/* Status */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit ${sc.bg}`} style={{ color: sc.color }}>
                      <Icon size={12} className={isSpinning ? 'animate-spin' : ''} />
                      {sc.label}
                    </div>
                    {/* Pages */}
                    <span className="text-sm text-muted-light">{job.pagesCrawled || 0} pages</span>
                    {/* Duration */}
                    <span className="text-sm text-muted">{formatDuration(job.duration)}</span>
                    {/* Docs */}
                    <div className="flex items-center gap-1.5">
                      {job.documents?.docA && <span className="text-xs px-1.5 py-0.5 rounded bg-accent-400/10 text-accent-400 font-semibold">A</span>}
                      {job.documents?.docB && <span className="text-xs px-1.5 py-0.5 rounded bg-pink-400/10 text-pink-400 font-semibold">B</span>}
                      {!job.documents?.docA && !job.documents?.docB && <span className="text-muted text-xs">—</span>}
                    </div>
                    {/* Arrow */}
                    <ArrowRight size={14} className="text-muted/30 group-hover:text-muted transition-colors hidden md:block" />
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Pagination hint */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="p-2 rounded-lg border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all cursor-pointer"><ChevronLeft size={16} /></button>
          <span className="text-sm text-muted px-3">Page {pagination.page} of {pagination.pages}</span>
          <button className="p-2 rounded-lg border border-white/10 text-muted hover:text-white hover:bg-white/5 transition-all cursor-pointer"><ChevronRight size={16} /></button>
        </div>
      )}

      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
