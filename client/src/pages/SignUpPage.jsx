import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoFull } from '../components/ui/Logo';
import CircuitGrid from '../components/ui/CircuitGrid';
import GradientOrbs from '../components/ui/GradientOrbs';
import useAuthStore from '../stores/authStore';
import { GitFork, Mail, AlertCircle, Loader } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password);
    if (success) navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-5 py-12 relative overflow-hidden">
      <div className="absolute inset-0">
        <CircuitGrid intensity={0.3} color="#A78BFA" className="opacity-20" />
        <GradientOrbs count={3} className="opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#04000A_70%)]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="flex justify-center mb-10">
          <Link to="/"><LogoFull /></Link>
        </div>

        <div className="glass-card rounded-2xl p-8 animate-[fadeSlideUp_0.5s_ease-out]">
          <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
          <p className="text-sm text-muted text-center mb-8">Start analyzing websites with Webimic</p>

          {error && (
            <div className="flex items-center gap-2 p-3 mb-5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
            <div className="flex-1 h-px bg-white/10" /><span className="text-xs text-muted uppercase tracking-wider">or</span><div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-light mb-1.5">Full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.06] transition-all"
                placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-light mb-1.5">Work email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.06] transition-all"
                placeholder="you@company.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-light mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent-400/50 focus:bg-white/[0.06] transition-all"
                placeholder="Min. 8 characters" required minLength={8} />
            </div>
            <p className="text-xs text-muted">
              By signing up, you agree to our <Link to="/terms" className="text-accent-400 hover:underline">Terms</Link> and <Link to="/privacy" className="text-accent-400 hover:underline">Privacy Policy</Link>.
            </p>
            <button type="submit" disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-accent-400 to-blue-500 text-dark-950 font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-accent-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none cursor-pointer">
              {isLoading ? <><Loader size={16} className="animate-spin" /> Creating account...</> : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-sm text-muted text-center mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-accent-400 hover:text-accent-400/80 font-semibold transition-colors">Sign in</Link>
        </p>
      </div>
      <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
