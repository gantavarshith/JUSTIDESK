import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Edit, Clock, CheckCircle2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore, SavedFormItem } from '@/services/userDataStore';

const CitizenSavedForms: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const [forms, setForms] = useState<SavedFormItem[]>([]);
  const [showNewFormDialog, setShowNewFormDialog] = useState(false);
  const [selectedForm, setSelectedForm] = useState<SavedFormItem | null>(null);
  const [editingContent, setEditingContent] = useState('');
  
  const [newFormData, setNewFormData] = useState({
    title: '',
    type: '',
  });

  const formTypes = ['Legal Notice', 'Complaint', 'Agreement', 'Petition', 'Appeal', 'Other'];

  useEffect(() => {
    if (user?.id) {
      const userForms = userDataStore.getForms(user.id);
      setForms(userForms);
    }
  }, [user]);

  const handleCreateForm = () => {
    if (!newFormData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a form title',
        variant: 'destructive',
      });
      return;
    }
    if (!user?.id) return;

    const created = userDataStore.addForm(user.id, {
      title: newFormData.title,
      type: newFormData.type || 'Other',
      status: 'draft',
    });

    setForms((prev) => [created, ...prev]);
    setNewFormData({ title: '', type: '' });
    setShowNewFormDialog(false);
    setSelectedForm(created);
    setEditingContent('');

    toast({
      title: 'Form Created',
      description: 'Start editing your new legal draft.',
    });
  };

  const handleSaveDraft = () => {
    if (!selectedForm || !user?.id) return;
    const updatedForms = forms.map((f) =>
      f.id === selectedForm.id
        ? { ...f, data: editingContent, lastModified: new Date().toISOString() }
        : f
    );
    setForms(updatedForms);
    userDataStore.saveForms(user.id, updatedForms);
    toast({ title: 'Draft Saved', description: 'Form content saved successfully.' });
  };

  const handleSubmitForm = () => {
    if (!selectedForm || !user?.id) return;
    if (window.confirm('Are you sure you want to submit this form?')) {
      const updatedForms = forms.map((f) =>
        f.id === selectedForm.id
          ? { ...f, data: editingContent, status: 'submitted' as const, lastModified: new Date().toISOString() }
          : f
      );
      setForms(updatedForms);
      userDataStore.saveForms(user.id, updatedForms);
      setSelectedForm(null);
      toast({ title: 'Submitted', description: 'Form has been marked as submitted.' });
    }
  };

  const handleDeleteForm = (formId: string, formTitle: string) => {
    if (!user?.id) return;
    if (window.confirm(`Are you sure you want to delete "${formTitle}"?`)) {
      const updatedForms = forms.filter((f) => f.id !== formId);
      setForms(updatedForms);
      userDataStore.saveForms(user.id, updatedForms);
      if (selectedForm?.id === formId) {
        setSelectedForm(null);
      }
      toast({
        title: 'Deleted',
        description: 'Form deleted successfully',
      });
    }
  };

  const draftForms = forms.filter((f) => f.status === 'draft');
  const submittedForms = forms.filter((f) => f.status === 'submitted');

  if (selectedForm) {
    return (
      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{selectedForm.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">{selectedForm.type}</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setSelectedForm(null)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Form Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="formContent">Form Details</Label>
                <textarea
                  id="formContent"
                  placeholder="Enter your form content here..."
                  className="w-full h-64 p-4 border rounded-lg font-mono text-sm bg-background"
                  value={editingContent !== undefined ? editingContent : (selectedForm.data || '')}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  ℹ️ Click Save Draft to store your progress. You can submit the document once completed.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setSelectedForm(null)}
                >
                  Back
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleSaveDraft}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  variant="hero"
                  onClick={handleSubmitForm}
                  className="flex-1 sm:flex-auto"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Form
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Saved Forms</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage your legal forms
          </p>
        </div>
        <Dialog open={showNewFormDialog} onOpenChange={setShowNewFormDialog}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              New Form
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Form</DialogTitle>
              <DialogDescription>
                Start creating a new legal form
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="formTitle">Form Title *</Label>
                <Input
                  id="formTitle"
                  placeholder="e.g., Property Dispute Petition"
                  value={newFormData.title}
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="formType">Form Type *</Label>
                <select
                  id="formType"
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                  value={newFormData.type}
                  onChange={(e) =>
                    setNewFormData({ ...newFormData, type: e.target.value })
                  }
                >
                  <option value="">Select form type</option>
                  {formTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                variant="hero"
                className="w-full"
                onClick={handleCreateForm}
              >
                Create Form
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {draftForms.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Draft Forms</h2>
          {draftForms.map((form, index) => (
            <Card
              key={form.id}
              className="animate-fade-up hover:shadow-md transition-shadow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      setSelectedForm(form);
                      setEditingContent(form.data || '');
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{form.title}</h3>
                        <p className="text-sm text-muted-foreground">{form.type}</p>
                      </div>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        <Clock className="w-3 h-3 mr-1" />
                        Draft
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last edited: {new Date(form.lastModified).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedForm(form);
                        setEditingContent(form.data || '');
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteForm(form.id, form.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {submittedForms.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Submitted Forms</h2>
          {submittedForms.map((form, index) => (
            <Card
              key={form.id}
              className="animate-fade-up opacity-75"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{form.title}</h3>
                        <p className="text-sm text-muted-foreground">{form.type}</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Submitted
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {forms.length === 0 && (
        <Card className="p-12 text-center border-dashed">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground mb-4">No forms yet. Create your first form to get started.</p>
          <Button variant="hero" onClick={() => setShowNewFormDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Form
          </Button>
        </Card>
      )}
    </div>
  );
};

export default CitizenSavedForms;
