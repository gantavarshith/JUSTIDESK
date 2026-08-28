import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff, ArrowRight, ShieldCheck, Bot, FileSearch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { justiceQuotes } from '@/data/mockData';

type UserRole = 'citizen' | 'lawyer';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>('citizen');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const quote = justiceQuotes[Math.floor(Math.random() * justiceQuotes.length)];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({ title: 'Missing Fields', description: 'Please fill in both email and password.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const res = await login(email, password, role);
      if (res.success) {
        toast({ title: 'Welcome Back!', description: `Signed in successfully.` });
        navigate(role === 'citizen' ? '/citizen/dashboard' : '/lawyer/dashboard');
      } else {
        toast({ title: 'Sign In Failed', description: res.error || 'Invalid credentials.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    { icon: ShieldCheck, text: 'Know your rights in any situation' },
    { icon: FileSearch, text: 'AI-powered document analysis' },
    { icon: Bot, text: 'Connect with verified advocates' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1c1c1c', display: 'flex', fontFamily: "'Inter', sans-serif" }}>

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between" style={{ width: '45%', backgroundColor: '#141414', borderRight: '1px solid #2a2a2a', padding: '48px 56px' }}>
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 64 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#FFA116', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale style={{ width: 20, height: 20, color: '#141414' }} />
            </div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#ededed' }}>
              Justice<span style={{ color: '#FFA116' }}>Desk</span>
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
            Legal clarity<br />
            for <span style={{ color: '#FFA116' }}>everyone.</span>
          </h1>
          <p style={{ fontSize: 15, color: '#888', lineHeight: 1.7, marginBottom: 40, maxWidth: 320 }}>
            India's AI-powered legal rights platform — free for every citizen.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {features.map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: 'rgba(255,161,22,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon style={{ width: 18, height: 18, color: '#FFA116' }} />
                </div>
                <span style={{ fontSize: 14, color: '#ccc', fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding: '20px 0', borderTop: '1px solid #2a2a2a' }}>
          <p style={{ fontSize: 13, color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>"{quote}"</p>
          <p style={{ fontSize: 11, color: '#444', marginTop: 8, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Trusted by 50,000+ citizens across India</p>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Mobile logo */}
          <div className="lg:hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 36 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#FFA116', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale style={{ width: 18, height: 18, color: '#141414' }} />
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#ededed' }}>
              Justice<span style={{ color: '#FFA116' }}>Desk</span>
            </span>
          </div>

          {/* Card */}
          <div style={{ backgroundColor: '#232323', border: '1px solid #2e2e2e', borderRadius: 12, padding: '32px 28px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 4, textAlign: 'center' }}>Welcome back</h2>
            <p style={{ fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 24 }}>Sign in to access your legal dashboard</p>

            {/* Role Toggle */}
            <div style={{ display: 'flex', backgroundColor: '#1a1a1a', borderRadius: 8, padding: 4, marginBottom: 24, border: '1px solid #2e2e2e' }}>
              {(['citizen', 'lawyer'] as UserRole[]).map((r) => (
                <button key={r} type="button" onClick={() => setRole(r)}
                  style={{
                    flex: 1, padding: '8px 0', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                    backgroundColor: role === r ? '#FFA116' : 'transparent',
                    color: role === r ? '#141414' : '#888',
                    fontFamily: "'Inter', sans-serif",
                  }}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Email */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#aaa', marginBottom: 6, letterSpacing: '0.03em' }}>EMAIL</label>
                <input
                  type="email" placeholder="name@example.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} required
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 14, color: '#ededed', fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                  onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#FFA116')}
                  onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#333')}
                />
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#aaa', letterSpacing: '0.03em' }}>PASSWORD</label>
                  <Link to="/forgot-password" style={{ fontSize: 12, color: '#FFA116', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)} required
                    style={{ width: '100%', padding: '10px 40px 10px 14px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: 8, fontSize: 14, color: '#ededed', fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box' }}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = '#FFA116')}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = '#333')}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#555', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={submitting}
                style={{
                  width: '100%', padding: '11px', backgroundColor: '#FFA116',
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
                  color: '#141414', cursor: submitting ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontFamily: "'Inter', sans-serif",
                  opacity: submitting ? 0.7 : 1, transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (!submitting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#ff8c00'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#FFA116'; }}>
                {submitting ? 'Signing In...' : 'Sign In'}
                {!submitting && <ArrowRight style={{ width: 15, height: 15 }} />}
              </button>
            </form>

            <p style={{ fontSize: 13, color: '#555', textAlign: 'center', marginTop: 20 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#FFA116', fontWeight: 600, textDecoration: 'none' }}>Create account</Link>
            </p>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #2a2a2a', display: 'flex', justifyContent: 'center', gap: 16 }}>
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

export default Login;
