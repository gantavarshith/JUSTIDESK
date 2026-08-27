import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  FileText, 
  BookmarkCheck, 
  AlertTriangle, 
  FileSearch,
  Shield,
  Home,
  Laptop,
  ShoppingBag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickHelpCard } from '@/components/dashboard/QuickHelpCard';
import { ActivityTimeline } from '@/components/dashboard/ActivityTimeline';
import { SituationHelper } from '@/components/situation/SituationHelper';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore } from '@/services/userDataStore';

const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showSituationHelper, setShowSituationHelper] = useState(false);

  const [casesCount, setCasesCount] = useState(0);
  const [docsCount, setDocsCount] = useState(0);
  const [formsCount, setFormsCount] = useState(0);
  const [consultationsCount, setConsultationsCount] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      const cases = userDataStore.getCases(user.id);
      const docs = userDataStore.getDocuments(user.id);
      const forms = userDataStore.getForms(user.id);
      const consultations = userDataStore.getConsultations(user.id);
      const userActivities = userDataStore.getActivities(user.id);

      setCasesCount(cases.length);
      setDocsCount(docs.length);
      setFormsCount(forms.length);
      setConsultationsCount(consultations.length);
      setActivities(userActivities);
    }
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickHelpItems = [
    {
      title: 'Stopped by Police',
      description: 'Know your rights during a police stop',
      icon: Shield,
      color: 'teal' as const,
    },
    {
      title: 'Received a Notice',
      description: 'Understand legal notices and respond correctly',
      icon: FileSearch,
      color: 'navy' as const,
    },
    {
      title: 'Property Dispute',
      description: 'Navigate property and tenancy issues',
      icon: Home,
      color: 'gold' as const,
    },
    {
      title: 'Online Harassment',
      description: 'Deal with cybercrime and digital threats',
      icon: Laptop,
      color: 'red' as const,
    },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Mobile Greeting */}
      <div className="lg:hidden">
        <p className="text-sm text-muted-foreground">{getGreeting()}</p>
        <h1 className="text-2xl font-bold text-foreground">{user?.name || 'Citizen'}</h1>
      </div>

      {/* Emergency Help Banner */}
      <Card className="bg-gradient-to-r from-destructive/10 to-accent/10 border-destructive/20">
        <CardContent className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-destructive/20 text-destructive">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Need immediate help?</p>
              <p className="text-sm text-muted-foreground">Get step-by-step guidance for urgent situations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="gold" 
              size="sm"
              onClick={() => navigate('/citizen/file-case')}
            >
              File a Case
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSituationHelper(true)}
            >
              Emergency Guidance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="My Cases"
          value={casesCount}
          icon={FolderOpen}
          variant="secondary"
          onClick={() => navigate('/citizen/cases')}
        />
        <StatCard
          title="Documents"
          value={docsCount}
          icon={FileText}
          variant="accent"
          onClick={() => navigate('/citizen/documents')}
        />
        <StatCard
          title="Saved Forms"
          value={formsCount}
          icon={BookmarkCheck}
          onClick={() => navigate('/citizen/forms')}
        />
        <StatCard
          title="Consultations"
          value={consultationsCount}
          icon={ShoppingBag}
          onClick={() => navigate('/citizen/consultations')}
        />
      </div>

      {/* Quick Help Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Help</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/rights')}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickHelpItems.map((item) => (
            <QuickHelpCard
              key={item.title}
              {...item}
              onClick={() => navigate('/rights')}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline
              activities={activities}
              onItemClick={(activity) => {
                if (activity.caseId) {
                  navigate(`/citizen/cases/${activity.caseId}`);
                } else if (activity.documentId) {
                  navigate(`/citizen/documents/${activity.documentId}`);
                }
              }}
            />
          </CardContent>
        </Card>
      </section>

      {/* Situation Helper Modal */}
      <SituationHelper 
        open={showSituationHelper} 
        onOpenChange={setShowSituationHelper} 
      />
    </div>
  );
};

export default CitizenDashboard;
