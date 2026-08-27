import React from 'react';
import { ActivityItem } from '@/types';
import { FileText, MessageSquare, Bell, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  onItemClick?: (activity: ActivityItem) => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  onItemClick,
}) => {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'case_update':
        return FolderOpen;
      case 'document_analysis':
        return FileText;
      case 'message':
        return MessageSquare;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'case_update':
        return 'bg-secondary/10 text-secondary';
      case 'document_analysis':
        return 'bg-accent/10 text-accent';
      case 'message':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const Icon = getIcon(activity.type);
        const isLast = index === activities.length - 1;

        return (
          <div
            key={activity.id}
            onClick={() => onItemClick?.(activity)}
            className={cn(
              "relative flex gap-3 p-3 rounded-lg transition-all duration-200",
              onItemClick && "cursor-pointer hover:bg-muted/50"
            )}
          >
            {/* Timeline Line */}
            {!isLast && (
              <div className="absolute left-[26px] top-12 w-0.5 h-[calc(100%-24px)] bg-border" />
            )}

            {/* Icon */}
            <div className={cn(
              "relative z-10 p-2 rounded-lg shrink-0",
              getIconColor(activity.type)
            )}>
              <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm text-foreground">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
