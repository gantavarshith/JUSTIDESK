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
      const userActivities = userDataStore.getActivities(user.id);
      setActivities(userActivities);

      // Load read notification IDs for this user
      try {
        const storedRead = localStorage.getItem(`justicedesk_user_read_notifications_${user.id}`);
        if (storedRead) {
          setReadIds(JSON.parse(storedRead));
        }
      } catch (e) {}
    }
  }, [user]);

  const saveReadIds = (newReadIds: string[]) => {
    setReadIds(newReadIds);
    if (user?.id) {
      try {
        localStorage.setItem(`justicedesk_user_read_notifications_${user.id}`, JSON.stringify(newReadIds));
      } catch (e) {}
    }
  };

  const unreadCount = activities.filter((a) => !readIds.includes(a.id)).length;

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      saveReadIds([...readIds, id]);
    }
  };

  const markAllRead = () => {
    const allIds = activities.map((a) => a.id);
    saveReadIds(allIds);
  };

  const handleNotificationClick = (item: ActivityItem) => {
    if (item.caseId) {
      navigate(`/citizen/cases/${item.caseId}`);
    } else if (item.documentId) {
      navigate(`/citizen/documents/${item.documentId}`);
    }
    markAsRead(item.id);
  };

  const handleSignOut = () => {
    signOut();
    toast({ title: 'Signed out', description: 'You have been signed out.' });
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Greeting - Desktop */}
        <div className="hidden lg:block">
          <p className="text-xs text-muted-foreground">{getGreeting()}</p>
          <h2 className="font-semibold text-sm text-foreground">{user?.name || 'Citizen'}</h2>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search cases, documents, rights..."
              className="pl-10 bg-muted/50 border-0 focus-visible:bg-card text-xs"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-foreground/80" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold text-white bg-accent rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80 p-3" align="end">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-border">
                <h4 className="font-semibold text-xs">Notifications</h4>
                {unreadCount > 0 && (
                  <button className="text-[11px] text-primary hover:underline" onClick={markAllRead}>Mark all read</button>
                )}
              </div>
              <div className="space-y-2 max-h-60 overflow-auto">
                {activities.length === 0 && (
                  <div className="text-xs text-muted-foreground py-3 text-center">No notifications yet</div>
                )}
                {activities.map((act) => {
                  const isRead = readIds.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => handleNotificationClick(act)}
                      className={`p-2 rounded-md cursor-pointer hover:bg-muted/60 transition-colors ${isRead ? 'opacity-60' : 'bg-primary/5 border-l-2 border-primary'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-xs text-foreground">{act.title}</div>
                          <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{act.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>

          {/* Profile Dropdown / Avatar */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-9 h-9 rounded-full overflow-hidden border border-border hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="w-full h-full">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    {(user?.name || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="end">
              <div className="px-3 py-2 border-b border-border mb-1">
                <p className="text-xs font-semibold text-foreground truncate">{user?.name || 'User'}</p>
                <p className="text-[11px] text-muted-foreground truncate">{user?.email || ''}</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-xs hover:bg-muted text-foreground transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                View & Edit Profile
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-xs hover:bg-destructive/10 text-destructive transition-colors mt-1"
              >
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
