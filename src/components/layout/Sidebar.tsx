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
  FilePlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { path: '/citizen/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/rights', label: 'Know Your Rights', icon: Scale },
  { path: '/citizen/file-case', label: 'File a Case', icon: FilePlus },
  { path: '/citizen/cases', label: 'My Cases', icon: FolderOpen },
  { path: '/citizen/documents', label: 'Documents', icon: FileText },
  { path: '/citizen/consultations', label: 'Consultations', icon: Calendar },
  { path: '/citizen/forms', label: 'Saved Forms', icon: ClipboardList },
  { path: '/citizen/ai-chat', label: 'AI Legal Assistant', icon: Bot },
];

const bottomItems = [
  { path: '/help', label: 'Help Center', icon: HelpCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-sidebar fixed left-0 top-0 border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <NavLink to="/citizen/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sidebar-accent flex items-center justify-center">
            <Scale className="w-5 h-5 text-sidebar-primary" />
          </div>
          <span className="font-semibold text-xl text-sidebar-foreground">
            Justice<span className="text-sidebar-primary">Desk</span>
          </span>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
        
        <button
          onClick={() => {
            try { signOut(); } catch (e) {}
            navigate('/login');
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
