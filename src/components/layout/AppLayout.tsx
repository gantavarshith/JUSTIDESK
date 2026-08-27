import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileHeader } from './MobileHeader';
import { BottomNav } from './BottomNav';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <MobileHeader />
        
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <TopHeader />
        </div>

        {/* Page Content */}
        <main className="pb-20 lg:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};
