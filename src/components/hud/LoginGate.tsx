import React, { useState, useEffect, type ReactNode } from 'react';

interface LoginGateProps {
  children: ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    document.head.appendChild(script);
    script.onload = () => {
      const netlifyIdentity = (window as any).netlifyIdentity;
      netlifyIdentity.on('init', (user: any) => {
        setUser(user);
        setLoading(false);
      });
      netlifyIdentity.on('login', (user: any) => {
        setUser(user);
        netlifyIdentity.close();
      });
      netlifyIdentity.on('logout', () => setUser(null));
      netlifyIdentity.init();
    };
  }, []);

  if (loading) {
    return <div className="hud-loading">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="hud-login-overlay">
        <div className="hud-login-title">KRKN HUD</div>
        <div className="hud-login-subtitle">Personal Command Center</div>
        <button
          className="hud-btn hud-btn--primary hud-btn--lg"
          onClick={() => (window as any).netlifyIdentity.open()}
        >
          Log In
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
