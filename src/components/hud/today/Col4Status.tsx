import React, { useState } from 'react';
import type { Task, Sprint, TimeLog, KanbanLane } from '../../../lib/types';
import { KANBAN_LANES } from '../../../lib/types';

interface Props {
  tasks: Task[];
  sprint: Sprint | null;
  logs: TimeLog[];
  onSelect: (id: string) => void;
  onMoveLane: (id: string, lane: KanbanLane) => void;
}

function laneOf(t: Task): KanbanLane {
  if (t.kanban_lane) return t.kanban_lane;
  if (t.status === 'done') return 'done';
  if (t.status === 'someday') return 'backlog';
  if (t.is_wig) return 'today';
  return 'backlog';
}

function logDurationMin(l: TimeLog): number {
  const stop = l.stopped_at ? new Date(l.stopped_at).getTime() : Date.now();
  const start = new Date(l.started_at).getTime();
  return Math.max(0, Math.floor((stop - start) / 60_000));
}

function dateRange(start: string, end: string): string[] {
  const out: string[] = [];
  const d = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  while (d <= e) {
    out.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export default function Col4Status({ tasks, sprint, logs, onSelect, onMoveLane }: Props) {
  const [hoverLane, setHoverLane] = useState<KanbanLane | null>(null);

  const byLane = KANBAN_LANES.reduce((acc, { key }) => {
    acc[key] = tasks.filter(t => laneOf(t) === key);
    return acc;
  }, {} as Record<KanbanLane, Task[]>);

  // Burndown over the active sprint
  let burndownView: React.ReactNode;
  if (!sprint) {
    burndownView = <div className="hud-empty">No active sprint</div>;
  } else {
    const sprintTasks = tasks.filter(t => !t.sprint_id || t.sprint_id === sprint.id);
    const totalEstMin = sprintTasks.reduce((s, t) => s + (t.estimated_minutes ?? 0), 0);
    const remainingEstMin = sprintTasks
      .filter(t => laneOf(t) !== 'done')
      .reduce((s, t) => s + (t.estimated_minutes ?? 0), 0);
    const doneEstMin = totalEstMin - remainingEstMin;

    const days = dateRange(sprint.start_date, sprint.end_date);
    const today = new Date().toISOString().slice(0, 10);
    const todayIdx = Math.max(0, days.indexOf(today));
    const totalDays = days.length;

    // logged minutes per day in sprint
    const sprintStart = new Date(sprint.start_date + 'T00:00:00').getTime();
    const sprintEnd = new Date(sprint.end_date + 'T23:59:59').getTime();
    const dayMin: Record<string, number> = {};
    for (const l of logs) {
      const t = new Date(l.started_at).getTime();
      if (t < sprintStart || t > sprintEnd) continue;
      const d = l.started_at.slice(0, 10);
      dayMin[d] = (dayMin[d] ?? 0) + logDurationMin(l);
    }
    const cumulativeRemaining = days.map((d, i) => {
      const burnedSoFar = days.slice(0, i + 1).reduce((s, dd) => s + (dayMin[dd] ?? 0), 0);
      return Math.max(0, totalEstMin - burnedSoFar);
    });

    const W = 240, H = 80, pad = 4;
    const xStep = totalDays > 1 ? (W - pad * 2) / (totalDays - 1) : 0;
    const maxY = Math.max(totalEstMin, 1);
    const idealPath = days
      .map((_, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * xStep} ${pad + (1 - (totalDays - 1 - i) / (totalDays - 1)) * (H - pad * 2)}`)
      .join(' ');
    const actualPath = cumulativeRemaining
      .slice(0, todayIdx + 1)
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${pad + i * xStep} ${pad + (1 - v / maxY) * (H - pad * 2)}`)
      .join(' ');

    const pct = totalEstMin > 0 ? Math.round((doneEstMin / totalEstMin) * 100) : 0;

    burndownView = (
      <div className="hud-today__burndown">
        <div className="hud-today__burndown-meta">
          <span>{sprint.name ?? 'Sprint'}</span>
          <span>day {todayIdx + 1} / {totalDays}</span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="hud-today__burndown-svg" preserveAspectRatio="none">
          <path d={idealPath} className="hud-today__burndown-ideal" />
          <path d={actualPath} className="hud-today__burndown-actual" />
        </svg>
        <div className="hud-today__burndown-track">
          <div className="hud-today__burndown-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="hud-today__burndown-meta">
          <span>{doneEstMin}m done</span>
          <span>{remainingEstMin}m left</span>
          <span>{pct}%</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hud-today__col hud-today__col--status">
      <section className="hud-today__section hud-today__section--kanban">
        <header className="hud-today__heading">
          <span className="hud-today__heading-icon">🗂️</span>
          <span>FLOW</span>
        </header>
        <div className="hud-today__kanban">
          {KANBAN_LANES.map(({ key, label }) => (
            <div
              key={key}
              className={`hud-today__lane hud-today__lane--${key} ${hoverLane === key ? 'hud-today__lane--over' : ''}`}
              onDragOver={e => { e.preventDefault(); setHoverLane(key); }}
              onDragLeave={() => setHoverLane(prev => (prev === key ? null : prev))}
              onDrop={e => {
                e.preventDefault();
                const id = e.dataTransfer.getData('text/plain');
                setHoverLane(null);
                if (id) onMoveLane(id, key);
              }}
            >
              <div className="hud-today__lane-head">
                <span>{label}</span>
                <span className="hud-today__count">{byLane[key].length}</span>
              </div>
              <div className="hud-today__lane-body">
                {byLane[key].map(t => (
                  <div
                    key={t.id}
                    className="hud-today__card"
                    draggable
                    onDragStart={e => {
                      e.dataTransfer.setData('text/plain', t.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onClick={() => onSelect(t.id)}
                  >
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="hud-today__section hud-today__section--burndown">
        <header className="hud-today__heading">
          <span className="hud-today__heading-icon">📉</span>
          <span>BURNDOWN</span>
        </header>
        {burndownView}
      </section>
    </div>
  );
}
