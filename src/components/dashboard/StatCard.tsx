import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  onClick,
}) => {
  const variantStyles = {
    default: 'bg-card',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary/10 border-secondary/20',
    accent: 'bg-accent/10 border-accent/30',
  };

  const iconStyles = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary-foreground/20 text-primary-foreground',
    secondary: 'bg-secondary/20 text-secondary',
    accent: 'bg-accent/20 text-accent',
  };

  return (
    <Card
      hover={!!onClick}
      onClick={onClick}
      className={cn(
        "p-5 transition-all duration-300",
        variantStyles[variant],
        onClick && "cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            "text-sm font-medium",
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            "text-2xl font-bold",
            variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
          )}>
            {value}
          </p>
          {trend && (
            <p className={cn(
              "text-xs",
              variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}>
              <span className={trend.value >= 0 ? 'text-green-500' : 'text-destructive'}>
                {trend.value >= 0 ? '+' : ''}{trend.value}%
              </span>{' '}
              {trend.label}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          iconStyles[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};
