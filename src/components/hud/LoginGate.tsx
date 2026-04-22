import React, { useState, useEffect, type ReactNode } from 'react';

interface LoginGateProps {
  children: ReactNode;
}

// Simple password gate — single user, no external dependencies
const PASS_HASH = '883187d52ae720bc8edd70d5ffa783cb57e532c902d36c6bad40b4a337bfc624';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function LoginGate({ children }: LoginGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hud_auth');
    if (stored === 'true') {
      const expiry = localStorage.getItem('hud_auth_expiry');
      if (expiry && Date.now() < parseInt(expiry)) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem('hud_auth');
        localStorage.removeItem('hud_auth_expiry');
      }
    }
    setLoading(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const hash = await hashPassword(password);
    // Accept the hardcoded hash OR check against env variable hash
    const validHash = (window as any).__HUD_PASS_HASH__ || PASS_HASH;

    if (hash === validHash) {
      setAuthenticated(true);
      // Store auth for 7 days
      localStorage.setItem('hud_auth', 'true');
      localStorage.setItem('hud_auth_expiry', String(Date.now() + 7 * 24 * 60 * 60 * 1000));
    } else {
      setError('Wrong password');
      setPassword('');
    }
  }

  if (loading) {
    return (
      <div className="hud-login-overlay">
        <div className="hud-login-title">KRKN HUD</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="hud-login-overlay">
        <div className="hud-login-title">KRKN HUD</div>
        <div className="hud-login-subtitle">Personal Command Center</div>
        <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '300px' }}>
          <input
            type="password"
            className="hud-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            style={{ textAlign: 'center', fontSize: '16px' }}
          />
          {error && <div style={{ color: 'var(--hud-red)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{error}</div>}
          <button
            type="submit"
            className="hud-btn hud-btn--primary hud-btn--lg"
            style={{ width: '100%', minHeight: '50px', fontSize: '16px' }}
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
