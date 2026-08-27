import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { justiceQuotes } from '@/data/mockData';

type UserRole = 'citizen' | 'lawyer';

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
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in your name, email, and password.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      const res = await register({
        name,
        email,
        phone,
        password,
        role,
        barNumber: role === 'lawyer' ? barNumber : undefined,
      });

      if (res.success) {
        toast({
          title: 'Account Created!',
          description: `Welcome to JusticeDesk, ${name}.`,
        });
        if (role === 'citizen') {
          navigate('/citizen/dashboard');
        } else {
          navigate('/lawyer/dashboard');
        }
      } else {
        toast({
          title: 'Registration Failed',
          description: res.error || 'Could not complete registration.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred during account creation.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const passwordStrength = password.length >= 8 ? 'strong' : password.length >= 4 ? 'medium' : 'weak';

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
              Join thousands who've{' '}
              <span className="text-accent">found clarity.</span>
            </h1>
            
            <ul className="space-y-4 text-lg text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                Free access to all legal rights information
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                AI-powered document analysis
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                24/7 situation-based guidance
              </li>
            </ul>
          </div>
          
          <div className="absolute bottom-10 left-12 right-12 xl:left-20 xl:right-20">
            <div className="h-px bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent" />
            <p className="text-sm text-primary-foreground/50 mt-4 text-center">
              Your data is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-md py-8">
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
                Create account
              </CardTitle>
              <CardDescription className="text-center">
                Start your journey to legal empowerment
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {role === 'lawyer' && (
                  <div className="space-y-2">
                    <Label htmlFor="barNumber">Bar Council Number</Label>
                    <Input
                      id="barNumber"
                      type="text"
                      placeholder="Enter your bar registration number"
                      value={barNumber}
                      onChange={(e) => setBarNumber(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
                  {password && (
                    <div className="flex gap-1 mt-2">
                      <div className={`h-1 flex-1 rounded-full ${
                        passwordStrength === 'weak' ? 'bg-destructive' :
                        passwordStrength === 'medium' ? 'bg-accent' : 'bg-green-500'
                      }`} />
                      <div className={`h-1 flex-1 rounded-full ${
                        passwordStrength === 'medium' || passwordStrength === 'strong' ? 
                        (passwordStrength === 'strong' ? 'bg-green-500' : 'bg-accent') : 'bg-muted'
                      }`} />
                      <div className={`h-1 flex-1 rounded-full ${
                        passwordStrength === 'strong' ? 'bg-green-500' : 'bg-muted'
                      }`} />
                    </div>
                  )}
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? 'Creating Account...' : 'Create Account'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-secondary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-secondary hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-secondary font-medium hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Quote */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground italic text-center">
                  "{quote}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
