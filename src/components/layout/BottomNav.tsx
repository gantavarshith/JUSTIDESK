import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Scale, FolderOpen, FileText, Calendar, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/citizen/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/rights', label: 'Rights', icon: Scale },
  { path: '/citizen/ai-chat', label: 'AI Chat', icon: Bot },
  { path: '/citizen/documents', label: 'Docs', icon: FileText },
  { path: '/citizen/consultations', label: 'Consult', icon: Calendar },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card border-t border-border">
      <div className="flex items-center justify-around h-16 px-2 safe-area-pb">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-3 rounded-lg transition-all duration-200 min-w-[56px]",
                isActive
                  ? "text-secondary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className={cn(
                "text-[10px]",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
