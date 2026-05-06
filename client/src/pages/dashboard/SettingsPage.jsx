import Button from '../../components/ui/Button';
import { User, Bell, Key, CreditCard, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-sm text-muted mb-8">Manage your account, billing, and preferences.</p>

      {/* Profile */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-5"><User size={16} className="text-accent-400" /> Profile</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-light mb-1.5">Full name</label>
            <input type="text" defaultValue="Jane Doe" className="w-full bg-dark-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-400/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-light mb-1.5">Email</label>
            <input type="email" defaultValue="jane@company.com" className="w-full bg-dark-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent-400/50 transition-colors" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm">Save changes</Button>
        </div>
      </div>

      {/* API Keys */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-5"><Key size={16} className="text-blue-400" /> API Keys</h3>
        <p className="text-sm text-muted mb-4">Use API keys to submit analyses programmatically via POST /api/jobs.</p>
        <div className="bg-dark-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-muted font-mono flex items-center justify-between">
          <span>wbm_sk_••••••••••••••••</span>
          <button className="text-xs text-accent-400 hover:text-accent-400/80 font-semibold cursor-pointer">Reveal</button>
        </div>
        <div className="mt-4">
          <Button variant="secondary" size="sm">Generate new key</Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-5"><Bell size={16} className="text-violet-400" /> Notifications</h3>
        {[
          { label: 'Email when analysis completes', enabled: true },
          { label: 'Email when analysis fails', enabled: true },
          { label: 'Weekly digest of new features', enabled: false },
        ].map((n, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <span className="text-sm text-muted-light">{n.label}</span>
            <div className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${n.enabled ? 'bg-accent-400' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${n.enabled ? 'left-5' : 'left-1'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Plan */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-5"><CreditCard size={16} className="text-yellow-400" /> Plan & Billing</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold">Plus Plan</p>
            <p className="text-xs text-muted">$29/seat/month · 3 seats · 25 analyses/mo included</p>
          </div>
          <Button variant="secondary" size="sm" to="/pricing">Change plan</Button>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-400 to-blue-500 rounded-full" style={{ width: '68%' }} />
        </div>
        <p className="text-xs text-muted mt-2">17 of 25 analyses used this month</p>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl p-6 border-red-500/20">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-3 text-red-400"><Shield size={16} /> Danger Zone</h3>
        <p className="text-sm text-muted mb-4">Permanently delete your account and all associated data.</p>
        <button className="px-4 py-2 bg-red-500/10 text-red-400 text-sm font-semibold rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer">
          Delete account
        </button>
      </div>
    </div>
  );
}
