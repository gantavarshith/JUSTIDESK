import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { justiceQuotes } from '@/data/mockData';

type UserRole = 'citizen' | 'lawyer';

const S = {
  input: {
    width: '100%',
    padding: '10px 14px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: 8,
    fontSize: 14,
    color: '#ededed',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    boxSizing: 'border-box' as const,
  },
  label: {
    display: 'block' as const,
    fontSize: 12,
    fontWeight: 600,
    color: '#aaa',
    marginBottom: 6,
    letterSpacing: '0.03em',
  },
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [barNumber, setBarNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const quote = justiceQuotes[Math.floor(Math.random() * justiceQuotes.length)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast({ title: 'Missing Required Fields', description: 'Please fill in name, email, and password.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await register({ name, email, phone, password, role, barNumber: role === 'lawyer' ? barNumber : undefined });
      if (res.success) {
        toast({ title: 'Account Created!', description: 'Welcome to JusticeDesk.' });
        navigate(role === 'citizen' ? '/citizen/dashboard' : '/lawyer/dashboard');
      } else {
        toast({ title: 'Registration Failed', description: res.error || 'Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).style.borderColor = '#FFA116';
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).style.borderColor = '#333';
  };

  const benefits = [
    'Free constitutional rights guidance 24/7',
    'File & forward cases to Police or Advocates',
    'AI-powered document review & analysis',
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1c1c1c', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between" style={{ width: '42%', backgroundColor: '#141414', borderRight: '1px solid #2a2a2a', padding: '48px 52px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 56 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#FFA116', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale style={{ width: 19, height: 19, color: '#141414' }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#ededed' }}>
              Justice<span style={{ color: '#FFA116' }}>Desk</span>
            </span>
          </div>

          <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>
            Your rights.<br />
            <span style={{ color: '#FFA116' }}>Protected.</span>
          </h1>
          <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 36, maxWidth: 300 }}>
            Join 50,000+ citizens getting free, clear, confidential legal help powered by Indian law.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {benefits.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <CheckCircle2 style={{ width: 17, height: 17, color: '#FFA116', marginTop: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#bbb', lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 20 }}>
          <p style={{ fontSize: 13, color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>"{quote}"</p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#FFA116', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale style={{ width: 17, height: 17, color: '#141414' }} />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#ededed' }}>Justice<span style={{ color: '#FFA116' }}>Desk</span></span>
          </div>

          <div style={{ backgroundColor: '#232323', border: '1px solid #2e2e2e', borderRadius: 12, padding: '28px 24px' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4, textAlign: 'center' }}>Create your account</h2>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 22 }}>Get free legal guidance in minutes</p>

            {/* Role toggle */}
            <div style={{ display: 'flex', backgroundColor: '#1a1a1a', borderRadius: 8, padding: 4, marginBottom: 22, border: '1px solid #2e2e2e' }}>
              {(['citizen', 'lawyer'] as UserRole[]).map((r) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    backgroundColor: role === r ? '#FFA116' : 'transparent',
                    color: role === r ? '#141414' : '#777',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={S.label}>FULL NAME</label>
                <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required
                  style={S.input} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              <div>
                <label style={S.label}>EMAIL ADDRESS</label>
                <input type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                  style={S.input} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              <div>
                <label style={S.label}>PHONE <span style={{ color: '#555', fontWeight: 400 }}>(optional)</span></label>
                <input type="tel" placeholder="+91 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)}
                  style={S.input} onFocus={focusBorder} onBlur={blurBorder} />
              </div>

              {role === 'lawyer' && (
                <div>
                  <label style={S.label}>BAR COUNCIL NUMBER</label>
                  <input type="text" placeholder="e.g. MH/1234/2022" value={barNumber} onChange={(e) => setBarNumber(e.target.value)}
                    style={S.input} onFocus={focusBorder} onBlur={blurBorder} />
                </div>
              )}

              <div>
                <label style={S.label}>PASSWORD</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required
                    style={{ ...S.input, paddingRight: 40 }} onFocus={focusBorder} onBlur={blurBorder} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={submitting}
                style={{
                  width: '100%', padding: '11px', backgroundColor: '#FFA116',
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
                  color: '#141414', cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: "'Inter', sans-serif", opacity: submitting ? 0.7 : 1, marginTop: 4,
                }}
                onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff8c00'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFA116'; }}>
                {submitting ? 'Creating Account...' : 'Create Account'}
                {!submitting && <ArrowRight style={{ width: 15, height: 15 }} />}
              </button>
            </form>

            <p style={{ fontSize: 13, color: '#555', textAlign: 'center', marginTop: 18 }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#FFA116', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
            </p>

            <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #2a2a2a', display: 'flex', justifyContent: 'center', gap: 16 }}>
              <Link to="/terms" style={{ fontSize: 11, color: '#444', textDecoration: 'none' }}>Terms of Service</Link>
              <span style={{ color: '#333' }}>·</span>
              <Link to="/privacy" style={{ fontSize: 11, color: '#444', textDecoration: 'none' }}>Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
