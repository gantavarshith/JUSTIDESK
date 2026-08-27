import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Right } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Scale } from 'lucide-react';

interface RightCardProps {
  right: Right;
  index: number;
}

export const RightCard: React.FC<RightCardProps> = ({ right, index }) => {
  return (
    <Card 
      className="animate-fade-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-accent/10 text-accent">
            <Scale className="w-4 h-4" />
          </div>
          <CardTitle className="text-base leading-snug">{right.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {right.explanation}
        </p>
        {right.relatedActs && right.relatedActs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {right.relatedActs.map((act) => (
              <Badge key={act} variant="secondary" className="text-xs font-normal">
                {act}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
