import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Scale,
  FileText,
  FolderOpen,
  Calendar,
  ClipboardList,
  Bot,
  Settings,
  LogOut,
  HelpCircle,
  FilePlus,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { path: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rights', label: 'Know Your Rights', icon: Shield },
  { path: '/citizen/file-case', label: 'File a Case', icon: FilePlus, badge: 'New' },
  { path: '/citizen/cases', label: 'My Cases', icon: FolderOpen },
  { path: '/citizen/documents', label: 'Documents', icon: FileText },
  { path: '/citizen/consultations', label: 'Consultations', icon: Calendar },
  { path: '/citizen/forms', label: 'Saved Forms', icon: ClipboardList },
  { path: '/citizen/ai-chat', label: 'AI Legal Counsel', icon: Bot },
];

const bottomItems = [
  { path: '/help', label: 'Help Center', icon: HelpCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside
      className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 z-30"
      style={{ backgroundColor: '#1a1a1a', borderRight: '1px solid #2d2d2d' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5" style={{ borderBottom: '1px solid #2d2d2d' }}>
        <NavLink to="/citizen/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFA116' }}>
            <Scale style={{ width: 17, height: 17, color: '#1a1a1a' }} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight" style={{ color: '#eff2f6' }}>
              Justice<span style={{ color: '#FFA116' }}>Desk</span>
            </span>
          </div>
        </NavLink>
      </div>

      {/* User pill */}
      {user && (
        <div className="mx-4 mt-4 px-3 py-2.5 rounded-lg flex items-center gap-2.5"
          style={{ backgroundColor: '#262626', border: '1px solid #3e3e3e' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: '#FFA116', color: '#1a1a1a' }}>
            {(user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: '#eff2f6' }}>{user.name}</p>
            <p className="text-[10px] capitalize truncate" style={{ color: '#ababab' }}>{user.role || 'Citizen'}</p>
          </div>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
        <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Navigation</p>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/citizen/dashboard' && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group"
              style={{
                backgroundColor: isActive ? 'rgba(255,161,22,0.12)' : 'transparent',
                color: isActive ? '#FFA116' : '#ababab',
                fontWeight: isActive ? 600 : 400,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#262626';
                  (e.currentTarget as HTMLElement).style.color = '#eff2f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#ababab';
                }
              }}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ backgroundColor: isActive ? 'rgba(255,161,22,0.2)' : 'rgba(255,161,22,0.15)', color: '#FFA116' }}>
                  {item.badge}
                </span>
              )}
              {isActive && <div className="absolute right-0 w-0.5 h-6 rounded-l-full" style={{ backgroundColor: '#FFA116' }} />}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 space-y-0.5" style={{ borderTop: '1px solid #2d2d2d' }}>
        <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#555' }}>Support</p>
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
              style={{ color: isActive ? '#FFA116' : '#ababab', backgroundColor: isActive ? 'rgba(255,161,22,0.1)' : 'transparent' }}
              onMouseEnter={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = '#262626'; (e.currentTarget as HTMLElement).style.color = '#eff2f6'; } }}
              onMouseLeave={(e) => { if (!isActive) { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#ababab'; } }}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        <button
          onClick={() => { try { signOut(); } catch (e) {} navigate('/login'); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left text-sm transition-all duration-150"
          style={{ color: '#ababab' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,55,95,0.08)'; (e.currentTarget as HTMLElement).style.color = '#ff375f'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#ababab'; }}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
