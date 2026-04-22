import React, { useState, useEffect, type ReactNode } from 'react';

interface LoginGateProps {
  children: ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    // Check if script already loaded
    if ((window as any).netlifyIdentity) {
      initIdentity();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => initIdentity();
    script.onerror = () => {
      setLoading(false);
      console.error('Failed to load Netlify Identity widget');
    };
  }, []);

  function initIdentity() {
    const netlifyIdentity = (window as any).netlifyIdentity;
    if (!netlifyIdentity) return;

    netlifyIdentity.on('init', (u: any) => {
      setUser(u);
      setLoading(false);
      setWidgetReady(true);
    });
    netlifyIdentity.on('login', (u: any) => {
      setUser(u);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', () => setUser(null));
    netlifyIdentity.init();

    // Fallback: if init doesn't fire within 3 seconds, stop loading
    setTimeout(() => {
      setLoading(false);
      setWidgetReady(true);
    }, 3000);
  }

  function handleLogin() {
    const netlifyIdentity = (window as any).netlifyIdentity;
    if (netlifyIdentity) {
      netlifyIdentity.open();
    } else {
      alert('Login widget is still loading. Please try again in a moment.');
    }
  }

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
          onClick={handleLogin}
          style={{ minWidth: '200px', minHeight: '50px' }}
        >
          Log In
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
