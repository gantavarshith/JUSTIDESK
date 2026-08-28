import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Scale,
  ArrowRight,
  ShieldCheck,
  FileSearch,
  Users,
  Bot,
  FilePlus,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/* ─── colour palette ─────────────────────────────────── */
const C = {
  bg:      '#1c1c1c',
  panel:   '#141414',
  card:    '#232323',
  hover:   '#2a2a2a',
  border:  '#2e2e2e',
  border2: '#333',
  text:    '#ededed',
  muted:   '#999',
  dim:     '#555',
  orange:  '#FFA116',
  orangeH: '#FF8C00',
  green:   '#00b8a3',
};

/* ─── reusable bits ──────────────────────────────────── */
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    style={{ fontSize: 14, color: C.muted, textDecoration: 'none', transition: 'color 0.15s' }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.text)}
    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.muted)}
  >
    {children}
  </a>
);

const OrangeBtn: React.FC<{ to: string; children: React.ReactNode; large?: boolean }> = ({ to, children, large }) => (
  <Link
    to={to}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: large ? '12px 28px' : '9px 20px',
      backgroundColor: C.orange, color: '#141414',
      borderRadius: 8, fontWeight: 700, fontSize: large ? 15 : 13,
      textDecoration: 'none', transition: 'background 0.15s',
      fontFamily: "'Inter', sans-serif",
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.orangeH)}
    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = C.orange)}
  >
    {children}
  </Link>
);

const GhostBtn: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '12px 28px', border: `1px solid ${C.border}`,
      backgroundColor: C.card, color: C.text,
      borderRadius: 8, fontWeight: 600, fontSize: 15,
      textDecoration: 'none', transition: 'border-color 0.15s',
      fontFamily: "'Inter', sans-serif",
    }}
    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.orange)}
    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.border)}
  >
    {children}
  </Link>
);

/* ─── scenarios ──────────────────────────────────────── */
const scenarios = {
  police: {
    title: 'Stopped by Police or Detained',
    act: 'Article 22(1) & Section 50 CrPC',
    rights: [
      'Right to know the exact grounds of arrest immediately.',
      'Right to remain silent and consult a lawyer of your choice.',
      'Must be produced before a Magistrate within 24 hours.',
    ],
    helpline: '112 / Women Helpline 1091',
  },
  workplace: {
    title: 'Unpaid Wages or Wrongful Termination',
    act: 'Payment of Wages Act 1936 & Industrial Disputes Act',
    rights: [
      'Employer cannot make unauthorized deductions from earned salary.',
      'Mandatory notice period or retrenchment compensation required.',
      'Right to file a claim with the Deputy Labour Commissioner.',
    ],
    helpline: 'Labour Helpline 1800-11-1800',
  },
  property: {
    title: 'Landlord Harassment & Illegal Eviction',
    act: 'State Rent Control Acts & Section 441 IPC',
    rights: [
      'Forcible lockout or utility cut-off (water / electricity) is illegal.',
      'Eviction requires a valid judicial notice and due process.',
      'Tenant entitled to full security deposit refund.',
    ],
    helpline: 'Rent Control Authority / Civil Court',
  },
  cyber: {
    title: 'Online Fraud or Cyber Harassment',
    act: 'IT Act 2000 Section 66D & 67',
    rights: [
      'Right to freeze fraudulent bank transfers within the golden hour.',
      'File directly at National Cybercrime Portal (cybercrime.gov.in).',
      'Protection of digital privacy and personal data rights.',
    ],
    helpline: 'National Cybercrime Helpline 1930',
  },
};

type ScenarioKey = keyof typeof scenarios;

const tabs: { key: ScenarioKey; emoji: string; label: string }[] = [
  { key: 'police',    emoji: '👮', label: 'Police & Arrest' },
  { key: 'workplace', emoji: '💼', label: 'Wages & Work' },
  { key: 'property',  emoji: '🏠', label: 'Property & Rent' },
  { key: 'cyber',     emoji: '💻', label: 'Cyber Crime' },
];

const features = [
  { icon: FilePlus, title: 'Direct Case Filing',     desc: 'File with evidence and dispatch to Police (112), Cybercell (1930), or free DLSA Legal Aid instantly.', tag: 'Immediate Action' },
  { icon: Bot,      title: 'AI Legal Counsel 24/7',  desc: 'Conversational AI trained on BNSS, IPC, and Constitutional Rights — plain language, no jargon.', tag: 'Always Available' },
  { icon: FileSearch,title: 'Document Analyzer',    desc: 'Upload contracts, notices, or agreements for instant clause summaries, risk flags, and remedies.', tag: 'Instant Review' },
  { icon: Users,    title: 'Advocate Network',       desc: 'Connect with Bar Council verified advocates or apply for free government pro-bono representation.', tag: 'Verified Lawyers' },
];

const stats = [
  { val: '50,000+', label: 'Citizens Assisted' },
  { val: '15,000+', label: 'Cases Analyzed' },
  { val: '24 / 7',  label: 'AI Legal Guidance' },
  { val: '100 %',   label: 'Free Rights Access' },
];

const testimonials = [
  { q: '"JusticeDesk gave me exact rent-control sections and drafted an emergency police notice in 5 minutes when my landlord tried an illegal lockout."', name: 'Rajesh K.', role: 'Citizen · Bengaluru' },
  { q: '"The AI document analyzer instantly flagged unfair liability clauses in my employment contract before I signed."', name: 'Ananya M.', role: 'Software Engineer · Hyderabad' },
  { q: '"As a practising advocate, JusticeDesk streamlines initial case fact-gathering and evidence packaging for clients."', name: 'Adv. Suresh Verma', role: 'High Court Advocate · Delhi' },
];

const footerLinks = [
  { label: 'File a Case',     to: '/citizen/file-case' },
  { label: 'AI Counsel',      to: '/citizen/ai-chat' },
  { label: 'Know Your Rights',to: '/rights' },
  { label: 'Documents',       to: '/citizen/documents' },
];

/* ─── component ──────────────────────────────────────── */
const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [tab, setTab] = useState<ScenarioKey>('police');

  if (isAuthenticated) {
    return <Navigate to={user?.role === 'lawyer' ? '/lawyer/dashboard' : '/citizen/dashboard'} replace />;
  }

  const scenario = scenarios[tab];

  return (
    <div style={{ backgroundColor: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif", minHeight: '100vh' }}>

      {/* ── NAVBAR ─────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(28,28,28,0.92)', borderBottom: `1px solid ${C.border}`, backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Scale style={{ width: 18, height: 18, color: '#141414' }} />
            </div>
            <span style={{ fontSize: 19, fontWeight: 700, color: C.text }}>
              Justice<span style={{ color: C.orange }}>Desk</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <NavLink href="#rights">Know Your Rights</NavLink>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#helplines">Helplines</NavLink>
          </nav>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link to="/login"
              style={{ fontSize: 13, fontWeight: 500, color: C.muted, textDecoration: 'none', padding: '7px 14px', borderRadius: 6 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.backgroundColor = C.card; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}>
              Sign In
            </Link>
            <OrangeBtn to="/register">Get Started <ArrowRight style={{ width: 14, height: 14 }} /></OrangeBtn>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 96px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', backgroundColor: 'rgba(255,161,22,0.1)', border: `1px solid rgba(255,161,22,0.25)`, borderRadius: 100, fontSize: 12, fontWeight: 600, color: C.orange, width: 'fit-content' }}>
            ✦ India's Legal Rights & AI Platform
          </div>

          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>
            Justice for<br />
            <span style={{ color: C.orange }}>every citizen.</span>
          </h1>

          <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.7, margin: 0, maxWidth: 460 }}>
            File cases, understand your constitutional rights, get AI legal guidance, and dispatch directly to Police, Cybercell, or free government legal aid — all in one place.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <OrangeBtn to="/register" large>
              <FilePlus style={{ width: 16, height: 16 }} />
              File a Case — Free
            </OrangeBtn>
            <GhostBtn to="/login">
              <Bot style={{ width: 16, height: 16, color: C.orange }} />
              Ask AI Legal Counsel
            </GhostBtn>
          </div>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 8, borderTop: `1px solid ${C.border}` }}>
            {['50,000+ citizens helped', 'Fully confidential', 'Based on Indian law'].map((t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.dim }}>
                <CheckCircle2 style={{ width: 13, height: 13, color: C.green }} />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Live Case Card */}
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: 'rgba(255,161,22,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.orange }}>AI</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: 0 }}>Live Legal Triage</p>
                <p style={{ fontSize: 11, color: C.dim, margin: 0 }}>Case #JD-2026-9812</p>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100, backgroundColor: 'rgba(0,184,163,0.1)', border: '1px solid rgba(0,184,163,0.25)', color: C.green }}>
              Ready to Dispatch
            </span>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: `1px solid ${C.border2}`, borderRadius: 8, padding: '12px 14px' }}>
            <p style={{ fontSize: 11, color: C.dim, marginBottom: 5, margin: '0 0 6px' }}>User Query</p>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>
              "My employer withheld 2 months salary and threatened termination when I asked for payment."
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: `1px solid rgba(255,161,22,0.3)`, borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <ShieldCheck style={{ width: 13, height: 13, color: C.orange }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.orange }}>Applicable Statute</span>
              <span style={{ fontSize: 11, color: C.dim, marginLeft: 'auto' }}>Payment of Wages Act 1936</span>
            </div>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6, margin: 0 }}>
              Section 15 — right to recover full wages with up to 10× penalty. Labor Commissioner filing available immediately.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['🏛️', 'Labour Office'], ['⚖️', 'Verified Advocate']].map(([em, lbl]) => (
              <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', backgroundColor: '#1a1a1a', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, color: C.muted }}>
                <span>{em}</span><span>{lbl}</span>
              </div>
            ))}
          </div>

          <Link to="/register"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px', backgroundColor: '#1a1a1a', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: C.text, textDecoration: 'none', transition: 'border-color 0.15s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.orange)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = C.border)}>
            Try the full platform free
            <ArrowRight style={{ width: 14, height: 14, color: C.orange }} />
          </Link>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, backgroundColor: '#1a1a1a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', textAlign: 'center', gap: 24 }}>
          {stats.map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: 30, fontWeight: 800, color: C.orange, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{s.val}</p>
              <p style={{ fontSize: 12, color: C.dim, margin: 0, fontWeight: 500 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHTS TRIAGE ───────────────────────────────── */}
      <section id="rights" style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.orange, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Know Your Rights Preview</p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 10px' }}>Instant Legal Guidance in Any Situation</h2>
          <p style={{ fontSize: 15, color: C.muted, maxWidth: 520, margin: '0 auto' }}>
            Select a situation to see your rights and emergency contacts under Indian law.
          </p>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          {tabs.map(({ key, emoji, label }) => (
            <button key={key} onClick={() => setTab(key)}
              style={{
                padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                border: `1px solid ${tab === key ? C.orange : C.border}`,
                backgroundColor: tab === key ? 'rgba(255,161,22,0.1)' : 'transparent',
                color: tab === key ? C.orange : C.muted,
                cursor: 'pointer', transition: 'all 0.15s', fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => { if (tab !== key) { (e.currentTarget as HTMLElement).style.color = C.text; (e.currentTarget as HTMLElement).style.borderColor = '#555'; } }}
              onMouseLeave={(e) => { if (tab !== key) { (e.currentTarget as HTMLElement).style.color = C.muted; (e.currentTarget as HTMLElement).style.borderColor = C.border; } }}>
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Scenario card */}
        <div style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 32px', maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, paddingBottom: 20, marginBottom: 20, borderBottom: `1px solid ${C.border}` }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>{scenario.title}</h3>
              <p style={{ fontSize: 12, color: C.orange, fontWeight: 600, margin: 0 }}>Statute: {scenario.act}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, backgroundColor: 'rgba(0,184,163,0.08)', border: '1px solid rgba(0,184,163,0.25)', fontSize: 12, color: C.green }}>
              <PhoneCall style={{ width: 12, height: 12 }} />
              {scenario.helpline}
            </div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {scenario.rights.map((r) => (
              <li key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                <CheckCircle2 style={{ width: 17, height: 17, color: C.orange, flexShrink: 0, marginTop: 1 }} />
                {r}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
            <p style={{ fontSize: 13, color: C.dim, margin: 0 }}>Get full step-by-step guidance tailored to your case.</p>
            <OrangeBtn to="/register">Get Guidance <ArrowRight style={{ width: 13, height: 13 }} /></OrangeBtn>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section id="features" style={{ backgroundColor: '#1a1a1a', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.orange, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Platform Features</p>
            <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Everything to Navigate the Law</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
            {features.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title}
                style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 14, transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,161,22,0.4)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}>
                <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,161,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ width: 20, height: 20, color: C.orange }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, padding: '3px 10px', border: `1px solid ${C.border}`, borderRadius: 100, width: 'fit-content', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {tag}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: 0 }}>Trusted by Citizens & Advocates</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ backgroundColor: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: C.orange, fontSize: 14 }}>{s}</span>)}
              </div>
              <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, fontStyle: 'italic', margin: 0 }}>{t.q}</p>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{t.name}</p>
                <p style={{ fontSize: 12, color: C.dim, margin: 0 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', backgroundColor: C.card, border: `1px solid rgba(255,161,22,0.25)`, borderRadius: 16, padding: '52px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Take Control of Your Legal Rights Today</h2>
          <p style={{ fontSize: 15, color: C.muted, margin: '0 0 28px' }}>Join thousands of citizens getting free, clear, and confidential legal help.</p>
          <OrangeBtn to="/register" large>
            Create Free Account <ArrowRight style={{ width: 16, height: 16 }} />
          </OrangeBtn>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer id="helplines" style={{ backgroundColor: C.panel, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 36 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Scale style={{ width: 18, height: 18, color: C.orange }} />
              <span style={{ fontSize: 17, fontWeight: 700, color: C.text }}>Justice<span style={{ color: C.orange }}>Desk</span></span>
            </div>
            <p style={{ fontSize: 13, color: C.dim, lineHeight: 1.7, margin: 0 }}>
              Empowering Indian citizens with legal knowledge, AI document analysis, and direct advocate connections.
            </p>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Emergency Helplines</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['🚓 Police Emergency', '112'], ['💻 Cyber Crime', '1930'], ['🏛️ Legal Aid (NALSA)', '15100'], ['👩 Women Helpline', '1091']].map(([lbl, num]) => (
                <li key={lbl} style={{ fontSize: 13, color: C.dim }}>
                  {lbl}: <strong style={{ color: C.muted }}>{num}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Platform</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {footerLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} style={{ fontSize: 13, color: C.dim, textDecoration: 'none' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.orange)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.text, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Account</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Sign In', '/login'], ['Register', '/register'], ['Terms', '/terms'], ['Privacy', '/privacy']].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} style={{ fontSize: 13, color: C.dim, textDecoration: 'none' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.orange)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ fontSize: 12, color: '#444', margin: 0 }}>© 2026 JusticeDesk. All rights reserved.</p>
          <p style={{ fontSize: 12, color: '#444', margin: 0 }}>
            Disclaimer: JusticeDesk provides legal information only and does not substitute formal legal representation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
