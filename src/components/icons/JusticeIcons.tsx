import React from 'react';

export const ScaleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v18" />
    <path d="M5 7l7-4 7 4" />
    <path d="M5 7v0a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h0" />
    <path d="M19 7v0a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h0" />
    <path d="M3 9l2 3h0l2-3" />
    <path d="M17 9l2 3h0l2-3" />
    <circle cx="5" cy="12" r="0.5" fill="currentColor" />
    <circle cx="19" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const GavelIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2l5 5-5 5" />
    <path d="M4.5 12l5 5-5 5" />
    <path d="M3 3l18 18" />
    <rect x="14" y="14" width="7" height="2" rx="1" transform="rotate(45 14 14)" />
  </svg>
);

export const DocumentLegalIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export const CourthouseIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 21h18" />
    <path d="M5 21V10" />
    <path d="M19 21V10" />
    <path d="M12 3l9 7H3l9-7z" />
    <path d="M9 21v-6h6v6" />
    <path d="M8 10v4" />
    <path d="M12 10v4" />
    <path d="M16 10v4" />
  </svg>
);

export const HandshakeIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36L8.87 8.5a2.13 2.13 0 0 0 0 3l.63.63" />
    <path d="M12 5.36l3.13 3.14a2.13 2.13 0 0 1 0 3l-.63.63" />
  </svg>
);

export const Logo: React.FC<{ className?: string; showText?: boolean }> = ({ 
  className = "w-8 h-8", 
  showText = true 
}) => (
  <div className="flex items-center gap-2">
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        {/* Shield background */}
        <path
          d="M20 2L4 9v9c0 10.55 6.82 20.4 16 23 9.18-2.6 16-12.45 16-23V9L20 2z"
          fill="currentColor"
          className="text-primary"
        />
        {/* Scale icon inside */}
        <path
          d="M20 10v16M14 14l6-2 6 2M12 14l2 4h0l2-4M22 14l2 4h0l2-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-foreground"
        />
        <circle cx="14" cy="18" r="1.5" fill="currentColor" className="text-accent" />
        <circle cx="26" cy="18" r="1.5" fill="currentColor" className="text-accent" />
        {/* Base */}
        <rect x="16" y="26" width="8" height="2" rx="1" fill="currentColor" className="text-primary-foreground" />
      </svg>
    </div>
    {showText && (
      <span className="font-semibold text-xl tracking-tight text-foreground">
        Justice<span className="text-secondary">Desk</span>
      </span>
    )}
  </div>
);
