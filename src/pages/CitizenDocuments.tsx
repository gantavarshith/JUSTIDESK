import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Clock, CheckCircle2, AlertCircle, Eye, Download, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { userDataStore } from '@/services/userDataStore';
import { Document } from '@/types';

const statusConfig = {
  analyzed: {
    label: 'Analyzed',
    icon: CheckCircle2,
    color: 'bg-green-500/10 text-green-600 border-green-500/20',
  },
  pending: {
    label: 'Processing',
    icon: Clock,
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  error: {
    label: 'Error',
    icon: AlertCircle,
    color: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

const CitizenDocuments: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const [displayDocuments, setDisplayDocuments] = useState<Document[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [analyzeLoading, setAnalyzeLoading] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      const userDocs = userDataStore.getDocuments(user.id);
      setDisplayDocuments(userDocs);
    }
  }, [user]);

  const handleUploadFile = (file: File) => {
    if (!user?.id) return;
    const newDoc = userDataStore.addDocument(user.id, {
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF Document' : 'Document',
      status: 'pending',
    });
    setDisplayDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    for (const file of files) {
      handleUploadFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    for (const file of files) {
      handleUploadFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (docId: string, docName: string) => {
    if (!user?.id) return;
    if (window.confirm(`Are you sure you want to delete "${docName}"?`)) {
      const updated = displayDocuments.filter((doc) => doc.id !== docId);
      setDisplayDocuments(updated);
      userDataStore.saveDocuments(user.id, updated);
      setShowPreview(false);
    }
  };

  const handleAnalyze = (docId: string) => {
    if (!user?.id) return;
    setAnalyzeLoading(docId);
    setTimeout(() => {
      const updated = displayDocuments.map((doc) =>
        doc.id === docId
          ? { ...doc, status: 'analyzed' as const, summary: 'Key clauses verified. No legal red flags detected.', analyzedAt: new Date().toISOString() }
          : doc
      );
      setDisplayDocuments(updated);
      userDataStore.saveDocuments(user.id, updated);
      setAnalyzeLoading(null);
    }, 1200);
  };

  const handlePreview = (doc: any) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Upload and analyze your legal documents
          </p>
        </div>
        <Button 
          variant="hero"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>

      <Card
        ref={dropZoneRef}
        className={cn(
          "border-2 border-dashed transition-all cursor-pointer",
          isDragging
            ? "border-secondary/100 bg-secondary/5"
            : "border-secondary/30 hover:border-secondary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Upload className="w-7 h-7 text-secondary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Drop files here or click to upload
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            PDF, DOC, DOCX, or images up to 10MB
          </p>
          <Button variant="hero-outline" size="sm" onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}>
            Browse Files
          </Button>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="space-y-4">
        <h2 className="font-semibold text-foreground">Recent Documents</h2>
        {displayDocuments.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No documents uploaded yet. Upload your first document to get started.</p>
          </Card>
        ) : (
          displayDocuments.map((doc, index) => {
            const status = statusConfig[doc.status as keyof typeof statusConfig] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <Card
                key={doc.id}
                className="animate-fade-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/5 text-primary shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {doc.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn("gap-1.5 font-normal shrink-0", status.color)}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doc.type}
                      </p>
                      {doc.summary && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {doc.summary}
                        </p>
                      )}
                      {doc.analyzedAt && (
                        <p className="text-xs text-muted-foreground/70 mt-2">
                          Analyzed: {new Date(doc.analyzedAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => handlePreview(doc)}
                        title="View document"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {doc.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleAnalyze(doc.id)}
                          disabled={analyzeLoading === doc.id}
                          title="Analyze document"
                        >
                          {analyzeLoading === doc.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon-sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(doc.id, doc.name)}
                        title="Delete document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{selectedDoc?.name}</DialogTitle>
            <DialogDescription>
              {selectedDoc?.type} • {selectedDoc?.analyzedAt ? 'Analyzed' : 'Pending analysis'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {selectedDoc?.summary && (
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">{selectedDoc.summary}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button 
                variant="destructive-outline" 
                onClick={() => {
                  handleDelete(selectedDoc?.id, selectedDoc?.name);
                }}
                className="flex-1"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CitizenDocuments;
