import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { sendLegalQuery, ChatMessage } from '@/services/geminiService';
import { GEMINI_API_KEY } from '@/config/aiConfig';
import {
  Bot,
  User,
  Send,
  Loader2,
  Scale,
  Download,
  Copy,
  Check,
  RefreshCw,
} from 'lucide-react';

const QUICK_TOPICS = [
  { label: 'Unpaid Salary', query: 'My employer has not paid my salary for 2 months. What are my legal rights?' },
  { label: 'Illegal Eviction', query: 'My landlord is threatening to evict me illegally. What can I do?' },
  { label: 'Consumer Fraud', query: 'I was cheated by an online seller. How do I file a consumer complaint?' },
  { label: 'Police Rights', query: 'What are my rights if the police want to arrest or question me?' },
  { label: 'Cheque Bounce', query: 'Someone gave me a bounced cheque. What legal action can I take under Section 138?' },
  { label: 'FIR Refused', query: 'The police are refusing to register my FIR. What should I do?' },
  { label: 'Security Deposit', query: 'My landlord is not returning my security deposit. What are my options?' },
  { label: 'Domestic Violence', query: 'I am facing domestic violence. What legal protection do I have under Indian law?' },
];

const WELCOME_MESSAGE = `Hello! I'm your JusticeDesk AI Legal Counsel.

I'm here to help you understand your legal rights under Indian law and guide you through any legal situation you're facing — whether it's a workplace dispute, tenant issues, consumer complaints, police matters, or family law.

Tell me what's happening and I'll give you clear, direct advice.`;

const AIChatWithLawyer: React.FC = () => {
  // History tracks the full conversation for Gemini's multi-turn context
  const [history, setHistory] = useState<ChatMessage[]>([]);
  // Messages are for display only (includes welcome message)
  const [displayMessages, setDisplayMessages] = useState<{ id: string; role: 'ai' | 'user'; text: string; timestamp: Date }[]>([
    { id: 'welcome', role: 'ai', text: WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isConfigured] = useState(() => !!GEMINI_API_KEY && GEMINI_API_KEY.length > 5);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayMessages, loading]);

  const sendMessage = async (text: string) => {
    const query = text.trim();
    if (!query || loading) return;

    if (!isConfigured) {
      toast({
        title: 'API Key Not Configured',
        description: 'Please set VITE_GEMINI_API_KEY in your .env file and restart the dev server.',
        variant: 'destructive',
      });
      return;
    }

    const userMsgId = Date.now().toString();
    setDisplayMessages((prev) => [
      ...prev,
      { id: userMsgId, role: 'user', text: query, timestamp: new Date() },
    ]);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendLegalQuery(query, history);

      // Update history for next turn
      setHistory((prev) => [
        ...prev,
        { role: 'user', text: query },
        { role: 'model', text: reply },
      ]);

      setDisplayMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'ai', text: reply, timestamp: new Date() },
      ]);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err?.message || 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExport = () => {
    const lines = displayMessages.map((m) => {
      const role = m.role === 'user' ? 'You' : 'JusticeDesk AI';
      return `[${m.timestamp.toLocaleTimeString()}] ${role}:\n${m.text}`;
    }).join('\n\n---\n\n');
    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JusticeDesk_Consultation_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setHistory([]);
    setDisplayMessages([
      { id: 'welcome', role: 'ai', text: WELCOME_MESSAGE, timestamp: new Date() },
    ]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)',
        background: '#1c1c1c',
        color: '#ededed',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid #2e2e2e',
          flexShrink: 0,
          background: '#1c1c1c',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(255,161,22,0.12)',
              border: '1px solid rgba(255,161,22,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Scale size={18} color="#FFA116" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#ededed' }}>AI Legal Counsel</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>
              {isConfigured ? (
                <span style={{ color: '#4ade80' }}>● Connected · Indian Law</span>
              ) : (
                <span style={{ color: '#f87171' }}>● VITE_GEMINI_API_KEY not set in .env</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleClear}
            title="Start new conversation"
            style={{
              background: 'transparent',
              border: '1px solid #2e2e2e',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFA116')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
          >
            <RefreshCw size={13} />
            New Chat
          </button>
          <button
            onClick={handleExport}
            title="Export consultation"
            style={{
              background: 'transparent',
              border: '1px solid #2e2e2e',
              borderRadius: 8,
              padding: '6px 10px',
              cursor: 'pointer',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 12,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFA116')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2e2e2e')}
          >
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          scrollBehavior: 'smooth',
        }}
      >
        {displayMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: 10,
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              maxWidth: '100%',
            }}
          >
            {/* AI avatar */}
            {msg.role === 'ai' && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'rgba(255,161,22,0.12)',
                  border: '1px solid rgba(255,161,22,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <Bot size={15} color="#FFA116" />
              </div>
            )}

            {/* Bubble */}
            <div
              style={{
                maxWidth: msg.role === 'user' ? '70%' : '80%',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                background: msg.role === 'user' ? '#FFA116' : '#232323',
                color: msg.role === 'user' ? '#000' : '#dedede',
                fontSize: 13.5,
                lineHeight: 1.65,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                position: 'relative',
                border: msg.role === 'ai' ? '1px solid #2e2e2e' : 'none',
              }}
            >
              {msg.role === 'ai' ? (
                <div style={{ color: '#dedede' }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ node, ...props }) => <p style={{ margin: '0 0 12px 0' }} {...props} />,
                      h3: ({ node, ...props }) => <h3 style={{ color: '#FFA116', margin: '16px 0 8px 0', fontSize: '15px', fontWeight: 600 }} {...props} />,
                      ul: ({ node, ...props }) => <ul style={{ paddingLeft: '20px', margin: '0 0 12px 0', listStyleType: 'disc' }} {...props} />,
                      ol: ({ node, ...props }) => <ol style={{ paddingLeft: '20px', margin: '0 0 12px 0', listStyleType: 'decimal' }} {...props} />,
                      li: ({ node, ...props }) => <li style={{ marginBottom: '6px' }} {...props} />,
                      strong: ({ node, ...props }) => <strong style={{ color: '#fff', fontWeight: 600 }} {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}

              {/* Actions row for AI messages */}
              {msg.role === 'ai' && (
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: '1px solid #333',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 10, color: '#555' }}>
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: copiedId === msg.id ? '#4ade80' : '#555',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 11,
                      padding: '2px 6px',
                      borderRadius: 4,
                      transition: 'color 0.15s',
                    }}
                  >
                    {copiedId === msg.id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === msg.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {/* User avatar */}
            {msg.role === 'user' && (
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: '#FFA116',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <User size={15} color="#000" />
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(255,161,22,0.12)',
                border: '1px solid rgba(255,161,22,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Bot size={15} color="#FFA116" />
            </div>
            <div
              style={{
                background: '#232323',
                border: '1px solid #2e2e2e',
                borderRadius: '4px 18px 18px 18px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#666',
                fontSize: 13,
              }}
            >
              <Loader2 size={15} color="#FFA116" style={{ animation: 'spin 1s linear infinite' }} />
              Analyzing your query...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Quick Topic Chips ── */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: '1px solid #2a2a2a',
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          flexShrink: 0,
          background: '#1c1c1c',
          scrollbarWidth: 'none',
        }}
      >
        <span style={{ fontSize: 11, color: '#555', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', marginRight: 4 }}>
          Quick Topics:
        </span>
        {QUICK_TOPICS.map((t) => (
          <button
            key={t.label}
            onClick={() => sendMessage(t.query)}
            disabled={loading}
            style={{
              flexShrink: 0,
              background: '#252525',
              border: '1px solid #333',
              borderRadius: 20,
              padding: '5px 12px',
              color: '#aaa',
              fontSize: 11,
              cursor: loading ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.borderColor = '#FFA116';
                e.currentTarget.style.color = '#FFA116';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333';
              e.currentTarget.style.color = '#aaa';
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Input Bar ── */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #2a2a2a',
          background: '#1c1c1c',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            background: '#242424',
            border: '1.5px solid #333',
            borderRadius: 14,
            padding: '6px 6px 6px 14px',
            transition: 'border-color 0.2s',
          }}
          onFocusCapture={(e) => (e.currentTarget.style.borderColor = '#FFA116')}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = '#333')}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !loading) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Describe your legal situation or ask a question..."
            disabled={loading}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ededed',
              fontSize: 13.5,
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            style={{
              background: loading || !input.trim() ? '#2e2e2e' : '#FFA116',
              border: 'none',
              borderRadius: 10,
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <Send size={16} color={loading || !input.trim() ? '#555' : '#000'} />
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 10, color: '#444', marginTop: 6 }}>
          For educational purposes only · Not formal legal representation
        </div>
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AIChatWithLawyer;
