import React from 'react';
import type { CalendarEvent } from '../../../lib/types';

interface Props {
  events: CalendarEvent[];
  syncedAt: string | null;
}

const HOUR_START = 6;
const HOUR_END = 22;
const HOURS = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => i + HOUR_START);
const SLOT_PX = 44; // must match .hud-today__hour min-height

function minutesFromStart(d: Date): number {
  return (d.getHours() - HOUR_START) * 60 + d.getMinutes();
}

export default function Col2Calendar({ events, syncedAt }: Props) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  const todayEvents = events.filter(e => {
    if (e.is_all_day) return false;
    return e.starts_at.slice(0, 10) === todayStr;
  });

  function syncedLabel(): string {
    if (!syncedAt) return 'no sync yet';
    const d = new Date(syncedAt);
    const diffMin = Math.round((Date.now() - d.getTime()) / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    return `${Math.round(diffMin / 60)}h ago`;
  }

  return (
    <div className="hud-today__col hud-today__col--calendar">
      <header className="hud-today__heading">
        <span className="hud-today__heading-icon">📅</span>
        <span>TODAY</span>
        <span className="hud-today__count">
          {now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </span>
      </header>
      <div className="hud-today__hours-wrap">
        <div className="hud-today__hours">
          {HOURS.map(h => {
            const isCurrent = h === currentHour;
            return (
              <div
                key={h}
                className={`hud-today__hour ${isCurrent ? 'hud-today__hour--current' : ''}`}
              >
                <div className="hud-today__hour-label">{`${String(h).padStart(2, '0')}:00`}</div>
                <div className="hud-today__hour-slot" />
              </div>
            );
          })}
          {/* Now-line spans across all hour slots */}
          {currentHour >= HOUR_START && currentHour < HOUR_END && (
            <div
              className="hud-today__nowline"
              style={{ top: `${((currentHour - HOUR_START) * 60 + currentMinutes) * (SLOT_PX / 60)}px` }}
            />
          )}
          {/* Event blocks */}
          {todayEvents.map(e => {
            const start = new Date(e.starts_at);
            const end = new Date(e.ends_at);
            const startMin = Math.max(0, minutesFromStart(start));
            const endMin = Math.min((HOUR_END - HOUR_START) * 60, minutesFromStart(end));
            if (endMin <= startMin) return null;
            const top = startMin * (SLOT_PX / 60);
            const height = (endMin - startMin) * (SLOT_PX / 60);
            return (
              <div
                key={e.id}
                className="hud-today__event"
                style={{ top: `${top}px`, height: `${height}px` }}
                title={`${e.title} · ${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}–${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              >
                <div className="hud-today__event-title">{e.title}</div>
                {height > 28 && (
                  <div className="hud-today__event-time">
                    {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {height > 44 && ` · ${e.calendar_name ?? ''}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <footer className="hud-today__footnote">
        {todayEvents.length} events · synced {syncedLabel()}
      </footer>
    </div>
  );
}
