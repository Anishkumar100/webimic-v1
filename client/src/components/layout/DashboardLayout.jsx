import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LogoFull } from '../ui/Logo';
import useAuthStore from '../../stores/authStore';
import { LayoutDashboard, Plus, FolderOpen, Settings, LogOut, Menu, X, Bell, ChevronDown } from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: Plus, label: 'New Analysis', to: '/dashboard/new' },
  { icon: FolderOpen, label: 'All Jobs', to: '/dashboard/jobs' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const initials = user?.avatar || user?.name?.slice(0, 2).toUpperCase() || 'WB';

  return (
    <div className="min-h-screen bg-dark-950 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-900 border-r border-white/5 fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-white/5">
          <Link to="/"><LogoFull /></Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to));
            return (
              <Link key={i} to={item.to}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'bg-accent-400/10 text-accent-400 shadow-sm shadow-accent-400/5' : 'text-muted hover:text-white hover:bg-white/5'
                }`}>
                <Icon size={18} className={isActive ? 'text-accent-400' : 'group-hover:text-white'} />
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-blue-500 flex items-center justify-center text-xs font-bold text-dark-950 shadow-lg shadow-accent-400/20">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-muted truncate">{user?.email || 'user@webimic.com'}</p>
            </div>
            <button onClick={handleLogout} className="text-muted hover:text-red-400 transition-colors cursor-pointer" title="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 inset-y-0 w-64 bg-dark-900 border-r border-white/5 flex flex-col animate-[slideInLeft_0.2s_ease-out]">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <LogoFull />
              <button onClick={() => setSidebarOpen(false)} className="text-white cursor-pointer"><X size={20} /></button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {sidebarItems.map((item, i) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link key={i} to={item.to} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-accent-400/10 text-accent-400' : 'text-muted hover:text-white hover:bg-white/5'}`}>
                    <Icon size={18} />{item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-white/5">
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-sm text-muted hover:text-red-400 w-full cursor-pointer">
                <LogOut size={18} /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-dark-950/90 backdrop-blur-xl border-b border-white/5 h-14 flex items-center px-5 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white cursor-pointer"><Menu size={20} /></button>
          <div className="flex-1" />
          <button className="relative text-muted hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-white/5">
            <Bell size={18} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
          </button>
          <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-white/5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-400 to-blue-500 flex items-center justify-center text-[10px] font-bold text-dark-950">{initials}</div>
            <span className="text-sm text-muted-light">{user?.name?.split(' ')[0] || 'User'}</span>
          </div>
        </header>
        <main className="p-5 md:p-8"><Outlet /></main>
      </div>

      <style>{`@keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}
