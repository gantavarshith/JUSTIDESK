import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickHelpCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'teal' | 'gold' | 'navy' | 'red';
  onClick: () => void;
}

export const QuickHelpCard: React.FC<QuickHelpCardProps> = ({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}) => {
  const colorStyles = {
    teal: {
      bg: 'bg-secondary/10',
      icon: 'bg-secondary/20 text-secondary',
      border: 'hover:border-secondary/30',
    },
    gold: {
      bg: 'bg-accent/10',
      icon: 'bg-accent/20 text-accent',
      border: 'hover:border-accent/30',
    },
    navy: {
      bg: 'bg-primary/5',
      icon: 'bg-primary/10 text-primary',
      border: 'hover:border-primary/20',
    },
    red: {
      bg: 'bg-destructive/10',
      icon: 'bg-destructive/20 text-destructive',
      border: 'hover:border-destructive/30',
    },
  };

  const styles = colorStyles[color];

  return (
    <Card
      hover
      onClick={onClick}
      className={cn(
        "p-4 cursor-pointer transition-all duration-300",
        styles.border
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2.5 rounded-xl shrink-0", styles.icon)}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h4 className="font-medium text-foreground text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
