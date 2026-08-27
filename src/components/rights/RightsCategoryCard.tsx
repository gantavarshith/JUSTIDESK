import React from 'react';
import { Card } from '@/components/ui/card';
import { RightsCategory } from '@/types';
import { Shield, Home, Laptop, Briefcase, ShoppingBag, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightsCategoryCardProps {
  category: RightsCategory;
  onClick: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Shield,
  Home,
  Laptop,
  Briefcase,
  ShoppingBag,
};

export const RightsCategoryCard: React.FC<RightsCategoryCardProps> = ({
  category,
  onClick,
}) => {
  const Icon = iconMap[category.icon] || Shield;

  return (
    <Card
      hover
      onClick={onClick}
      className="p-5 cursor-pointer group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{category.title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {category.description}
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </Card>
  );
};
