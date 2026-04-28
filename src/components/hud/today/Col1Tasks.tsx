import React from 'react';
import type { Task, Project } from '../../../lib/types';

interface Props {
  tasks: Task[];
  projects: Project[];
  loading: boolean;
  activeTaskId: string | null;
  timerTaskId: string | null;
  timerSeconds: number;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  onStartTimer: (id: string) => void;
  onStopTimer: () => void;
}

function fmtClock(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
    : `${m}:${String(s).padStart(2, '0')}`;
}

export default function Col1Tasks({
  tasks, projects, loading, activeTaskId, timerTaskId, timerSeconds,
  onToggle, onSelect, onStartTimer, onStopTimer,
}: Props) {
  const wigs = tasks
    .filter(t => t.is_wig && t.status === 'active')
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  const others = tasks
    .filter(t => !t.is_wig && t.status === 'active')
    .sort((a, b) => a.priority - b.priority || a.sort_order - b.sort_order);

  function projectFor(t: Task): Project | undefined {
    if (!t.project_id) return undefined;
    return projects.find(p => p.id === t.project_id);
  }

  function renderRow(t: Task, rank?: number) {
    const proj = projectFor(t);
    const isTiming = timerTaskId === t.id;
    const isSelected = activeTaskId === t.id;
    return (
      <li
        key={t.id}
        className={`hud-today__row ${isSelected ? 'hud-today__row--active' : ''} ${isTiming ? 'hud-today__row--timing' : ''}`}
        onClick={() => onSelect(t.id)}
      >
        <input
          type="checkbox"
          className="hud-task__checkbox"
          checked={t.status === 'done'}
          onChange={e => { e.stopPropagation(); onToggle(t.id); }}
        />
        {rank !== undefined && <span className="hud-today__rank">{rank}</span>}
        <span className="hud-today__title">{t.title}</span>
        {proj && (
          <span
            className="hud-today__project"
            style={{ background: (proj.color ?? '#06d6a0') + '22', color: proj.color ?? '#06d6a0' }}
          >
            {proj.name}
          </span>
        )}
        {!proj && t.context && <span className="hud-today__ctx">{t.context}</span>}
        <button
          className={`hud-today__timerbtn ${isTiming ? 'hud-today__timerbtn--on' : ''}`}
          onClick={e => {
            e.stopPropagation();
            if (isTiming) onStopTimer(); else onStartTimer(t.id);
          }}
          aria-label={isTiming ? 'Stop timer' : 'Start timer'}
          title={isTiming ? `Stop · ${fmtClock(timerSeconds)}` : 'Start working on this'}
        >
          {isTiming ? `⏸ ${fmtClock(timerSeconds)}` : '▶'}
        </button>
      </li>
    );
  }

  return (
    <div className="hud-today__col hud-today__col--tasks">
      <section className="hud-today__section hud-today__section--wig">
        <header className="hud-today__heading">
          <span className="hud-today__heading-icon">🎯</span>
          <span>BIG 3 — TODAY</span>
        </header>
        {wigs.length === 0 ? (
          <div className="hud-empty">No WIGs set for today</div>
        ) : (
          <ul className="hud-today__list">{wigs.map((t, i) => renderRow(t, i + 1))}</ul>
        )}
      </section>

      <section className="hud-today__section hud-today__section--others">
        <header className="hud-today__heading">
          <span className="hud-today__heading-icon">📋</span>
          <span>OTHER TASKS</span>
          <span className="hud-today__count">{others.length}</span>
        </header>
        {loading ? (
          <div className="hud-empty">Loading…</div>
        ) : others.length === 0 ? (
          <div className="hud-empty">Nothing else queued</div>
        ) : (
          <ul className="hud-today__list">{others.map(t => renderRow(t))}</ul>
        )}
      </section>
    </div>
  );
}
