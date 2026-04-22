import React, { useState, useEffect, type ReactNode } from 'react';

interface LoginGateProps {
  children: ReactNode;
}

export default function LoginGate({ children }: LoginGateProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have a stored token
    const storedUser = localStorage.getItem('hud_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('hud_user');
      }
    }

    // Load Netlify Identity
    const script = document.createElement('script');
    script.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const ni = (window as any).netlifyIdentity;
      if (!ni) { setLoading(false); return; }

      ni.on('init', (u: any) => {
        if (u) {
          setUser(u);
          localStorage.setItem('hud_user', JSON.stringify({ email: u.email }));
        }
        setLoading(false);
      });

      ni.on('login', (u: any) => {
        setUser(u);
        localStorage.setItem('hud_user', JSON.stringify({ email: u.email }));
        ni.close();
        // Force reload to ensure clean state
        window.location.reload();
      });

      ni.on('logout', () => {
        setUser(null);
        localStorage.removeItem('hud_user');
      });

      ni.init();
    };

    script.onerror = () => setLoading(false);

    // Fallback timeout
    setTimeout(() => setLoading(false), 4000);
  }, []);

  function handleLogin() {
    const ni = (window as any).netlifyIdentity;
    if (ni) {
      // Try redirect-based login instead of popup (works on mobile Safari)
      try {
        ni.open('login');
      } catch (e) {
        // Fallback: direct redirect to Netlify Identity endpoint
        const siteUrl = window.location.origin;
        window.location.href = `${siteUrl}/.netlify/identity/authorize?provider=email`;
      }
    } else {
      // Widget didn't load — use direct redirect
      window.location.href = '/.netlify/identity/authorize?provider=email';
    }
  }

  function handleLogout() {
    const ni = (window as any).netlifyIdentity;
    if (ni) {
      ni.logout();
    }
    localStorage.removeItem('hud_user');
    setUser(null);
  }

  if (loading) {
    return (
      <div className="hud-login-overlay">
        <div className="hud-login-title">KRKN HUD</div>
        <div className="hud-login-subtitle">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hud-login-overlay">
        <div className="hud-login-title">KRKN HUD</div>
        <div className="hud-login-subtitle">Personal Command Center</div>
        <a
          href="/.netlify/identity/authorize?provider=email"
          className="hud-btn hud-btn--primary hud-btn--lg"
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{
            minWidth: '220px',
            minHeight: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            marginTop: '16px',
            fontSize: '16px',
          }}
        >
          Log In
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
