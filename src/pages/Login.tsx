import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
      toast({
        title: 'Missing Fields',
        description: 'Please fill in both email and password.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(email, password, role);
      if (res.success) {
        toast({
          title: 'Welcome Back!',
          description: `Signed in successfully as ${role}.`,
        });
        if (role === 'citizen') {
          navigate('/citizen/dashboard');
        } else {
          navigate('/lawyer/dashboard');
        }
      } else {
        toast({
          title: 'Sign In Failed',
          description: res.error || 'Invalid credentials.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during sign in.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 text-primary-foreground">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
                <Scale className="w-7 h-7 text-primary-foreground" />
              </div>
              <span className="text-3xl font-bold">
                Justice<span className="text-secondary">Desk</span>
              </span>
            </div>
            
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Legal clarity for{' '}
              <span className="text-accent">everyone.</span>
            </h1>
            
            <ul className="space-y-4 text-lg text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Know your rights in any situation
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Get documents analyzed instantly
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent" />
                Connect with verified lawyers
              </li>
            </ul>
          </div>
          
          <div className="absolute bottom-10 left-12 right-12 xl:left-20 xl:right-20">
            <div className="h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
            <p className="text-sm text-primary-foreground/50 mt-4 text-center">
              Trusted by 50,000+ citizens across India
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              Justice<span className="text-secondary">Desk</span>
            </span>
          </div>

          <Card className="border-0 shadow-elevated animate-scale-in">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Sign in to access your legal dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Toggle */}
              <div className="flex bg-muted rounded-lg p-1 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('citizen')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    role === 'citizen'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => setRole('lawyer')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                    role === 'lawyer'
                      ? 'bg-card text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Lawyer
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-secondary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Signing In...' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-secondary font-medium hover:underline">
                    Create account
                  </Link>
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic text-center">
                  "{quote}"
                </p>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  <Link to="/terms" className="hover:underline text-secondary font-medium">
                    Terms and Services
                  </Link>
                  {' · '}
                  <Link to="/privacy" className="hover:underline text-secondary font-medium">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
