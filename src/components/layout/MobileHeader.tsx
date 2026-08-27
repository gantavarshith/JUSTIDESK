import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const MobileHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <NavLink to="/citizen/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Scale className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg text-foreground">
            Justice<span className="text-secondary">Desk</span>
          </span>
        </NavLink>

        {/* Notifications */}
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>
      </div>
    </header>
  );
};
