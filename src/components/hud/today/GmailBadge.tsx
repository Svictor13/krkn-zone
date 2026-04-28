import React from 'react';
import type { GmailStatus } from '../../../lib/types';

interface Props {
  statuses: GmailStatus[];
}

function isStale(s: GmailStatus): boolean {
  if (!s.last_synced_at) return true;
  return Date.now() - new Date(s.last_synced_at).getTime() > 5 * 60 * 1000;
}

// Route by account via Google's AccountChooser — most reliable across multi-account setups.
// For Workspace domains, the /a/<domain>/ shortcut goes straight to the right inbox.
const GMAIL_EMAIL: Record<string, string> = {
  personal: 'stfnvw13@gmail.com',
  work:     'stefan.w@safe.security',
};

function gmailUrlFor(account: string): string {
  const email = GMAIL_EMAIL[account];
  if (!email) return 'https://mail.google.com/mail/';
  // Workspace domains get the direct /a/<domain>/ URL (no chooser needed).
  const at = email.indexOf('@');
  const domain = at >= 0 ? email.slice(at + 1) : '';
  if (domain && domain !== 'gmail.com' && domain !== 'googlemail.com') {
    return `https://mail.google.com/a/${domain}/`;
  }
  // Consumer Gmail: bounce through AccountChooser with Email hint.
  const cont = encodeURIComponent('https://mail.google.com/mail/');
  return `https://accounts.google.com/AccountChooser?Email=${encodeURIComponent(email)}&continue=${cont}`;
}

export default function GmailBadge({ statuses }: Props) {
  if (statuses.length === 0) return null;
  return (
    <div className="hud-gmail-badge">
      <span className="hud-gmail-badge__icon">📥</span>
      {statuses
        .sort((a, b) => (a.account === 'work' ? -1 : 1))
        .map(s => (
          <a
            key={s.account}
            className={`hud-gmail-badge__chip ${isStale(s) ? 'hud-gmail-badge__chip--stale' : ''} ${s.account === 'work' ? 'hud-gmail-badge__chip--work' : ''}`}
            href={gmailUrlFor(s.account)}
            target="_blank"
            rel="noreferrer"
            title={`${s.account} · ${s.unread_count} unread${s.oldest_unread_age_minutes ? ` · oldest ${s.oldest_unread_age_minutes}m` : ''}`}
          >
            <span className="hud-gmail-badge__label">{s.account}</span>
            <span className="hud-gmail-badge__count">{s.unread_count}</span>
          </a>
        ))}
    </div>
  );
}
