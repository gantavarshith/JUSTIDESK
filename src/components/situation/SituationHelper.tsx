import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { situationSteps } from '@/data/mockData';
import { SituationStep } from '@/types';
import { AlertTriangle, ArrowLeft, CheckCircle2, Phone, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SituationHelperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SituationHelper: React.FC<SituationHelperProps> = ({
  open,
  onOpenChange,
}) => {
  const [currentStepId, setCurrentStepId] = useState<string>('start');
  const [advice, setAdvice] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const currentStep = situationSteps.find((s) => s.id === currentStepId);

  const handleOptionClick = (option: { nextStepId?: string; advice?: string }) => {
    if (option.advice) {
      setAdvice(option.advice);
    } else if (option.nextStepId) {
      setHistory((prev) => [...prev, currentStepId]);
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleBack = () => {
    if (advice) {
      setAdvice(null);
    } else if (history.length > 0) {
      const previousStep = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setCurrentStepId(previousStep);
    }
  };

  const handleReset = () => {
    setCurrentStepId('start');
    setAdvice(null);
    setHistory([]);
  };

  const handleCopyAdvice = () => {
    if (advice) {
      navigator.clipboard.writeText(advice);
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this advice anywhere.",
      });
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      handleReset();
    }, 300);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[80vh] rounded-t-3xl">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            {(history.length > 0 || advice) && (
              <Button variant="ghost" size="icon-sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <SheetTitle className="text-lg">
                Real-Time Help
              </SheetTitle>
            </div>
          </div>
        </SheetHeader>

        <div className="py-6 overflow-y-auto max-h-[calc(90vh-120px)] sm:max-h-[calc(80vh-120px)]">
          {!advice ? (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground">
                {currentStep?.question}
              </h3>
              <div className="grid gap-3">
                {currentStep?.options.map((option, index) => (
                  <Card
                    key={option.id}
                    hover
                    onClick={() => handleOptionClick(option)}
                    className="p-4 cursor-pointer animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <p className="font-medium text-foreground">{option.label}</p>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Here's what you should do:
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {advice}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleCopyAdvice}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Advice
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  asChild
                >
                  <a href="tel:100">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Police (100)
                  </a>
                </Button>
              </div>

              <Button
                variant="ghost"
                className="w-full"
                onClick={handleReset}
              >
                Start Over
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
