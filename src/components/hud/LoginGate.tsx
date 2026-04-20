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
    return (
      <div className="login-overlay">
        <div className="login-box">
          <h1 className="login-title">KRKN HUD</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="login-overlay">
        <div className="login-box">
          <h1 className="login-title">KRKN HUD</h1>
          <button
            className="btn-login"
            onClick={() => (window as any).netlifyIdentity.open()}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
