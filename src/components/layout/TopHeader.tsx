import React, { useEffect, useState } from 'react';
import { Bell, Search, Menu, User, LogOut } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore } from '@/services/userDataStore';
import { ActivityItem } from '@/types';

interface TopHeaderProps {
  onMenuClick?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onMenuClick }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.id) {
      setActivities(userDataStore.getActivities(user.id));
      try {
        const storedRead = localStorage.getItem(`justicedesk_user_read_notifications_${user.id}`);
        if (storedRead) setReadIds(JSON.parse(storedRead));
      } catch (e) {}
    }
  }, [user]);

  const saveReadIds = (ids: string[]) => {
    setReadIds(ids);
    if (user?.id) {
      try { localStorage.setItem(`justicedesk_user_read_notifications_${user.id}`, JSON.stringify(ids)); } catch (e) {}
    }
  };

  const unreadCount = activities.filter((a) => !readIds.includes(a.id)).length;

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) saveReadIds([...readIds, id]);
  };
  const markAllRead = () => saveReadIds(activities.map((a) => a.id));

  const handleNotificationClick = (item: ActivityItem) => {
    if (item.caseId) navigate(`/citizen/cases/${item.caseId}`);
    else if (item.documentId) navigate(`/citizen/documents/${item.documentId}`);
    markAsRead(item.id);
  };

  const handleSignOut = () => {
    signOut();
    toast({ title: 'Signed out', description: 'You have been signed out.' });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 h-14"
      style={{ backgroundColor: '#1a1a1a', borderBottom: '1px solid #2d2d2d', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">

        {/* Mobile menu */}
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[#262626]" onClick={onMenuClick}>
          <Menu className="w-5 h-5" style={{ color: '#ababab' }} />
        </Button>

        {/* Greeting */}
        <div className="hidden lg:block">
          <p className="text-xs" style={{ color: '#555' }}>{getGreeting()},</p>
          <p className="text-sm font-semibold" style={{ color: '#eff2f6' }}>{user?.name || 'Citizen'}</p>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#555' }} />
            <input
              placeholder="Search cases, documents, rights..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg outline-none transition-all"
              style={{ backgroundColor: '#262626', border: '1px solid #3e3e3e', color: '#eff2f6', fontFamily: "'Inter', sans-serif" }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#FFA116')}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#3e3e3e')}
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                style={{ backgroundColor: 'transparent' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#262626')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}>
                <Bell className="w-4.5 h-4.5" style={{ width: 18, height: 18, color: '#ababab' }} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold rounded-full"
                    style={{ backgroundColor: '#FFA116', color: '#1a1a1a' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 overflow-hidden" align="end"
              style={{ backgroundColor: '#262626', border: '1px solid #3e3e3e', borderRadius: 10 }}>
              <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #3e3e3e' }}>
                <p className="text-xs font-semibold" style={{ color: '#eff2f6' }}>Notifications</p>
                {unreadCount > 0 && (
                  <button className="text-[11px] font-medium transition-colors" style={{ color: '#FFA116' }} onClick={markAllRead}>
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-auto divide-y" style={{ borderColor: '#2d2d2d' }}>
                {activities.length === 0 ? (
                  <p className="text-xs text-center py-6" style={{ color: '#555' }}>No notifications yet</p>
                ) : activities.map((act) => {
                  const isRead = readIds.includes(act.id);
                  return (
                    <div key={act.id} onClick={() => handleNotificationClick(act)}
                      className="px-4 py-3 cursor-pointer transition-all"
                      style={{ backgroundColor: isRead ? 'transparent' : 'rgba(255,161,22,0.04)', borderLeft: isRead ? 'none' : '2px solid #FFA116' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#2d2d2d')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = isRead ? 'transparent' : 'rgba(255,161,22,0.04)')}>
                      <p className="text-xs font-medium" style={{ color: '#eff2f6', opacity: isRead ? 0.5 : 1 }}>{act.title}</p>
                      <p className="text-[11px] mt-0.5" style={{ color: '#555', opacity: isRead ? 0.5 : 1 }}>{act.description}</p>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile avatar */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-8 h-8 rounded-full overflow-hidden transition-all"
                style={{ border: '1.5px solid #3e3e3e' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#FFA116')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#3e3e3e')}>
                <Avatar className="w-full h-full">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="text-xs font-bold" style={{ backgroundColor: '#FFA116', color: '#1a1a1a' }}>
                    {(user?.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-1 overflow-hidden" align="end"
              style={{ backgroundColor: '#262626', border: '1px solid #3e3e3e', borderRadius: 10 }}>
              <div className="px-3 py-2.5 mb-1" style={{ borderBottom: '1px solid #2d2d2d' }}>
                <p className="text-xs font-semibold truncate" style={{ color: '#eff2f6' }}>{user?.name || 'User'}</p>
                <p className="text-[11px] truncate" style={{ color: '#ababab' }}>{user?.email}</p>
              </div>
              <button onClick={() => navigate('/profile')}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs transition-all"
                style={{ color: '#ababab' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#2d2d2d'; (e.currentTarget as HTMLElement).style.color = '#eff2f6'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#ababab'; }}>
                <User className="w-3.5 h-3.5" />
                View & Edit Profile
              </button>
              <button onClick={handleSignOut}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-xs transition-all mt-0.5"
                style={{ color: '#ababab' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,55,95,0.08)'; (e.currentTarget as HTMLElement).style.color = '#ff375f'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#ababab'; }}>
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
