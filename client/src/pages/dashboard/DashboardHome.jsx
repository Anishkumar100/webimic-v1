import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import useAuthStore from '../../stores/authStore';
import useJobsStore from '../../stores/jobsStore';
import { Plus, ArrowRight, Clock, CheckCircle, Loader, AlertCircle, Globe, FileText, Scan } from 'lucide-react';

const statusConfig = {
  COMPLETED: { icon: CheckCircle, color: '#00E8C6', label: 'Completed', bg: 'bg-emerald-400/10' },
  CRAWLING: { icon: Loader, color: '#38BDF8', label: 'Crawling', bg: 'bg-blue-400/10' },
  EXTRACTING: { icon: Loader, color: '#A78BFA', label: 'Extracting', bg: 'bg-violet-400/10' },
  GENERATING: { icon: Loader, color: '#F472B6', label: 'Generating', bg: 'bg-pink-400/10' },
  QUEUED: { icon: Clock, color: '#FBBF24', label: 'Queued', bg: 'bg-yellow-400/10' },
  FAILED: { icon: AlertCircle, color: '#F87171', label: 'Failed', bg: 'bg-red-400/10' },
};

export default function DashboardHome() {
  const user = useAuthStore((s) => s.user);
  const { jobs, fetchJobs, isLoading } = useJobsStore();

  useEffect(() => { fetchJobs({ limit: 5 }); }, []);

  const completedJobs = jobs.filter(j => j.status === 'COMPLETED');
  const totalPages = jobs.reduce((sum, j) => sum + (j.pagesCrawled || 0), 0);
  const totalTokens = jobs.reduce((sum, j) => sum + (j.tokensExtracted || 0), 0);

  const stats = [
    { label: 'Total analyses', value: jobs.length, change: `${completedJobs.length} completed` },
    { label: 'Pages captured', value: totalPages.toLocaleString(), change: 'Across all jobs' },
    { label: 'Tokens extracted', value: totalTokens.toLocaleString(), change: 'Colors, type, spacing' },
    { label: 'PDFs generated', value: completedJobs.length * 2, change: `${completedJobs.length} Doc A + ${completedJobs.length} Doc B` },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
          <p className="text-sm text-muted">Welcome back, {user?.name?.split(' ')[0] || 'there'}. Here's your analysis overview.</p>
        </div>
        <Button to="/dashboard/new" size="md"><Plus size={16} /> New Analysis</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-5 hover:border-white/15 transition-all duration-300 group">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all">{stat.value}</p>
            <p className="text-xs text-accent-400">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-bold">Recent Analyses</h2>
          <Link to="/dashboard/jobs" className="text-sm text-accent-400 hover:text-accent-400/80 font-semibold flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12 flex items-center justify-center gap-3 text-muted">
            <Loader size={18} className="animate-spin" /> Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-16 text-center">
            <Scan size={32} className="text-muted/30 mx-auto mb-4" />
            <p className="text-muted mb-4">No analyses yet. Start your first one!</p>
            <Button to="/dashboard/new" size="sm">Analyze a site</Button>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {jobs.slice(0, 5).map((job) => {
              const sc = statusConfig[job.status] || statusConfig.QUEUED;
              const Icon = sc.icon;
              const isSpinning = ['CRAWLING', 'EXTRACTING', 'GENERATING'].includes(job.status);
              return (
                <Link key={job.id} to={`/dashboard/jobs/${job.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-400/10 transition-colors">
                    <Globe size={16} className="text-muted group-hover:text-accent-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate group-hover:text-accent-400 transition-colors">{job.siteUrl}</p>
                    <p className="text-xs text-muted">{new Date(job.createdAt).toLocaleDateString()} · {job.pagesCrawled > 0 ? `${job.pagesCrawled} pages` : 'Pending'}</p>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${sc.bg}`} style={{ color: sc.color }}>
                    <Icon size={13} className={isSpinning ? 'animate-spin' : ''} />
                    {sc.label}
                  </div>
                  {job.status === 'COMPLETED' && (
                    <span className="text-xs text-muted flex items-center gap-1 hover:text-white transition-colors">
                      <FileText size={13} /> PDF
                    </span>
                  )}
                  <ArrowRight size={16} className="text-muted/40 group-hover:text-muted transition-colors" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link to="/dashboard/new" className="glass-card rounded-xl p-6 hover:border-white/15 hover:scale-[1.01] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-accent-400/10 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-accent-400/10 transition-shadow">
            <Plus size={20} className="text-accent-400" />
          </div>
          <h3 className="font-semibold mb-1 group-hover:text-accent-400 transition-colors">Start a new analysis</h3>
          <p className="text-sm text-muted">Submit a URL to crawl, capture, and extract design tokens.</p>
        </Link>
        <Link to="/docs" className="glass-card rounded-xl p-6 hover:border-white/15 hover:scale-[1.01] transition-all group">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
            <FileText size={20} className="text-blue-400" />
          </div>
          <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">Read the docs</h3>
          <p className="text-sm text-muted">Learn about Doc A, Doc B, API endpoints, and LLM integration.</p>
        </Link>
      </div>
    </div>
  );
}
