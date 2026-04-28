import React, { useMemo, useState } from 'react';
import type { Task, TimeLog, KanbanLane } from '../../../lib/types';

interface Props {
  open: boolean;
  tasks: Task[];
  logs: TimeLog[];
  onClose: () => void;
  onPostpone: (id: string, newDueDate: string) => Promise<void>;
  onMoveLane: (id: string, lane: KanbanLane) => Promise<void>;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function nextMondayISO(): string {
  const d = new Date();
  const day = d.getDay();
  const add = day === 0 ? 1 : 8 - day;
  d.setDate(d.getDate() + add);
  return d.toISOString().slice(0, 10);
}

function loggedMinutes(taskId: string, logs: TimeLog[]): number {
  const today = todayISO();
  return logs
    .filter(l => l.task_id === taskId && l.started_at.slice(0, 10) === today)
    .reduce((sum, l) => {
      const stop = l.stopped_at ? new Date(l.stopped_at).getTime() : Date.now();
      return sum + Math.max(0, Math.floor((stop - new Date(l.started_at).getTime()) / 60000));
    }, 0);
}

export default function EODModal({ open, tasks, logs, onClose, onPostpone, onMoveLane }: Props) {
  const [working, setWorking] = useState(false);

  const completedToday = useMemo(() => {
    const today = todayISO();
    return tasks.filter(t =>
      t.status === 'done' &&
      t.completed_at &&
      t.completed_at.slice(0, 10) === today
    );
  }, [tasks]);

  const incompleteToday = useMemo(() => {
    return tasks.filter(t =>
      t.status === 'active' &&
      (t.is_wig || t.kanban_lane === 'today' || t.kanban_lane === 'doing')
    );
  }, [tasks]);

  if (!open) return null;

  async function handle(id: string, action: 'tomorrow' | 'monday' | 'backlog' | 'waiting') {
    setWorking(true);
    try {
      if (action === 'tomorrow') await onPostpone(id, tomorrowISO());
      if (action === 'monday')   await onPostpone(id, nextMondayISO());
      if (action === 'backlog')  await onMoveLane(id, 'backlog');
      if (action === 'waiting')  await onMoveLane(id, 'waiting');
    } finally {
      setWorking(false);
    }
  }

  const totalDoneMinutes = completedToday.reduce((s, t) => s + loggedMinutes(t.id, logs), 0);

  return (
    <div className="hud-eod-overlay" onClick={onClose}>
      <div className="hud-eod-modal" onClick={e => e.stopPropagation()}>
        <header className="hud-eod-header">
          <span className="hud-today__heading-icon">🌙</span>
          <h2>End of day reconciliation</h2>
          <button className="hud-eod-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        <section className="hud-eod-section">
          <div className="hud-eod-section-head">
            <span>✅ Completed today</span>
            <span className="hud-today__count">{completedToday.length} · {totalDoneMinutes}m logged</span>
          </div>
          {completedToday.length === 0 ? (
            <div className="hud-empty">Nothing checked off today</div>
          ) : (
            <ul className="hud-eod-list">
              {completedToday.map(t => (
                <li key={t.id} className="hud-eod-row">
                  <span className="hud-eod-row-title">{t.title}</span>
                  <span className="hud-eod-row-meta">{loggedMinutes(t.id, logs)}m</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="hud-eod-section">
          <div className="hud-eod-section-head">
            <span>📋 Still open</span>
            <span className="hud-today__count">{incompleteToday.length}</span>
          </div>
          {incompleteToday.length === 0 ? (
            <div className="hud-empty">All clear</div>
          ) : (
            <ul className="hud-eod-list">
              {incompleteToday.map(t => (
                <li key={t.id} className="hud-eod-row">
                  <span className="hud-eod-row-title">{t.title}</span>
                  <div className="hud-eod-actions">
                    <button disabled={working} onClick={() => handle(t.id, 'tomorrow')}>→ Tomorrow</button>
                    <button disabled={working} onClick={() => handle(t.id, 'monday')}>→ Mon</button>
                    <button disabled={working} onClick={() => handle(t.id, 'waiting')}>Waiting</button>
                    <button disabled={working} onClick={() => handle(t.id, 'backlog')}>Backlog</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="hud-eod-footer">
          <button className="hud-btn hud-btn--primary" onClick={onClose}>Done</button>
        </footer>
      </div>
    </div>
  );
}
