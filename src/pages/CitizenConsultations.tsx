import React, { useState, useEffect } from 'react';
import { Calendar, User, Clock, Phone, MessageSquare, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore, ConsultationItem } from '@/services/userDataStore';

const CitizenConsultations: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [displayConsultations, setDisplayConsultations] = useState<ConsultationItem[]>([]);
  const [showBookDialog, setShowBookDialog] = useState(false);

  const [newConsultation, setNewConsultation] = useState<{
    title: string;
    advocateName: string;
    advocatePhone: string;
    date: string;
    time: string;
    type: 'online' | 'physical';
  }>({
    title: '',
    advocateName: '',
    advocatePhone: '',
    date: '',
    time: '',
    type: 'online',
  });

  useEffect(() => {
    if (user?.id) {
      const items = userDataStore.getConsultations(user.id);
      setDisplayConsultations(items);
    }
  }, [user]);

  const handleBookConsultation = () => {
    if (!newConsultation.title || !newConsultation.advocateName || !newConsultation.date || !newConsultation.time) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    if (!user?.id) return;

    const booked = userDataStore.addConsultation(user.id, {
      ...newConsultation,
      status: 'scheduled',
    });

    setDisplayConsultations((prev) => [booked, ...prev]);
    setNewConsultation({
      title: '',
      advocateName: '',
      advocatePhone: '',
      date: '',
      time: '',
      type: 'online',
    });
    setShowBookDialog(false);

    toast({
      title: 'Consultation Booked',
      description: 'Your appointment has been scheduled.',
    });
  };

  const handleCancelConsultation = (id: string) => {
    if (!user?.id) return;
    if (window.confirm('Are you sure you want to cancel this consultation?')) {
      const updated = displayConsultations.filter((c) => c.id !== id);
      setDisplayConsultations(updated);
      userDataStore.saveConsultations(user.id, updated);
      toast({ title: 'Cancelled', description: 'Consultation removed.' });
    }
  };

  const upcomingConsultations = displayConsultations.filter(
    (c) => c.status === 'scheduled'
  );
  const pastConsultations = displayConsultations.filter(
    (c) => c.status === 'completed'
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Consultations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Schedule and manage your consultations with advocates
          </p>
        </div>
        <Dialog open={showBookDialog} onOpenChange={setShowBookDialog}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a Consultation</DialogTitle>
              <DialogDescription>
                Schedule a consultation with a lawyer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Consultation Topic *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Case Review, Legal Advice"
                  value={newConsultation.title}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="advocateName">Advocate Name *</Label>
                <Input
                  id="advocateName"
                  placeholder="Enter advocate name"
                  value={newConsultation.advocateName}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, advocateName: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="advocatePhone">Advocate Phone</Label>
                <Input
                  id="advocatePhone"
                  type="tel"
                  placeholder="+91-98765-43210"
                  value={newConsultation.advocatePhone}
                  onChange={(e) =>
                    setNewConsultation({ ...newConsultation, advocatePhone: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newConsultation.date}
                    onChange={(e) =>
                      setNewConsultation({ ...newConsultation, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newConsultation.time}
                    onChange={(e) =>
                      setNewConsultation({ ...newConsultation, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label>Type *</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={newConsultation.type === 'online' ? 'hero' : 'outline'}
                    onClick={() =>
                      setNewConsultation({ ...newConsultation, type: 'online' })
                    }
                  >
                    Online
                  </Button>
                  <Button
                    variant={newConsultation.type === 'physical' ? 'hero' : 'outline'}
                    onClick={() =>
                      setNewConsultation({ ...newConsultation, type: 'physical' })
                    }
                  >
                    In-Person
                  </Button>
                </div>
              </div>
              <Button
                variant="hero"
                className="w-full"
                onClick={handleBookConsultation}
              >
                Book Consultation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {upcomingConsultations.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Upcoming Consultations</h2>
          {upcomingConsultations.map((consultation, index) => (
            <Card
              key={consultation.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">
                        {consultation.title}
                      </h3>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                        {consultation.type === 'online' ? 'Online' : 'In-Person'}
                      </Badge>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {consultation.advocateName}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {consultation.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {consultation.time}
                      </div>
                      {consultation.advocatePhone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {consultation.advocatePhone}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleCancelConsultation(consultation.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pastConsultations.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Past Consultations</h2>
          {pastConsultations.map((consultation, index) => (
            <Card
              key={consultation.id}
              className="animate-fade-up opacity-75"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {consultation.title}
                      </h3>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm text-muted-foreground">
                        {consultation.advocateName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {consultation.date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {displayConsultations.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No consultations scheduled yet</p>
          <Button variant="hero" onClick={() => setShowBookDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Book Your First Consultation
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CitizenConsultations;
