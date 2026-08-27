import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  ShieldCheck, 
  Bot, 
  CheckCircle2, 
  Scale, 
  Calendar,
  Sparkles,
  FileText,
  Send,
  Building2,
  PhoneCall,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore } from '@/services/userDataStore';

const CATEGORIES = [
  { id: 'Property', label: 'Property & Rent', desc: 'Land disputes, eviction, landlord issues' },
  { id: 'Employment', label: 'Employment & Labor', desc: 'Unpaid wages, wrongful termination, POSH' },
  { id: 'Consumer', label: 'Consumer Rights', desc: 'Defective products, online shopping fraud' },
  { id: 'Cybercrime', label: 'Cybercrime & Fraud', desc: 'Financial scams, identity theft, harassment' },
  { id: 'Criminal', label: 'Police & FIR Rights', desc: 'Police arrest, false charges, bail support' },
  { id: 'Family', label: 'Family & Domestic', desc: 'Marital issues, inheritance, custody' },
];

const URGENCY_LEVELS = [
  { id: 'normal', label: 'Standard Guidance', color: 'bg-secondary/10 text-secondary border-secondary/20' },
  { id: 'urgent', label: 'Urgent Matter (1-3 Days)', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  { id: 'emergency', label: 'Immediate Help Needed', color: 'bg-destructive/10 text-destructive border-destructive/20' },
];

const FileCase: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('Property');
  const [urgency, setUrgency] = useState('normal');
  const [title, setTitle] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [needsLawyer, setNeedsLawyer] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedCase, setSubmittedCase] = useState<any | null>(null);

  // Forward Modal State
  const [forwardModalOpen, setForwardModalOpen] = useState(false);
  const [forwardTarget, setForwardTarget] = useState<'police' | 'advocates' | 'dlsa'>('police');
  const [forwardSuccess, setForwardSuccess] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const names = Array.from(files).map(f => f.name);
      setAttachedFiles(prev => [...prev, ...names]);
      toast({ title: 'File Attached', description: `${names.length} file(s) added as case evidence.` });
    }
  };

  const handleSubmitCase = () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please provide a case title and description.',
        variant: 'destructive',
      });
      return;
    }
    if (!user?.id) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newCase = userDataStore.addCase(user.id, {
        title: title.trim(),
        type: category,
        status: urgency === 'emergency' ? 'pending' : 'active',
        description: `${description.trim()}\n\n[Location: ${location || 'N/A'} | Incident Date: ${incidentDate || 'N/A'}]`,
      });

      attachedFiles.forEach((fileName) => {
        userDataStore.addDocument(user.id, {
          name: fileName,
          type: `${category} Evidence`,
          status: 'analyzed',
          summary: `Evidence attached to case "${title.trim()}".`,
        });
      });

      setSubmittedCase(newCase);
      setIsSubmitting(false);
      setStep(4);

      toast({
        title: 'Case Registered Successfully!',
        description: 'Your legal case has been created and analyzed.',
      });
    }, 1000);
  };

  const handleDispatchCase = () => {
    if (!user?.id || !submittedCase) return;

    const refCode = `DISPATCH-${forwardTarget.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const targetNames = {
      police: 'Local Police Station & Cybercrime Cell',
      advocates: 'JusticeDesk Verified Advocates Network',
      dlsa: 'District Legal Services Authority (DLSA)',
    };

    userDataStore.addActivity(user.id, {
      type: 'case_update',
      title: `Case Forwarded to ${forwardTarget.toUpperCase()}`,
      description: `Dispatched case dossier "${submittedCase.title}" (Ref: ${refCode}) to ${targetNames[forwardTarget]}.`,
      timestamp: new Date().toISOString(),
      caseId: submittedCase.id,
    });

    setForwardSuccess({
      refCode,
      targetName: targetNames[forwardTarget],
      helpline: forwardTarget === 'police' ? '112 / 1930' : forwardTarget === 'dlsa' ? '15100' : '1800-JUSTICE',
    });

    toast({
      title: 'Case Forwarded Successfully!',
      description: `Dispatched to ${targetNames[forwardTarget]}. Ref: ${refCode}`,
    });
  };

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FilePlus className="w-6 h-6 text-primary" />
            Direct Case Filing & Legal Aid
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            File your legal issue, attach evidence, and forward directly to authorities or advocates
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/citizen/cases')}>
          My Cases List
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        {[
          { num: 1, label: 'Category & Urgency' },
          { num: 2, label: 'Case Facts & Details' },
          { num: 3, label: 'Evidence & Review' },
          { num: 4, label: 'Triage & Forward' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
              step >= s.num
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {s.num}
            </div>
            <span className={`text-xs font-medium hidden md:inline ${
              step >= s.num ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Category & Urgency */}
      {step === 1 && (
        <Card className="border border-border shadow-sm animate-fade-up">
          <CardHeader>
            <CardTitle className="text-lg">Step 1: Select Legal Category & Urgency</CardTitle>
            <CardDescription>Choose the category that best matches your situation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-semibold mb-3 block">Legal Category</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      category === cat.id
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border bg-card hover:bg-muted/50'
                    }`}
                  >
                    <p className="font-semibold text-sm text-foreground">{cat.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold mb-3 block">Urgency Level</Label>
              <div className="flex flex-wrap gap-3">
                {URGENCY_LEVELS.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => setUrgency(u.id)}
                    className={`px-4 py-2.5 rounded-lg border text-xs font-medium transition-all ${
                      urgency === u.id
                        ? 'ring-2 ring-primary border-primary bg-primary/5'
                        : 'border-border bg-card hover:bg-muted'
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="hero" onClick={() => setStep(2)} className="gap-2">
                Next: Case Facts
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Case Details */}
      {step === 2 && (
        <Card className="border border-border shadow-sm animate-fade-up">
          <CardHeader>
            <CardTitle className="text-lg">Step 2: Describe Incident & Key Facts</CardTitle>
            <CardDescription>Provide clear details so lawyers and authorities can evaluate your case</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Case Title / Brief Heading *</Label>
              <Input
                id="title"
                placeholder="e.g., Unpaid 2-Month Salary & Wrongful Termination"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Incident / Start Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location / City</Label>
                <Input
                  id="location"
                  placeholder="e.g., Bengaluru, Karnataka"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Full Description & Sequence of Events *</Label>
              <textarea
                id="desc"
                rows={5}
                placeholder="Describe what happened, parties involved, financial loss, or notice received..."
                className="w-full p-3 border rounded-lg bg-background text-sm leading-relaxed"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button variant="hero" onClick={() => setStep(3)} className="gap-2" disabled={!title.trim() || !description.trim()}>
                Next: Attach Evidence
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Attach Evidence & Submit */}
      {step === 3 && (
        <Card className="border border-border shadow-sm animate-fade-up">
          <CardHeader>
            <CardTitle className="text-lg">Step 3: Attach Supporting Documents & Register</CardTitle>
            <CardDescription>Upload agreements, legal notices, screenshots, or receipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="border-2 border-dashed border-border p-6 rounded-xl text-center bg-muted/20">
              <Upload className="w-8 h-8 mx-auto text-primary mb-2 opacity-70" />
              <p className="text-xs font-semibold text-foreground mb-1">Attach Contracts, Notices, Receipts or Screenshots</p>
              <p className="text-[11px] text-muted-foreground mb-3">PDF, PNG, JPG up to 10MB</p>
              <Label htmlFor="evidence-file" className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90">
                Browse Files
              </Label>
              <input
                id="evidence-file"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {attachedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Attached Evidence ({attachedFiles.length}):</p>
                <div className="space-y-1.5">
                  {attachedFiles.map((fname, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-secondary/30 border border-border text-xs">
                      <span className="truncate flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        {fname}
                      </span>
                      <Badge variant="outline" className="text-[10px]">Attached</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsLawyer}
                  onChange={(e) => setNeedsLawyer(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                Request Advocate Matching / Legal Assistance
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button variant="hero" onClick={handleSubmitCase} disabled={isSubmitting} className="gap-2">
                {isSubmitting ? 'Registering Case...' : 'Register Case & Proceed to Forward'}
                <CheckCircle2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Triage & Forwarding Options */}
      {step === 4 && submittedCase && (
        <div className="space-y-6 animate-fade-up">
          <Card className="border border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Case Successfully Filed!</h2>
                  <p className="text-xs text-muted-foreground">Case ID: #{submittedCase.id} • Category: {submittedCase.type}</p>
                </div>
              </div>

              {/* Statutory Triage */}
              <div className="bg-card p-4 rounded-xl border border-border space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Sparkles className="w-4 h-4" />
                  Instant AI Triage & Statutory Analysis:
                </div>
                <p className="text-xs leading-relaxed text-foreground/90">
                  Under Indian law for <strong>{category}</strong>, your case falls under statutory citizen protections:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">
                    <ShieldCheck className="w-3 h-3 mr-1 text-primary" />
                    {category === 'Employment' ? 'Payment of Wages Act 1936' : category === 'Property' ? 'Transfer of Property Act 1882' : category === 'Cybercrime' ? 'IT Act 2000 Section 66' : 'Consumer Protection Act 2019'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Article 21 Constitutional Protection
                  </Badge>
                </div>
              </div>

              {/* FORWARD CASE SECTION */}
              <div className="bg-card p-5 rounded-xl border-2 border-primary/20 space-y-4">
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    Forward Case to Police, Advocates or Legal Aid Authorities
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select where you would like your case dossier and evidence dispatched for immediate assistance:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setForwardTarget('police')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      forwardTarget === 'police'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-muted/40 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-foreground mb-1">
                      <Building2 className="w-4 h-4 text-destructive" />
                      Police & Cybercell
                    </div>
                    <p className="text-[11px] text-muted-foreground">Auto-format FIR draft & dispatch to local police station / National Cybercrime Portal.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForwardTarget('advocates')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      forwardTarget === 'advocates'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-muted/40 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-foreground mb-1">
                      <Scale className="w-4 h-4 text-primary" />
                      Verified Advocates
                    </div>
                    <p className="text-[11px] text-muted-foreground">Send case dossier directly to matched Bar Council advocates for representation.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForwardTarget('dlsa')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      forwardTarget === 'dlsa'
                        ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                        : 'border-border bg-muted/40 hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-foreground mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Legal Aid (DLSA)
                    </div>
                    <p className="text-[11px] text-muted-foreground">Submit request for free government pro-bono advocate assignment.</p>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-primary" />
                    Direct Emergency Hotlines: <strong>112</strong> (Police) | <strong>1930</strong> (Cyber Crime) | <strong>15100</strong> (Legal Aid)
                  </div>
                  <Button variant="hero" size="sm" onClick={() => setForwardModalOpen(true)} className="gap-1.5">
                    <Send className="w-3.5 h-3.5" />
                    Dispatch Case Now
                  </Button>
                </div>
              </div>

              {/* Navigation Options */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" onClick={() => navigate('/citizen/ai-chat')} className="gap-2 text-xs">
                  <Bot className="w-4 h-4" />
                  Ask AI Counsel About Case
                </Button>
                <Button variant="outline" onClick={() => navigate('/citizen/consultations')} className="gap-2 text-xs">
                  <Calendar className="w-4 h-4" />
                  Book Advocate Consultation
                </Button>
                <Button variant="ghost" onClick={() => navigate('/citizen/cases')} className="text-xs">
                  Go to My Cases
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Dispatch Modal Confirmation */}
      <Dialog open={forwardModalOpen} onOpenChange={setForwardModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Confirm Case Dispatch
            </DialogTitle>
            <DialogDescription>
              Your case details and attached evidence will be packaged into an official legal dossier.
            </DialogDescription>
          </DialogHeader>

          {!forwardSuccess ? (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-muted rounded-lg text-xs space-y-1">
                <p><strong>Target:</strong> {forwardTarget === 'police' ? 'Local Police Station & Cybercell' : forwardTarget === 'advocates' ? 'Verified Advocates Network' : 'District Legal Services Authority (DLSA)'}</p>
                <p><strong>Case:</strong> {title}</p>
                <p><strong>Evidence Files:</strong> {attachedFiles.length} item(s)</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setForwardModalOpen(false)}>Cancel</Button>
                <Button variant="hero" size="sm" onClick={handleDispatchCase} className="gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  Confirm & Send
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  Dispatch Confirmed
                </div>
                <p><strong>Official Reference:</strong> <span className="font-mono text-primary font-bold">{forwardSuccess.refCode}</span></p>
                <p><strong>Destination:</strong> {forwardSuccess.targetName}</p>
                <p><strong>Emergency Hotline:</strong> {forwardSuccess.helpline}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setForwardModalOpen(false)}>
                  Close
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/citizen/cases')} className="gap-1.5">
                  View My Cases
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileCase;
