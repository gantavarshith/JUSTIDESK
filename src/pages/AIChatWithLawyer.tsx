import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { aiApi, LegalAssistanceMode, StructuredLegalResponse } from '@/services/aiApi';
import {
  Send,
  Bot,
  User,
  Loader,
  AlertCircle,
  Scale,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Download,
  ShieldCheck,
  BookOpen,
  ListOrdered,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  rawText?: string;
  data?: StructuredLegalResponse;
  mode?: LegalAssistanceMode;
  timestamp: Date;
}

const TOPIC_PRESETS = [
  { label: 'Workplace & Salary', query: 'What are my employment rights if salary is withheld?' },
  { label: 'Tenant & Landlord', query: 'What are my rights against wrongful tenant eviction?' },
  { label: 'Consumer Complaint', query: 'How do I file a consumer complaint for defective goods?' },
  { label: 'Police & FIR Rights', query: 'What are my legal rights during police questioning or arrest?' },
  { label: 'Fundamental Rights', query: 'What are my fundamental rights under the Constitution of India?' },
  { label: 'RTI Procedure', query: 'How do I file a Right to Information (RTI) application?' },
];

const AIChatWithLawyer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      sender: 'ai',
      data: {
        narrative: `Welcome to JusticeDesk AI Legal Counsel.

I provide clear, practical guidance on Indian law—covering constitutional rights, employment disputes, tenancy issues, consumer protection, and criminal procedure.

How can I assist with your legal matter today?`,
        relevantActs: [
          { act: 'Constitution of India', description: 'Part III Fundamental Rights' },
          { act: 'Consumer Protection Act 2019', description: 'Consumer Remedies' },
          { act: 'Labor Codes of India', description: 'Employee Protection' }
        ],
        actionSteps: [
          'Choose a legal topic below or type your situation directly.',
          'Toggle between Conversational, Action Steps, or Legal Reference modes for customized answers.',
          'Review cited acts and practical next steps tailored to your case.'
        ],
        followUp: [
          "What are my fundamental rights?",
          "How do I handle a workplace wage dispute?",
          "What is the procedure to file a consumer claim?"
        ],
        disclaimer: 'This assistance is for educational and guidance purposes under Indian law and does not constitute formal attorney-client advice.'
      },
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [activeMode, setActiveMode] = useState<LegalAssistanceMode>('conversational');
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const status = aiApi.getConfig();
    if (aiApi.isMockService()) {
      setApiStatus('Demo Mode: Using local legal counsel knowledge base');
    } else {
      setApiStatus(`Connected: ${status.service.toUpperCase()} (${status.model})`);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string = input) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsgId = Date.now().toString();
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      rawText: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiApi.askQuestion(query, { mode: activeMode });

      if (response.success && response.data) {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          data: response.data,
          mode: activeMode,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        toast({
          title: 'Response Failed',
          description: response.error || 'Unable to retrieve legal guidance.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: 'Copied to Clipboard',
      description: 'Legal response copied successfully.',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportChat = () => {
    const transcript = messages
      .map((m) => {
        const sender = m.sender === 'user' ? 'Citizen' : 'AI Legal Counsel';
        const content = m.rawText || m.data?.narrative || '';
        return `[${m.timestamp.toLocaleTimeString()}] ${sender}:\n${content}\n`;
      })
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JusticeDesk_Legal_Transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Transcript Exported',
      description: 'Your legal conversation has been downloaded.',
    });
  };

  return (
    <div className="p-4 lg:p-6 h-[calc(100vh-80px)] flex flex-col bg-background text-foreground">
      <div className="max-w-5xl mx-auto w-full h-full flex flex-col">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-sm">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                AI Legal Counsel
                <Badge variant="outline" className="text-xs font-normal border-primary/30 text-primary bg-primary/5">
                  Indian Legal Framework
                </Badge>
              </h1>
              <p className="text-xs text-muted-foreground">
                Empathetic, modular guidance on constitutional, workplace, civil & criminal law
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportChat}
              className="text-xs gap-1.5 h-8 border-border"
            >
              <Download className="w-3.5 h-3.5" />
              Export Consultation
            </Button>

            {apiStatus && (
              <Badge
                variant="secondary"
                className={`text-xs px-2.5 py-1 flex items-center gap-1.5 ${
                  aiApi.isMockService()
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {apiStatus}
              </Badge>
            )}
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Response Perspective:</span>
          </div>

          <Tabs value={activeMode} onValueChange={(val) => setActiveMode(val as LegalAssistanceMode)}>
            <TabsList className="h-8 bg-muted p-1">
              <TabsTrigger value="conversational" className="text-xs h-6 px-2.5 gap-1">
                <MessageSquare className="w-3 h-3" />
                Conversational Advice
              </TabsTrigger>
              <TabsTrigger value="action_steps" className="text-xs h-6 px-2.5 gap-1">
                <ListOrdered className="w-3 h-3" />
                Quick Action Plan
              </TabsTrigger>
              <TabsTrigger value="legal_reference" className="text-xs h-6 px-2.5 gap-1">
                <BookOpen className="w-3 h-3" />
                Legal Reference & Acts
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-3xl rounded-xl p-4 shadow-sm transition-all ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                    : 'bg-card text-card-foreground border border-border rounded-tl-none'
                }`}
              >
                {/* User Message */}
                {message.sender === 'user' ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.rawText}</p>
                ) : (
                  /* AI Response Render */
                  <div className="space-y-4">
                    {/* Mode Tag if customized */}
                    {message.mode && message.mode !== 'conversational' && (
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                        {message.mode === 'action_steps' ? 'Action Plan Mode' : 'Legal Reference Mode'}
                      </div>
                    )}

                    {/* Narrative Explanation */}
                    <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal text-foreground/90 space-y-2">
                      {message.data?.narrative}
                    </div>

                    {/* Cited Legal Acts Badges */}
                    {message.data?.relevantActs && message.data.relevantActs.length > 0 && (
                      <div className="pt-2 border-t border-border/60">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-primary" />
                          Applicable Statutes & Legal Provisions:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {message.data.relevantActs.map((actItem, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs font-medium px-2.5 py-1 gap-1 bg-secondary/70">
                              <ShieldCheck className="w-3 h-3 text-primary" />
                              {actItem.act}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Steps Checklist */}
                    {message.data?.actionSteps && message.data.actionSteps.length > 0 && (
                      <div className="bg-muted/40 p-3 rounded-lg border border-border/80 space-y-2">
                        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          Recommended Next Action Steps:
                        </p>
                        <ul className="space-y-1.5">
                          {message.data.actionSteps.map((step, sIdx) => (
                            <li key={sIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Contextual Follow-up Chips */}
                    {message.data?.followUp && message.data.followUp.length > 0 && (
                      <div className="pt-2 border-t border-border/40 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Suggested follow-up queries:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {message.data.followUp.map((qText, fIdx) => (
                            <button
                              key={fIdx}
                              onClick={() => handleSendMessage(qText)}
                              className="text-xs text-left px-2.5 py-1 rounded-md bg-muted/60 hover:bg-primary/10 hover:text-primary border border-border/60 transition-colors"
                            >
                              {qText}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer Actions & Disclaimer */}
                    <div className="flex items-center justify-between pt-2 text-[11px] text-muted-foreground opacity-80 border-t border-border/20">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] gap-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopyText(message.id, message.data?.narrative || '')}
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy Response
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-card border border-border text-foreground rounded-xl rounded-tl-none p-4 flex items-center gap-3 shadow-sm">
                <Loader className="w-4 h-4 animate-spin text-primary" />
                <span className="text-xs text-muted-foreground">Analyzing legal statutes & tailoring advice...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Legal Topic Chips */}
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-semibold text-muted-foreground whitespace-nowrap">Quick Topics:</span>
          {TOPIC_PRESETS.map((preset, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSendMessage(preset.query)}
              disabled={loading}
              className="text-xs whitespace-nowrap px-2.5 py-1 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all hover:scale-[1.02] border border-border/50"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <Card className="border border-border shadow-md rounded-xl overflow-hidden">
          <CardContent className="p-2.5 flex gap-2 items-center bg-card">
            <Input
              placeholder="Ask your legal question (e.g. salary withholding, property dispute, arrest rights)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !loading) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={loading}
              className="flex-1 border-0 focus-visible:ring-0 shadow-none text-sm bg-transparent"
            />
            <Button
              size="sm"
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="px-4 gap-1.5 h-9 rounded-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Counsel</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIChatWithLawyer;
