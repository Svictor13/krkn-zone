import React from 'react';
import type { Task, Project } from '../../../lib/types';

interface Props {
  task: Task | null;
  project: Project | null;
  totalSecondsLogged: number;
  isTimerRunning: boolean;
  onStartTimer: () => void;
  onStopTimer: () => void;
}

function fmtHMS(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0 && m === 0) return `${seconds}s`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export default function Col3Notes({
  task, project, totalSecondsLogged, isTimerRunning, onStartTimer, onStopTimer,
}: Props) {
  return (
    <div className="hud-today__col hud-today__col--notes">
      <header className="hud-today__heading">
        <span className="hud-today__heading-icon">📝</span>
        <span>NOTES</span>
      </header>
      {!task ? (
        <div className="hud-empty">Select a task to see its notes</div>
      ) : (
        <article className="hud-today__notes">
          <h2 className="hud-today__notes-title">{task.title}</h2>
          <div className="hud-today__notes-meta">
            {project && (
              <span
                className="hud-today__project"
                style={{ background: (project.color ?? '#06d6a0') + '22', color: project.color ?? '#06d6a0' }}
              >
                {project.name}
              </span>
            )}
            <span className="hud-badge hud-badge--someday">{task.context}</span>
            {task.is_wig && <span className="hud-badge hud-badge--wig">WIG</span>}
            {task.due_date && <span className="hud-badge hud-badge--active">{task.due_date}</span>}
            {task.estimated_minutes ? (
              <span className="hud-badge hud-badge--someday">est {task.estimated_minutes}m</span>
            ) : null}
          </div>

          <div className="hud-today__time-row">
            <div className="hud-today__time-stat">
              <div className="hud-today__time-label">LOGGED</div>
              <div className="hud-today__time-value">{fmtHMS(totalSecondsLogged)}</div>
            </div>
            <button
              className={`hud-btn hud-btn--primary ${isTimerRunning ? 'hud-today__timerbtn--on' : ''}`}
              onClick={isTimerRunning ? onStopTimer : onStartTimer}
            >
              {isTimerRunning ? '⏸ Stop timer' : '▶ Start working'}
            </button>
          </div>

          {task.notes ? (
            <pre className="hud-today__notes-body">{task.notes}</pre>
          ) : (
            <div className="hud-empty">No notes yet</div>
          )}
        </article>
      )}
    </div>
  );
}
