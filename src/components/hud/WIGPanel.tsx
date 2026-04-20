import React from 'react';
import type { Task } from '../../lib/types';
import ProgressBar from './ProgressBar';

interface WIGPanelProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

export default function WIGPanel({ tasks, onToggle }: WIGPanelProps) {
  const completed = tasks.filter(t => t.status === 'done').length;
  const total = tasks.length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="hud-wig-panel">
      <div className="hud-wig-panel__title">TODAY'S WIGs</div>
      {total === 0 ? (
        <div className="hud-empty">No WIGs set for today</div>
      ) : (
        <>
          <ul className="hud-wig-panel__list">
            {tasks.map(task => (
              <li key={task.id} className="hud-task" style={{ padding: '8px 0' }}>
                <input
                  type="checkbox"
                  className="hud-task__checkbox"
                  checked={task.status === 'done'}
                  onChange={() => onToggle(task.id)}
                />
                <span className={`hud-task__text ${task.status === 'done' ? 'hud-task--done' : ''}`}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
          <div className="hud-progress__label">
            <span>Progress</span>
            <span className="hud-progress__value">{progress}%</span>
          </div>
          <ProgressBar value={progress} color="amber" />
        </>
      )}
    </div>
  );
}
