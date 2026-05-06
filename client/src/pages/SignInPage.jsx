import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogoFull } from '../components/ui/Logo';
import Button from '../components/ui/Button';
import CircuitGrid from '../components/ui/CircuitGrid';
import GradientOrbs from '../components/ui/GradientOrbs';
import useAuthStore from '../stores/authStore';
import { GitFork, Mail, AlertCircle, Loader } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <CircuitGrid intensity={0.3} color="#00E8C6" className="opacity-20" />
        <GradientOrbs count={3} className="opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#04000A_70%)]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="flex justify-center mb-10">
          <Link to="/"><LogoFull /></Link>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-[fadeSlideUp_0.5s_ease-out]">
          <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
          <p className="text-sm text-muted text-center mb-8">Sign in to your Webimic account</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-[fadeSlideUp_0.3s_ease-out]">
              <AlertCircle size={16} /> {error}
              <button onClick={clearError} className="ml-auto text-red-400/60 hover:text-red-400 cursor-pointer text-xs">✕</button>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
              <GitFork size={18} /> Continue with GitHub
            </button>
            <button className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
              <Mail size={18} /> Continue with Google
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-light mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.06] transition-all"
                placeholder="you@company.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-light mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.06] transition-all"
                placeholder="••••••••" required minLength={6} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 accent-accent-400" />
                <span className="text-xs text-muted">Remember me</span>
              </label>
              <a href="#" className="text-xs text-accent-400 hover:text-accent-400/80 transition-colors">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent-400 to-blue-500 text-dark-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? <><Loader size={16} className="animate-spin" /> Signing in...</> : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-sm text-muted text-center mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent-400 hover:text-accent-400/80 font-semibold transition-colors">Sign up</Link>
        </p>
      </div>

      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
