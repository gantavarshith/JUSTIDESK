import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Scale, ArrowRight, Shield, FileSearch, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // If already logged in, redirect to user dashboard
  if (isAuthenticated) {
    const target = user?.role === 'lawyer' ? '/lawyer/dashboard' : '/citizen/dashboard';
    return <Navigate to={target} replace />;
  }

  const features = [
    {
      icon: Shield,
      title: 'Know Your Rights',
      description: 'Access comprehensive legal rights information in simple language.',
    },
    {
      icon: FileSearch,
      title: 'Document Analysis',
      description: 'Get AI-powered analysis of your legal documents instantly.',
    },
    {
      icon: Users,
      title: 'Connect with Lawyers',
      description: 'Find and consult verified legal professionals.',
    },
    {
      icon: Sparkles,
      title: 'Real-time Guidance',
      description: 'Get step-by-step help for urgent legal situations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 animate-fade-up">
              <div className="w-16 h-16 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <Scale className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Legal clarity for{' '}
                <span className="text-accent">everyone.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                JusticeDesk empowers citizens with legal knowledge, document analysis, and expert connections — all in one place.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button asChild variant="gold" size="xl">
                <Link to="/register">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-sm text-primary-foreground/50 animate-fade-up" style={{ animationDelay: '300ms' }}>
              Trusted by 50,000+ citizens across India
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to understand the law
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Navigate legal complexities with confidence using our comprehensive suite of tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                hover
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-secondary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to take control of your legal journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who have found clarity and empowerment through JusticeDesk.
          </p>
          <Button asChild variant="hero" size="xl">
            <Link to="/register">
              Create Free Account
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              Justice<span className="text-secondary">Desk</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 JusticeDesk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
