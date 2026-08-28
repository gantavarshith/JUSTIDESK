import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Filter, MoreVertical, Clock, CheckCircle2, AlertCircle, XCircle, ArrowLeft, MessageSquare, Phone, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore } from '@/services/userDataStore';
import { Case } from '@/types';

const statusConfig = {
  active: {
    label: 'Active',
    icon: Clock,
    color: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  pending: {
    label: 'Pending',
    icon: AlertCircle,
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle2,
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
  },
  closed: {
    label: 'Closed',
    icon: XCircle,
    color: 'bg-muted text-muted-foreground border-border',
  },
};

const CitizenCases: React.FC = () => {
  const navigate = useNavigate();
  const { id: selectedCaseId } = useParams();
  const { user } = useAuth();
  
  const [displayCases, setDisplayCases] = useState<Case[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showNewCaseDialog, setShowNewCaseDialog] = useState(false);
  const [newCaseData, setNewCaseData] = useState({
    title: '',
    type: '',
    description: '',
  });

  useEffect(() => {
    if (user?.id) {
      const userCases = userDataStore.getCases(user.id);
      setDisplayCases(userCases);
    }
  }, [user]);

  const selectedCase = useMemo(
    () => displayCases.find((c) => c.id === selectedCaseId),
    [displayCases, selectedCaseId]
  );

  const filteredCases = useMemo(() => {
    return displayCases.filter((caseItem) => {
      if (filterStatus && caseItem.status !== filterStatus) return false;
      if (filterType && caseItem.type !== filterType) return false;
      return true;
    });
  }, [displayCases, filterStatus, filterType]);

  const uniqueTypes = useMemo(
    () => Array.from(new Set(displayCases.map((c) => c.type).filter(Boolean))),
    [displayCases]
  );

  const handleCreateCase = () => {
    if (!newCaseData.title.trim()) {
      alert('Please enter a case title');
      return;
    }
    if (!user?.id) return;

    const created = userDataStore.addCase(user.id, {
      title: newCaseData.title,
      type: newCaseData.type || 'General',
      description: newCaseData.description,
      status: 'active',
    });

    setDisplayCases((prev) => [created, ...prev]);
    setNewCaseData({ title: '', type: '', description: '' });
    setShowNewCaseDialog(false);
  };

  const handleDeleteCase = (caseId: string) => {
    if (!user?.id) return;
    if (window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
      userDataStore.deleteCase(user.id, caseId);
      setDisplayCases((prev) => prev.filter((c) => c.id !== caseId));
      navigate('/citizen/cases');
    }
  };

  // Detail view for selected case
  if (selectedCaseId && selectedCase) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/citizen/cases')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedCase.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{selectedCase.type} Case</p>
          </div>
        </div>

        {/* Case Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Case Information</CardTitle>
              <Badge
                variant="outline"
                className={cn("gap-1.5 font-normal", statusConfig[selectedCase.status]?.color || statusConfig.active.color)}
              >
                {statusConfig[selectedCase.status]?.label || selectedCase.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{selectedCase.description || 'No description provided'}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Case Type</p>
                <p className="font-semibold">{selectedCase.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <p className="font-semibold">{statusConfig[selectedCase.status]?.label || selectedCase.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Created On</p>
                <p className="font-semibold">
                  {new Date(selectedCase.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Updated</p>
                <p className="font-semibold">
                  {new Date(selectedCase.updatedAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button variant="hero" className="flex-1 sm:flex-auto" onClick={() => navigate('/citizen/file-case')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Forward Case to Police / Advocates
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-auto" onClick={() => navigate('/citizen/consultations')}>
                <Phone className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-auto" onClick={() => navigate('/citizen/documents')}>
                <FileText className="w-4 h-4 mr-2" />
                View Documents
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-auto border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                onClick={() => handleDeleteCase(selectedCase.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Case
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List view
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Cases</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track and manage your legal cases
          </p>
        </div>
        <div className="flex items-center gap-2">
          {displayCases.length > 0 && (
            <Dialog open={showNewCaseDialog} onOpenChange={setShowNewCaseDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Cases</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm">Status</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(statusConfig).map(([key, value]) => (
                        <Button
                          key={key}
                          variant={filterStatus === key ? 'hero' : 'outline'}
                          size="sm"
                          onClick={() => setFilterStatus(filterStatus === key ? null : key)}
                        >
                          {value.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <Dialog open={showNewCaseDialog} onOpenChange={setShowNewCaseDialog}>
            <DialogTrigger asChild>
              <Button variant="hero" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Case
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Case</DialogTitle>
                <DialogDescription>
                  Enter the details of your new legal case
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Case Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Property Dispute with Neighbor"
                    value={newCaseData.title}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="type">Case Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Property, Labor, Consumer, Civil"
                    value={newCaseData.type}
                    onChange={(e) =>
                      setNewCaseData({ ...newCaseData, type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    placeholder="Describe your case..."
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                    rows={4}
                    value={newCaseData.description}
                    onChange={(e) =>
                      setNewCaseData({
                        ...newCaseData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleCreateCase}
                >
                  Create Case
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <p className="text-muted-foreground mb-4">
              {displayCases.length === 0
                ? 'No cases logged yet.'
                : 'No cases match your filters.'}
            </p>
            <Button variant="hero" onClick={() => setShowNewCaseDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Case
            </Button>
          </Card>
        ) : (
          filteredCases.map((caseItem, index) => {
            const status = statusConfig[caseItem.status] || statusConfig.active;
            const StatusIcon = status.icon;

            return (
              <Card
                key={caseItem.id}
                hover
                onClick={() => navigate(`/citizen/cases/${caseItem.id}`)}
                className="cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant="outline"
                          className={cn("gap-1.5 font-normal", status.color)}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                        <Badge variant="secondary" className="font-normal">
                          {caseItem.type}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                        {caseItem.title}
                      </h3>
                      {caseItem.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {caseItem.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-3">
                        Updated: {new Date(caseItem.updatedAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCase(caseItem.id);
                      }}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CitizenCases;
